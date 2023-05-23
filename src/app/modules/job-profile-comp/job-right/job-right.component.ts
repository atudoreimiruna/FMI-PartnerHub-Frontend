import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'job-right',
    templateUrl: './job-right.component.html',
    styleUrls: ['./job-right.component.scss']
})
export class JobRightComponent implements OnDestroy, OnInit {

  public jobId!: string;
  public job!: Job;
  public message: any;
  
  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

    ngOnInit() {
      this.jobId = this.route.snapshot.paramMap.get('id')!;
      this.getJob();
    }

  public getJob() : void {
    this.jobsService.getJobById(this.jobId).subscribe( (result) => {
      this.job = result;
      console.log(this.job);
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}