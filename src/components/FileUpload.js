// FileUpload.js
import React, { useState, useRef } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'doc' || fileType === 'pdf') {
        // Check file size (2MB limit)
        if (file.size <= 2 * 1024 * 1024) {
          setSelectedFile(file);
        } else {
          alert('File size exceeds 2MB limit.');
        }
      } else {
        alert('Invalid file type. Please select a DOC or PDF file.');
      }
    }
  };

  const initiateUpload = () => {
    if (selectedFile) {
      // Perform the actual upload or pass the file to the parent component
      onFileUpload(selectedFile);
    } else {
      alert('Please select a valid file.');
    }
  };

  // Expose the function to get the selected file externally
  const getSelectedFile = () => selectedFile;

  return (
    <div>
      <input type="file" accept=".doc, .pdf" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
