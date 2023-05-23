import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { JobsService } from 'src/app/services/jobs.service';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
    selector: 'profile-left',
    templateUrl: './profile-left.component.html',
    styleUrls: ['./profile-left.component.scss']
})
export class ProfileLeftComponent implements OnDestroy, OnInit {

  public partnerId!: string;
  public partners!: Partner[];
  public partner!: Partner;
  public message: any;
  public jobs!: Job[];
  
  constructor(
    private partnersService: PartnersService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

    ngOnInit() {
      this.partnerId = this.route.snapshot.paramMap.get('id')!;
      this.getPartner();
    }

  public getPartner() : void {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      console.log(this.partner);
    })
  }

  public getJobsByFilter(partner?: string) {
    this.jobsService.getJobsFilter(0, 0, partner).subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  loadJobsByPartner(partnerName: string): void {
    this.jobsService.loadJobsByPartner(partnerName);

    // Redirect to the jobs page
    this.router.navigateByUrl('/joburi');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}