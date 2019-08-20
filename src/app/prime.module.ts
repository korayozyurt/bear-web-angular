import {NgModule} from '@angular/core';
import {
  AccordionModule, AutoCompleteModule,
  ButtonModule,
  CardModule, CarouselModule, DialogModule, DropdownModule, EditorModule, FieldsetModule,
  FileUploadModule, InputMaskModule, InputTextareaModule,
  InputTextModule, KeyFilterModule, MessageModule, MessagesModule, PaginatorModule, PanelModule,
  PasswordModule, ProgressSpinnerModule, RatingModule, ScrollPanelModule,
  SplitButtonModule
} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  imports: [
    AccordionModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ToastModule,
    InputMaskModule,
    AutoCompleteModule,
    CarouselModule,
    DialogModule,
    EditorModule,
    FieldsetModule,
    InputTextareaModule,
    CardModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    PanelModule,
    DynamicDialogModule,
    KeyFilterModule,
    PaginatorModule,
    DataViewModule,
    DropdownModule,
    RatingModule
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ToastModule,
    InputMaskModule,
    AutoCompleteModule,
    CarouselModule,
    DialogModule,
    EditorModule,
    FieldsetModule,
    InputTextareaModule,
    CardModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    PanelModule,
    DynamicDialogModule,
    KeyFilterModule,
    PaginatorModule,
    DataViewModule,
    DropdownModule,
    RatingModule
  ]
})
export class PrimeModule { }
