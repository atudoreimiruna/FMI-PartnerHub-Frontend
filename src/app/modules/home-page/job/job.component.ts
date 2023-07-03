import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  public id: Number | undefined;
  public jobs!: Job[];
  public jobsPag!: Job[];
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
  public displayCount: number = 0;
  private pageNumber: number = 1;
  public pageSize: number = 5;

  constructor(private jobsService: JobsService) { 
    this.getAllJobs();
    this.getAllJobsWithoutPagination();
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
    // add if for partner, address and category
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getJobsByFilter(this.selectedPartner, this.selectedAddress, this.selectedCategory);
  }

  loadJobs()
  {
    this.jobsService.getJobs(this.pageNumber, this.pageSize).subscribe(jobs => {
      this.filteredJobs = this.jobs;
      this.uniqueAddresses = [...new Set(this.jobsPag.map(job => job.address))];
      this.uniquePartners = [...new Set(this.jobsPag.map(job => job.partnerName))];
      this.uniqueCategories = [...new Set(this.jobsPag.map(job => job.title))];
    });
  }

  public getAllJobs(): void {
    this.jobsService.getJobs(this.pageNumber, this.pageSize).subscribe((result) => {
      this.jobs = result;
    });
  }

  public getAllJobsWithoutPagination(): void {
    this.jobsService.getJobsWithoutPagination().subscribe((result) => {
      this.jobsPag = result;
      this.displayCount = result.length;
    });
  }

  public getJobsByFilter(partner?: string, address?: string, category?: string) {
    this.jobsService.getJobsFilter(this.pageNumber, this.pageSize, partner, address, category).subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  ngOnInit() {
    this.loadJobs();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}