import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, TypeJobEnum } from 'src/app/interfaces/job';
import { Student } from 'src/app/interfaces/student';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'job-left',
    templateUrl: './job-left.component.html',
    styleUrls: ['./job-left.component.scss']
})
export class JobLeftComponent implements OnDestroy, OnInit {

  public jobId!: string;
  public job!: Job;
  public message: any;
  public email!: string;
  public student!: Student;
  public isAlert = false;
  public alertMsg!: string;

  constructor(
    private jobsService: JobsService,
    public studentService: StudentsService,
    public authService: AuthService,
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
        // this.email = this.authService.getEmailFromToken();
        this.jobId = this.route.snapshot.paramMap.get('id')!;
        this.getJob();
    }

    resetAlert() {
        this.isAlert = false; 
    }
    
    closeAlert() {
        setTimeout(() => {
            this.isAlert = false; 
        }, 5000); 
    }

    public getJob() : void {
        this.jobsService.getJobById(this.jobId).subscribe( (result) => {
        this.job = result;
        console.log(this.job);
        })
    }

    public updateJobOnStudent() : void {
        this.email = this.authService.getEmailFromToken();
        this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
            this.student = result;
            console.log(this.student);

        const requestBody: any = {};
        requestBody.id = this.student.id;
        requestBody.jobId = this.jobId;

        this.studentService.updateJobOnStudent(requestBody)
            .subscribe(
            (response: any) => {
              this.isAlert = true;
              this.alertMsg = "Ai încărcat cu succes CV-ul tău!"
              this.closeAlert();
            },
            (error: any) => {
            }
        );
        });
        this.resetAlert()
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
}