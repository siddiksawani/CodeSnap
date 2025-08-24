import { WebContainer } from '@webcontainer/api';
import { useEffect, useState, useRef } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
  onUrlChange?: (url: string) => void;
  onStatusChange?: (ready: boolean) => void;
}

// Cache for tracking package.json content to detect changes
let packageJsonCache: string | null = null;
let nodeModulesInstalled = false;
let isInstalling = false;

// Generate hash of package.json content for comparison
function generatePackageHash(packageJsonContent: string): string {
  let hash = 0;
  for (let i = 0; i < packageJsonContent.length; i++) {
    const char = packageJsonContent.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

export function PreviewFrame({ files, webContainer, onUrlChange, onStatusChange }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Initializing...");
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  async function installDependencies(packageJsonContent: string, force = false): Promise<boolean> {
    const currentHash = generatePackageHash(packageJsonContent);
    
    // Check if we need to install dependencies
    if (!force && packageJsonCache === currentHash && nodeModulesInstalled) {
      console.log('📦 Dependencies already installed, skipping npm install');
      setStatus("Dependencies cached, starting server...");
      return true;
    }

    if (isInstalling) {
      console.log('📦 Installation already in progress, waiting...');
      setStatus("Installation in progress...");
      return false;
    }

    try {
      isInstalling = true;
      setStatus("Installing dependencies...");
      setProgress(25);

      // Use npm install instead of npm ci since we don't have package-lock.json
      // with optimization flags for WebContainer environment
      const npmArgs = [
        'install',
        '--prefer-offline',
        '--no-audit',
        '--no-fund',
        '--silent',
        '--no-optional'
      ];

      console.log('📦 Running npm install with optimizations:', npmArgs);
      
      const installProcess = await webContainer.spawn('npm', npmArgs);

      // Track installation progress
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          // data is already a string from WebContainer
          console.log('npm:', data);
          
          // Update progress based on npm output
          if (typeof data === 'string' && (data.includes('added') || data.includes('installed'))) {
            setProgress(prev => Math.min(prev + 10, 75));
          }
        }
      }));

      const exitCode = await installProcess.exit;
      
      if (exitCode === 0) {
        packageJsonCache = currentHash;
        nodeModulesInstalled = true;
        setProgress(80);
        setStatus("Dependencies installed successfully");
        console.log('✅ Dependencies installed successfully');
        return true;
      } else {
        console.error('❌ npm install failed with exit code:', exitCode);
        setStatus("Dependency installation failed");
        return false;
      }
    } catch (error) {
      console.error('❌ Error during npm install:', error);
      setStatus("Installation error occurred");
      return false;
    } finally {
      isInstalling = false;
    }
  }

  async function startDevServer(): Promise<void> {
    try {
      setStatus("Starting development server...");
      setProgress(85);

      console.log('🚀 Starting development server...');
      
      // Start the development server with basic spawn options (no process.env reference)
      const devProcess = await webContainer.spawn('npm', ['run', 'dev']);

      // Handle server output
      devProcess.output.pipeTo(new WritableStream({
        write(data) {
          // data is already a string from WebContainer
          console.log('dev server:', data);
          
          if (typeof data === 'string' && (data.includes('Local:') || data.includes('ready'))) {
            setProgress(95);
          }
        }
      }));

    } catch (error) {
      console.error('❌ Error starting dev server:', error);
      setStatus("Failed to start development server");
    }
  }

  async function main() {
    if (!webContainer) {
      setStatus("WebContainer not available");
      return;
    }

    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();

    try {
      setStatus("Checking project files...");
      setProgress(10);

      // Find package.json in the files
      const packageJsonFile = files.find(file => 
        file.path === 'package.json' || file.name === 'package.json'
      );

      if (!packageJsonFile || !packageJsonFile.content) {
        setStatus("No package.json found");
        console.error('❌ No package.json found in files');
        return;
      }

      const packageJsonContent = packageJsonFile.content;
      console.log('📋 Found package.json, checking dependencies...');

      // Install dependencies with intelligent caching
      const installSuccess = await installDependencies(packageJsonContent);
      
      if (!installSuccess) {
        console.log('⏳ Waiting for ongoing installation...');
        // Wait for ongoing installation to complete
        while (isInstalling) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Start development server in parallel after dependencies are ready
      await startDevServer();

      setProgress(100);
      setStatus("Server starting...");

    } catch (error) {
      console.error('❌ Error in main preview process:', error);
      setStatus("Preview initialization failed");
    }
  }

  // Handle server-ready event
  useEffect(() => {
    if (!webContainer) return;

    const handleServerReady = (port: number, serverUrl: string) => {
      console.log('🎉 Server ready!', { port, url: serverUrl });
      setUrl(serverUrl);
      setStatus("Ready");
      setProgress(100);
      onUrlChange?.(serverUrl);
      onStatusChange?.(true);
    };

    webContainer.on('server-ready', handleServerReady);

    // Note: WebContainer doesn't have an 'off' method, cleanup is handled by component unmount
    return () => {
      // Cleanup will be handled by the main useEffect cleanup
    };
  }, [webContainer]);

  useEffect(() => {
    main();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [files, webContainer]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm">{progress}%</p>
          </div>
          <p className="mb-2">{status}</p>
          <p className="text-xs text-gray-500">
            {progress < 25 && "Optimizing dependencies..."}
            {progress >= 25 && progress < 80 && "Installing packages..."}
            {progress >= 80 && progress < 95 && "Starting server..."}
            {progress >= 95 && "Almost ready..."}
          </p>
        </div>
      )}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}