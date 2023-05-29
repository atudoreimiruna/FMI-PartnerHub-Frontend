import { Component, OnDestroy, OnInit } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { Event } from 'src/app/interfaces/event';
import { PartnersService } from 'src/app/services/partners.service';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnDestroy, OnInit {

  public partnerId!: string;
  public partners!: Partner[];
  public events!: Event[];
  public partner!: Partner;
  public message: any;
  public partnerName!: string;
  
  constructor(
    private partnersService: PartnersService,
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) { }

    ngOnInit() {
      this.partnerId = this.route.snapshot.paramMap.get('id')!;
      this.getPartner();
      this.getEventsByPartner();
    }

  public getPartner() : void {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      this.partnerName = result.name;
    })
  }

  public getEventsByPartner() : void {
    console.log(this.partnerId)
    this.eventsService.getEventsByPartnerId(this.partnerId).subscribe( (result) => {
      this.events = result;
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}