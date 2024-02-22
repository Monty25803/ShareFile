import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShareFile';
}

const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");

function handleFileDrop(event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFileView(files);
}

function handleDragOver(event) {
  event.preventDefault();
  const fileView = document.getElementById('file-view');
  fileView.classList.add('drag-over');
}

function handleFileInputClick() {
  const fileInput = document.getElementById('input-file');
  fileInput.click();
}

function handleFileSelect(event) {
  const files = event.target.files;
  handleFileView(files);
}

function handleFileView(files) {
  const fileView = document.getElementById('file-view');
  const fileListText = document.getElementById('file-list-text');
  const fileList = document.getElementById('file-list');
  fileView.classList.remove('drag-over');

  if (files.length > 0) {
    fileListText.innerHTML = `${files.length} file(s) selected.`;
    fileList.innerHTML = '<p>Selected Files:</p>';
    for (const file of files) {
      const listItem = document.createElement('div');
      listItem.textContent = file.name;
      fileList.appendChild(listItem);
    }
  } else {
    fileListText.innerHTML = 'Drag and drop or click to select files';
    fileList.innerHTML = '';
  }
}
// function handleFileDrop(event) {
//   event.preventDefault();
//   const fileInput = event.dataTransfer.files[0];
//   handleFileSelect({ target: { files: [fileInput] } });
// }

// function handleDragOver(event) {
//   event.preventDefault();
//   const dropArea = document.getElementById('drop-area');
//   dropArea.classList.add('file-over');
// }

// function handleFileSelect(event) {
//   const fileInput = event && event.target && event.target.files && event.target.files[0];
//   const fileInfoBox = document.getElementById('file-info-box');

//   if (fileInput) {
//     const fileName = fileInput.name;

//     document.getElementById('file-name').innerText = `File Name: ${fileName}`;
//     fileInfoBox.classList.remove('d-none');
//   } else {
//     fileInfoBox.classList.add('d-none');
//   }
// }

function uploadFile() {
  const fileInput = document.getElementById('input-file');
  const yearMonthInput = document.getElementById('yearMonth');
  console.log('fileInput:', fileInput.files);
  console.log('yearMonthInput:', yearMonthInput.value);
  const files = fileInput.files;
  
  if (files.length === 0) {
    alert('Please select a file to upload.');
    return;
  }

  const selectedYearMonth = yearMonthInput.value;
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('yearMonth', selectedYearMonth);

  // fetch('/upload-endpoint', {
  //   method: 'POST',
  //   body: formData
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Upload successful:', data);
  //     alert('File uploaded successfully!');
  //   })
  //   .catch(error => {
  //     console.error('Error during upload:', error);
  //     alert('Error during file upload. Please try again.');
  //   });
}
