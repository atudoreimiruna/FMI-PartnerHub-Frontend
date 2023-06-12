import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'user-profile-partners',
    templateUrl: './user-profile-partners.component.html',
    styleUrls: ['./user-profile-partners.component.scss']
})
export class UserProfilePartnersComponent implements OnInit {
  
  constructor(
    public studentService: StudentsService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;
  public partners!: Partner[];
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
      this.student = result;
      console.log(this.student)
      this.partners = result.partners;
    })
  }

  public deleteStudentPartner(partner: Partner) : void {
    window.location.reload();
    console.log(this.student.id, partner.id)
    this.studentService.deleteStudentPartner(this.student.id, partner.id).subscribe( (result: any) => {
      if(result) { 
      }
    })
  }
}