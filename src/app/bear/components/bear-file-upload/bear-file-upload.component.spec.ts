import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearFileUploadComponent } from './bear-file-upload.component';

describe('BearFileUploadComponent', () => {
  let component: BearFileUploadComponent;
  let fixture: ComponentFixture<BearFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
