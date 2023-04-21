import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { DataService } from 'src/app/services/data.services';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  public id: Number | undefined;
  public jobs!: Job[];
  public message: any;
  public isDropdownOpen = false;
  public isDropdownOpen1 = false;
  public uniqueAddresses!: string[];
  public uniquePartners!: string[];
  public selectedAddress!: string;
  public selectedPartner!: string;

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private data: DataService
  ) { 
      this.getAllJobs();
    }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }

  selectAddress(address: string) {
    this.selectedAddress = address;
    if (this.selectedAddress === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(undefined, this.selectedAddress);
    }
  }

  selectPartner(partner: string) {
    this.selectedPartner = partner;
    if (this.selectedPartner === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(this.selectedPartner, undefined);
    }
  }

  public getAllJobs(): void {
    this.jobsService.getJobs().subscribe((result) => {
      this.jobs = result;
    });
  }

  public getJobsByFilter(partner?: string, address?: string) {
    this.jobsService.getJobsFilter(partner, address).subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  ngOnInit() {
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.uniqueAddresses = [...new Set(jobs.map(job => job.address))];
      this.uniquePartners = [...new Set(jobs.map(job => job.partnerName))];
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}