import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadFileService} from '../../services/upload/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {PojoService} from '../../services/pojo/pojo.service';
import {MessageService} from 'primeng/api';
import {BearGlobal} from '../../bear/BearGlobal';

@Component({
  selector: 'bear-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectForm: FormGroup;

  currentFileUpload: File;
  progress: { imagePercentage: number } = { imagePercentage: 0 };

  constructor(
    private bearGlobal: BearGlobal,
    private uploadService: UploadFileService,
    private pojoService: PojoService,
    private  messageService: MessageService
  ) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
       projectCategory: new FormControl('', Validators.required),
       imagePath: new FormControl(''),
       smallDescription: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200)])),
       description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(15)]))
    });
  }

  fileUrlObserver(event) {
    this.currentFileUpload = event.files[0];
    const fileObserver = {
      next: fileEvent => {
        if (fileEvent.type === HttpEventType.UploadProgress) {
          this.progress.imagePercentage = Math.round(100 * fileEvent.loaded / fileEvent.total);
        } else if ( fileEvent instanceof HttpResponse) {
          if (fileEvent.status === 201) {
            this.projectForm.controls.imagePath.setValue(fileEvent.body);
          } else {
            console.log('error');
          }
        }
      }
    };

    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(fileObserver);
  }

  onSubmit() {
    if (!this.projectForm.invalid) {
      this.projectForm.value.projectOwner = sessionStorage.getItem(this.bearGlobal.username);
      this.pojoService.save(this.projectForm.value, 'project').subscribe((result) => {
        this.messageService.add({severity: 'success', summary: 'Proje Kayıt Edildi'});
      }, (error) => {
        this.messageService.add({severity: 'error', summary: error.error.errorMessage});
      }, () => {
        // do nothing
      });
    }
  }

}
