import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnDestroy {

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}