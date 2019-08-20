import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BearGlobal} from '../../bear/BearGlobal';
import {PojoService} from '../../services/pojo/pojo.service';
import {Observable} from 'rxjs';
import {DialogService} from 'primeng/api';
import {BidComponent} from './bid/bid.component';

@Component({
  selector: 'bear-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [DialogService],
  entryComponents: [BidComponent],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {

  projectObservable: Observable<any>;
  bidObservable: Observable<any>;

  requestUrl = this.bearGlobal.apiEndpoint;

  bidSelectedDialog: boolean;
  selectedBid: any;

  userBade: boolean;
  bidButtonMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private bearGlobal: BearGlobal,
              private pojoService: PojoService,
              private dialogService: DialogService) { }

  projectId = this.activatedRoute.snapshot.params.id;

  ngOnInit() {
    this.projectObservable = this.pojoService.getById('project', this.projectId);
    this.bidObservable = this.pojoService.getById('bid/project', this.projectId);

    this.bidObservable.subscribe(
      (value => {
        this.userBade = value.some(item => item.user.id === sessionStorage.getItem(this.bearGlobal.userId));
        this.bidButtonMessage = this.userBade ? 'Teklif Verildi' : 'Teklif Ver';
      }),
      (error1 => {
        console.error('error project detail component code: 44');
      }),
    );
  }

  bid() {
    const ref = this.dialogService.open(BidComponent, {
      header: 'Teklif ver',
      width: '60%',
      contentStyle: {'max-height': '350px', overflow: 'auto'},
      data: this.projectId
    });

    ref.onClose.subscribe((result) => {
      console.log('on close with result: ' + result);
      this.bidObservable = this.pojoService.getById('bid/project', this.projectId);
    });
  }

  onSelectedBid(event: Event, bid: any) {
    this.selectedBid = bid;
    this.bidSelectedDialog = true;
    event.preventDefault();
  }

  onBidDialogHide() {
    this.selectedBid = null;
  }

}
