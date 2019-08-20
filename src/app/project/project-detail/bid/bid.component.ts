import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PojoService} from '../../../services/pojo/pojo.service';
import {BearGlobal} from '../../../bear/BearGlobal';

@Component({
  selector: 'bear-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  bidForm: FormGroup;

  constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private pojoService: PojoService,
      private messageService: MessageService,
      private bearGlobal: BearGlobal
    ) { }

  ngOnInit() {
    this.bidForm = new FormGroup({
      description: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200)])),
      bidAmount: new FormControl('', Validators.required),
      days: new FormControl('', Validators.required),
    });
  }

  priceValidator(): boolean {
    return  isNaN(Number(this.bidForm.controls.bidAmount.value.toString()));
  }

  onSubmit() {
    if (!this.bidForm.invalid) {
      this.pojoService.save(this.bidForm.value, 'bid/' + this.config.data + '/' + sessionStorage.getItem(this.bearGlobal.userId)).subscribe(
        (result) => {
          this.messageService.add({severity: 'success', summary: 'Proje Kayıt Edildi'});
          this.ref.close(result.id);
        }, (error) => {
          this.messageService.add({severity: 'error', summary: error.error.errorMessage});
        }
      );
    }
  }

}
