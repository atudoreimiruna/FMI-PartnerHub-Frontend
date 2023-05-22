import { HttpClient } from '@angular/common/http';
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
  public searchTerm!: string;
  public filteredJobs!: Job[];

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private data: DataService,
    private http: HttpClient
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
      this.getJobsByFilter(this.selectedPartner, this.selectedAddress);
    }
  }

  selectPartner(partner: string) {
    this.selectedPartner = partner;
    if (this.selectedPartner === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(this.selectedPartner, this.selectedAddress);
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

  public filterJobs(): void {
    const url = `https://localhost:44330/api/jobs?PartnerName=${this.searchTerm}`;

    this.http.get<Job[]>(url).subscribe(
      (response) => {
        this.jobs = response; // Store all jobs
        this.filteredJobs = this.jobs; // Initialize filtered jobs with all jobs
      },
      (error) => {
        console.error('Failed to fetch jobs:', error);
      }
    );
  }

  ngOnInit() {
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.filteredJobs = this.jobs;
      this.uniqueAddresses = [...new Set(jobs.map(job => job.address))];
      this.uniquePartners = [...new Set(jobs.map(job => job.partnerName))];
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}