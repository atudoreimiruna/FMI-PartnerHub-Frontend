import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'user-profile-jobs',
    templateUrl: './user-profile-jobs.component.html',
    styleUrls: ['./user-profile-jobs.component.scss']
})
export class UserProfileJobsComponent implements OnInit {
  
  constructor(
    public studentService: StudentsService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;
  public jobs!: Job[];
  public isAlert = false;
  public alertMsg!: string;

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.getStudent();
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
      console.log(this.student)
      this.student = result;
      this.jobs = this.student.jobs;
    })
  }
}