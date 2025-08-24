import JSZip from 'jszip';
import { FileItem } from '../types';

export async function downloadProjectAsZip(files: FileItem[], projectName: string = 'project') {
  const zip = new JSZip();

  // Recursive function to add files to zip
  const addFilesToZip = (items: FileItem[], folder: JSZip) => {
    items.forEach(item => {
      if (item.type === 'file' && item.content) {
        folder.file(item.name, item.content);
      } else if (item.type === 'folder' && item.children) {
        const subFolder = folder.folder(item.name);
        if (subFolder) {
          addFilesToZip(item.children, subFolder);
        }
      }
    });
  };

  // Add all files to the zip
  addFilesToZip(files, zip);

  try {
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}.zip`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error creating zip file:', error);
    return false;
  }
}
