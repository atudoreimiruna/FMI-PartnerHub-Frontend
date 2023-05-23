import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, TypeJobEnum } from 'src/app/interfaces/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'job-left',
    templateUrl: './job-left.component.html',
    styleUrls: ['./job-left.component.scss']
})
export class JobLeftComponent implements OnDestroy, OnInit {

  public jobId!: string;
  public job!: Job;
  public message: any;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
  ) { }

    // Mapping object
    private static typeJobEnumMap = {
        [TypeJobEnum.FullTime]: 'Full Time',
        [TypeJobEnum.PartTime]: 'Part Time',
        [TypeJobEnum.Internship]: 'Internship'
    };

    public getTypeJobString(value: TypeJobEnum): string {
        return JobLeftComponent.typeJobEnumMap[value] || '';
        }

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