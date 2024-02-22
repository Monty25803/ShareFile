import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShareFile';

  handleFileDrop(event: any): void {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFileView(files);
  }
  
  handleDragOver(event: any): void {
    event.preventDefault();
    const fileView = document.getElementById('file-view');
    if (fileView) {
      fileView.classList.add('drag-over');
    }
  }

  handleFileInputClick(): void {
    const fileInput = document.getElementById('input-file');
    fileInput?.click();
  }

  handleFileSelect(event: any): void {
    const files = event.target.files;
    this.handleFileView(files);
  }

  removeFile = (index: number, files: FileList, listItem: HTMLElement): void => {
    const fileList = document.getElementById('file-list');
    const fileListText = document.getElementById('file-list-text');
    if (fileList) {
        fileList.removeChild(listItem);
        const remainingFiles = fileList.getElementsByTagName('div').length;
        if (remainingFiles === 0 && fileListText) {
          fileListText.innerHTML = 'Drag and drop or click to select files';
          
        } 
        else if (fileListText) {
          fileListText.innerHTML = `${remainingFiles} file(s) selected.`;
        }
     }
  }

  handleFileView = (files: FileList): void => {
    const fileView = document.getElementById('file-view');
    const fileListText = document.getElementById('file-list-text');
    const fileList = document.getElementById('file-list');
    if (fileView) {
    fileView.classList.remove('drag-over');
    }
    if (files.length > 0) {
    if (fileListText) {
        fileListText.innerHTML = `${files.length} file(s) selected.`;
    }
    if (fileList) {
      for (let i = 0; i < files.length; i++) {
        const listItem = document.createElement('div');
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';

        const fileNameSpan = document.createElement('span');
        fileNameSpan.textContent = `${i + 1}. ${files[i].name}`;

        const removeIcon = document.createElement('span');
        removeIcon.textContent = '❌';
        removeIcon.style.cursor = 'pointer';
        removeIcon.onclick = () => this.removeFile(i, files, listItem);

        listItem.appendChild(fileNameSpan);
        listItem.appendChild(removeIcon);
        fileList.appendChild(listItem);
      }
    }
  } else {
  if (fileListText) {
      fileListText.innerHTML = 'Drag and drop or click to select files';
    }
  if (fileList) {
      fileList.innerHTML = '';
    }
   }
  }

  uploadFile(): void {
    const fileInput = document.getElementById('input-file') as HTMLInputElement;
    const yearMonthInput = document.getElementById('yearMonth') as HTMLInputElement;
    console.log('fileInput:', fileInput.files);
    console.log('yearMonthInput:', yearMonthInput.value);
    const files = fileInput.files;
    
    if (!files || files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    const selectedYearMonth = yearMonthInput.value;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('yearMonth', selectedYearMonth);

    // Add your HTTP service call here using Angular HttpClient
  }
}