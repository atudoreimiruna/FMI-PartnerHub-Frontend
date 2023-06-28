import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { Event } from 'src/app/interfaces/event'
import { Slide } from 'src/app/interfaces/slide';
import { DataService } from 'src/app/services/data.services';
import { JobsService } from 'src/app/services/jobs.service';
import { PartnersService } from 'src/app/services/partners.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public slides: Slide[] = [
    { url: '../../../../assets/slideshow_1.jpg', title: 'image1'},
    { url: '../../../../assets/slideshow_2.jpg', title: 'image2'},
    { url: '../../../../assets/slideshow_3.jpg', title: 'image3'}
  ];

  public id: Number | undefined;
  public partners!: Partner[];
  public jobs!: Job[];
  public events!: Event[];
  public partner!: Partner;
  public subscription!: Subscription;
  public message: any;
  @ViewChild("partnerspage") partnerspage! : ElementRef;
  @ViewChild("eventspage") eventspage! : ElementRef;
  public showAllPartners!: boolean;

  constructor(
    private partnersService: PartnersService,
    private jobsService: JobsService,
    private eventsService: EventsService,
    private router: Router,
    private data: DataService
  ) { this.getAllPartners();
      this.getAllJobs();
      this.getAllEvents();
      this.partnersService.changedUrl.subscribe(() => { this.partnerspage.nativeElement.scrollIntoView({behavior: 'smooth'})})
      this.eventsService.changedUrl.subscribe(() => { this.eventspage.nativeElement.scrollIntoView({behavior: 'smooth'})})
      this.showAllPartners = false;
    }

    isUserAuthorized()
    {
      const roles = localStorage.getItem("roles")
      return roles?.includes("User")
    }
  
  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }

  public getAllJobs(): void {
    this.jobsService.getJobs(0, 0).subscribe((result) => {
      this.jobs = result;
    });
  }

  public getAllEvents(): void {
    this.eventsService.getEvents().subscribe((result) => {
      this.events = result;
    });
  }

  public getPartner() : void {
    this.partnersService.getPartnerById(this.id).subscribe( (result) => {
      this.partner = result;
      console.log(this.partner);
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}