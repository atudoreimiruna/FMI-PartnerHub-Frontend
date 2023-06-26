import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Student } from 'src/app/interfaces/student';
import { StudentJob } from 'src/app/interfaces/studentJob';
import { StudentJobStatusEnum, StudentJobView } from 'src/app/interfaces/studentJobView';
import { JobsService } from 'src/app/services/jobs.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'user-profile-jobs',
    templateUrl: './user-profile-jobs.component.html',
    styleUrls: ['./user-profile-jobs.component.scss']
})
export class UserProfileJobsComponent implements OnInit {
  
  constructor(
    public studentService: StudentsService,
    public jobsService: JobsService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;
  public jobs!: Job[];
  public isAlert = false;
  public alertMsg!: string;
  public studentJobs!: StudentJob[];
  public studentJobsView!: StudentJobView[];
  public favoriteJobs!: Job[];
  public appliedJobs!: Job[];

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.getStudent();
    this.getStudentByEmail();
    this.getStudentJobs();
  }

  resetAlert() {
    this.isAlert = false; 
  }

  closeAlert() {
    setTimeout(() => {
      this.isAlert = false; 
    }, 5000); 
  }

  public getStudent() : void {
    this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
      this.student = result;
      // console.log(this.student)
      this.jobs = result.jobs;
    })
  }

  public getStudentJobs(): void {
    this.studentService.getStudentJobs(this.email).subscribe(async (result) => {
      this.studentJobsView = result;
      console.log(this.studentJobsView)
      const favoriteJobsPromises = this.studentJobsView
        .filter((job) => job.jobStatus === StudentJobStatusEnum.Favorite)
        .map((job) => this.jobToJobObject(job));
  
      const appliedJobsPromises = this.studentJobsView
        .filter((job) => job.jobStatus === StudentJobStatusEnum.Application)
        .map((job) => this.jobToJobObject(job));
  
      this.favoriteJobs = [];
      this.appliedJobs = [];
  
      for (const promise of favoriteJobsPromises) {
        const job = await promise;
        this.favoriteJobs.push(job);
      }
      console.log(this.favoriteJobs)
      for (const promise of appliedJobsPromises) {
        const job = await promise;
        this.appliedJobs.push(job);
      }
    });
  }
  
  private async jobToJobObject(job: StudentJobView): Promise<Job> {
    const completeJob = await this.jobsService.getJobById(job.jobId).toPromise();
    if (completeJob) {
      return {
        id: completeJob.id,
            title: completeJob.title,
            minSalary: completeJob.minSalary,
            maxSalary: completeJob.maxSalary,
            address: completeJob.address,
            experience: completeJob.experience,
            type: completeJob.type,
            description: completeJob.description,
            criteria: completeJob.criteria,
            skills: completeJob.skills,
            partnerLogo: completeJob.partnerLogo,
            partnerName: completeJob.partnerName,
            activated: completeJob.activated,
            lastUpdated: completeJob.lastUpdated,
            createdAt: completeJob.createdAt,
            salary: completeJob.salary,
            minExperience: completeJob.minExperience,
            maxExperience: completeJob.maxExperience
      };
    } else {
      throw new Error(`Job not found for jobId: ${job.jobId}`);
    }
  }

  // joburi recomandate
  public getStudentByEmail() : void {
    this.studentService.getJobsForStudentByEmail(this.email).subscribe( (result) => {
      this.studentJobs = result;
      // console.log(this.studentJobs)
    })
  }
  
  public deleteStudentJob(job: Job) : void {
    window.location.reload();
    // console.log(this.student.id, job.id)
    this.studentService.deleteStudentJob(this.student.id, job.id).subscribe( (result: any) => {
      if(result) { 
      }
    })
  }
}

