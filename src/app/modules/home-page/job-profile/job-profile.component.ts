import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'job-profile',
    templateUrl: './job-profile.component.html',
    styleUrls: ['./job-profile.component.scss']
})
export class JobProfileComponent {
  public jobId!: string;
  public job!: Job;
  public message: any;
  
  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
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