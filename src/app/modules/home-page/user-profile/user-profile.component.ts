import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { AuthService } from 'src/app/services/auth.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  constructor(
    public authService: AuthService,
    public studentService: StudentsService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.getStudent();
  }

  public getStudent() : void {
    this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
      this.student = result;
      console.log(this.student);
    })
  }

  logout() {
    this.authService.logout();
  }
}