import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, TypeJobEnum } from 'src/app/interfaces/job';
import { Student } from 'src/app/interfaces/student';
import { StudentJobView } from 'src/app/interfaces/studentJobView';
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
  public email!: string | null;
  public student!: Student;
  public isAlert = false;
  public alertMsg!: string;
  public isDropdownOpen = false;
  public selectedRating!: number;
  public studentJobView!: StudentJobView;

  public ratingOptions = [
    { value: "5", text: "Foarte interesat/ă" },
    { value: "4", text: "Puțin interesat/ă" },
    { value: "3", text: "Neutru" },
    { value: "2", text: "Puțin neinteresat/ă" },
    { value: "1", text: "Neinteresat/ă" }
  ];

  public ratingText: { [key: string]: string } = {
    "5": "Foarte interesat/ă",
    "4": "Puțin interesat/ă",
    "3": "Neutru",
    "2": "Puțin neinteresat/ă",
    "1": "Neinteresat/ă"
};

  constructor(
    private jobsService: JobsService,
    public studentService: StudentsService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { this.getStudentJob(); }

    // Mapping object
    private static typeJobEnumMap = {
        [TypeJobEnum.FullTime]: 'Full Time',
        [TypeJobEnum.PartTime]: 'Part Time',
        [TypeJobEnum.Internship]: 'Internship'
    };

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }

    isUserAuthorized()
    {
      const roles = localStorage.getItem("roles")
      return roles?.includes("User")
    }

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
        // console.log(this.job);
        })
    }

    public getStudentJob() : void {
        this.email = this.authService.getEmailFromToken();
        this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
            this.student = result;

            this.studentService.getStudentJob(this.student.id, this.jobId).subscribe( (result) => {
                this.studentJobView = result;
                this.selectedRating = result?.jobRating;
            })
        });
    }

    // aplicari
    public updateJobStatusToApplyOnStudent() : void {
        this.email = this.authService.getEmailFromToken();
        this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
            this.student = result;
            // console.log(this.student);

        const requestBody: any = {};
        requestBody.id = this.student.id;
        requestBody.jobId = this.jobId;
        requestBody.jobStatus = 2;

        this.studentService.updateJobOnStudent(requestBody)
            .subscribe(
            (response: any) => {
              this.isAlert = true;
              this.alertMsg = "Ai aplicat cu succes la acest job!"
              this.closeAlert();
            },
            (error: any) => {
            }
        );
        });
        this.resetAlert()
    }

    
    // joburi favorite
    public updateJobStatusToFavoriteOnStudent() : void {
        this.email = this.authService.getEmailFromToken();
        this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
            this.student = result;
            // console.log(this.student);

        const requestBody: any = {};
        requestBody.id = this.student.id;
        requestBody.jobId = this.jobId;
        requestBody.jobStatus = 1;

        this.studentService.updateJobOnStudent(requestBody)
            .subscribe(
            (response: any) => {
              this.isAlert = true;
              this.alertMsg = "Ai adăugat jobul cu succes în lista ta de favorite!"
              this.closeAlert();
            },
            (error: any) => {
            }
        );
        });
        this.resetAlert()
    }

    // evaluare
    public updateJobStatusToRateOnStudent() : void {
        this.email = this.authService.getEmailFromToken();
        this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
            this.student = result;
            // console.log(this.student);

        const requestBody: any = {};
        requestBody.id = this.student.id;
        requestBody.jobId = this.jobId;
        requestBody.jobRating = this.selectedRating;

        this.studentService.updateJobOnStudent(requestBody)
            .subscribe(
            (response: any) => {
              this.isAlert = true;
              this.alertMsg = "Ai evaluat cu succes acest job!"
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