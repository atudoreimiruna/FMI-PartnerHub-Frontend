import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
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
    public fileService: FilesService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;
  public fileNames!: string[];

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.getStudent();
  }

  public getStudent() : void {
    this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
      this.student = result;
      this.fileNames = result.fileNames;
    })
  }

  public deleteFile(fileName: string) : void {
    window.location.reload();
    this.fileService.deleteFile(fileName).subscribe( (result) => {
      if ( result ) {
      }
    })
  }

  public downloadFile(fileName: string) : void {
    this.fileService.downloadFile(fileName).subscribe( (result) => {
      if ( result ) {
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}