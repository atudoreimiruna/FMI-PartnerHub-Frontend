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

  // for filtering jobs
  public isDropdownOpen = false;
  public isDropdownOpen1 = false;
  public isDropdownOpen2 = false;
  public uniqueAddresses!: string[];
  public uniquePartners!: string[];
  public uniqueCategories!: string[];
  public selectedAddress!: string;
  public selectedPartner!: string;
  public selectedCategory!: string;
  public searchTerm!: string;
  public filteredJobs!: Job[];

  // for pagination
  // public page: number = 1;
  // public count: number = 0;
  // public tableSize: number = 5;
  // public tableSizes: any = [5, 10, 15, 20];
  // public currentPage: number = 1;
  // public pageSize: number = 5;
  // public totalJobsCount: number = 0;
  
  public displayCount: number = 8;
  private pageNumber: number = 1;
  public pageSize: number = 5;

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

  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  }

  selectAddress(address: string) {
    this.selectedAddress = address;
    if (this.selectedAddress === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(this.selectedPartner, this.selectedAddress, this.selectedCategory);
    }
  }

  selectPartner(partner: string) {
    this.selectedPartner = partner;
    if (this.selectedPartner === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(this.selectedPartner, this.selectedAddress, this.selectedCategory);
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if (this.selectedCategory === 'all') {
      this.getAllJobs()
    } else {
      this.getJobsByFilter(this.selectedPartner, this.selectedAddress, this.selectedCategory);
    }
  }

  selectPagination(event: any) : void {
    console.log(event);
    // add if for partner, address and category
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getJobsByFilter(this.selectedPartner, this.selectedAddress, this.selectedCategory);
  }

  loadJobs()
  {
    this.jobsService.getJobs(this.pageNumber, this.pageSize).subscribe(jobs => {
      this.jobs = jobs;
      this.filteredJobs = this.jobs;
      this.uniqueAddresses = [...new Set(jobs.map(job => job.address))];
      this.uniquePartners = [...new Set(jobs.map(job => job.partnerName))];
      this.uniqueCategories = [...new Set(jobs.map(job => job.title))];
    });
  }

  public getAllJobs(): void {
    this.jobsService.getJobs(this.pageNumber, this.pageSize).subscribe((result) => {
      this.jobs = result;
    });
  }

  // public onTableDataChange(event: any) {
  //   this.page = event;
  //   this.getAllJobs();
  // }
  // public onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getAllJobs();
  // }

  public getJobsByFilter(partner?: string, address?: string, category?: string) {
    this.jobsService.getJobsFilter(this.pageNumber, this.pageSize, partner, address, category).subscribe(jobs => {
      console.log(this.pageNumber, this.pageSize)
      console.log(jobs)
      this.jobs = jobs;
    });
  }

  // public filterJobs(): void {
  //   const url = `https://localhost:44330/api/jobs?PartnerName=${this.searchTerm}`;

  //   this.http.get<Job[]>(url).subscribe(
  //     (response) => {
  //       this.jobs = response; // Store all jobs
  //       this.filteredJobs = this.jobs; // Initialize filtered jobs with all jobs
  //     },
  //     (error) => {
  //       console.error('Failed to fetch jobs:', error);
  //     }
  //   );
  // }

  ngOnInit() {
    this.loadJobs();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}