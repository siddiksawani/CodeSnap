import { useEffect } from 'react';
import { X, ExternalLink, RefreshCw } from 'lucide-react';

interface FullScreenPreviewProps {
  url: string;
  onClose: () => void;
  onRefresh?: () => void;
}

export function FullScreenPreview({ url, onClose, onRefresh }: FullScreenPreviewProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const openInNewWindow = () => {
    window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-7xl h-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-100">Full Screen Preview</h3>
            <span className="text-sm text-gray-400 font-mono">{url}</span>
          </div>
          <div className="flex items-center space-x-2">            <button
              onClick={onRefresh || (() => window.location.reload())}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
              title="Refresh Preview"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={openInNewWindow}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
              title="Open in New Window"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
              title="Close (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-white">
          <iframe 
            src={url} 
            className="w-full h-full border-0"
            title="Full Screen Preview"
          />
        </div>
      </div>
    </div>
  );
}
