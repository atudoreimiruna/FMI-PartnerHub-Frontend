import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    { url: 'https://images.indianexpress.com/2019/10/study1.jpg', title: 'image1'},
    { url: 'https://static-cse.canva.com/blob/558511/studyingtips1.jpg', title: 'image2'},
    { url: 'https://gradepowerlearning.com/wp-content/uploads/2018/09/how-to-use-self-study-860x420.jpeg', title: 'image3'}
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