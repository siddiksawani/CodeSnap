import { Code2, Eye, Maximize, Download } from 'lucide-react';

interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
  onFullScreen?: () => void;
  onDownload?: () => void;
  previewReady?: boolean;
}

export function TabView({ 
  activeTab, 
  onTabChange, 
  onFullScreen, 
  onDownload, 
  previewReady = false 
}: TabViewProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onTabChange('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === 'code'
              ? 'bg-gray-700 text-gray-100'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Code
        </button>
        <button
          onClick={() => onTabChange('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === 'preview'
              ? 'bg-gray-700 text-gray-100'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      {/* Action buttons - only visible in preview mode */}
      {activeTab === 'preview' && (
        <div className="flex space-x-2">
          <button
            onClick={onFullScreen}
            disabled={!previewReady}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              previewReady
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            title="Full Screen Preview"
          >
            <Maximize className="w-4 h-4" />
            Full Screen
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-300 hover:text-gray-100 hover:bg-gray-800"
            title="Download Project"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      )}
    </div>
  );
}