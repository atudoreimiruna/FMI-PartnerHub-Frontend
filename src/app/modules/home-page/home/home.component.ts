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
    { url: 'https://scontent.fotp3-4.fna.fbcdn.net/v/t39.30808-6/346457768_157217477307563_2943196882167428327_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=s-5Bb4JWGjsAX_HW3mD&_nc_ht=scontent.fotp3-4.fna&oh=00_AfClLzbkFQJPuCHd5N5HQiwS4pz0rCUpJWBf0kH3EREbbg&oe=648A702E', title: 'image1'},
    { url: 'https://scontent.fotp3-4.fna.fbcdn.net/v/t39.30808-6/346281742_207649775382683_7206633406998060326_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=_yuQcWNVeHwAX-sWogG&_nc_ht=scontent.fotp3-4.fna&oh=00_AfCvunWKkOh8Bfns2W-R6Qy6nDfl74C_dvnA6ucherW4iA&oe=648B51EE', title: 'image2'},
    { url: 'https://scontent.fotp3-4.fna.fbcdn.net/v/t39.30808-6/346091429_1382493435861550_2364217179068669190_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=1IxWSJHoRb8AX8p88pH&_nc_ht=scontent.fotp3-4.fna&oh=00_AfAuQ5EFuj7mzizRM5KT9jz0CDKxTYHS2JiPSu74nTOPiw&oe=648A39A6', title: 'image3'}
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