import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {BearGlobal} from '../../BearGlobal';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'bear-file-upload',
  templateUrl: './bear-file-upload.component.html',
  styleUrls: ['./bear-file-upload.component.css']
})
export class BearFileUploadComponent {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;

  @Input() isImage: boolean;

  @Output() percentageObserver: EventEmitter<Observable<number>> = new EventEmitter<Observable<number>>();
  @Output() fileUrlObserver: EventEmitter<Observable<string>> = new EventEmitter<Observable<string>>();
  @Output() isFileUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  isHovering: boolean;

  file: File;
  filename: string;

  constructor(private storage: AngularFireStorage,
              private bearGlobal: BearGlobal,
              private messageService: MessageService) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {

    this.file = event.item(0);

    this.filename = this.file.name;

    if (this.isImage && this.file.type.split('/')[0] !== 'image') {
      this.messageService.add({severity: 'error', summary: 'Sadece Resim Türleri'});
      return;
    }

    const path = `${this.getUsername()}/${new Date().getTime()}-_-${this.file.name}`;
    const customMetadata = { not: 'Tüm hakları MKT tarafından saklıdır'};

    this.task = this.storage.upload(path, this.file, { customMetadata });

    this.percentage = this.task.percentageChanges();
    this.percentageObserver.emit(this.percentage);

    this.snapshot = this.task.snapshotChanges();

    this.task.snapshotChanges().pipe(
      finalize( () => {
        this.fileUrlObserver.emit(this.storage.ref(path).getDownloadURL());
      } )
    ).subscribe(
      (result) => {
        if (result.bytesTransferred === result.totalBytes) {
          this.isFileUploaded.emit(true);
        }
      }
    );
  }

  getUsername() {
    const username = sessionStorage.getItem(this.bearGlobal.username) != null
      ? sessionStorage.getItem(this.bearGlobal.username)
      : 'bear_offline_user';
    return username;
  }

  removeFile() {
    // this.filename = null;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
