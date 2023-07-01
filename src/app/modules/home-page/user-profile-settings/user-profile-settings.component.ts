import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Student } from 'src/app/interfaces/student';
import { FilesService } from 'src/app/services/files.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'user-profile-settings',
    templateUrl: './user-profile-settings.component.html',
    styleUrls: ['./user-profile-settings.component.scss']
})
export class UserProfileSettingsComponent implements OnInit {
  
  constructor(
    public studentService: StudentsService,
    public fileService: FilesService,
    private route: ActivatedRoute
  ) { }

  public email!: string;
  public student!: Student;
  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;
  public file!: File;
  public Editor = ClassicEditor;

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

  resetAlertRed() {
    this.isAlertRed = false; 
  }

  closeAlertRed() {
    setTimeout(() => {
      this.isAlertRed = false; 
    }, 5000); 
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file && this.student.id) {
      this.fileService.uploadFile(2, this.student.id, this.file)
        .subscribe(
          (response: any) => {
            this.isAlert = true;
            this.alertMsg = "Ai încărcat cu succes CV-ul tău!"
            this.closeAlert();
          },
          (error: any) => {
            this.isAlertRed = true;
            this.alertMsgRed = "CV-ul nu a fost încărcat!"
            this.closeAlertRed();
          }
        );
    }
    this.resetAlert()
    this.resetAlertRed()
  }

  updateStudent(form: NgForm) {
    const { personalEmail, phone, degree, skill, description } = form.value;

    const requestBody: any = {};
    requestBody.id = this.student.id;
    if (personalEmail) requestBody.personalEmail = personalEmail;
    if (phone) requestBody.phone = phone;
    if (degree) requestBody.degree = degree;
    if (skill) requestBody.skill = skill;
    if (description) requestBody.description = description;

    this.studentService.updateStudent(requestBody)
      .subscribe(
        response => {
          this.isAlert = true;
          this.alertMsg = "Ai actualizat cu succes informațiile tale!"
          this.closeAlert();
        },
        error => {
          this.isAlertRed = true;
          this.alertMsgRed = "Informațiile nu au fost actualizate!"
          this.closeAlertRed();
        }
      );
      this.resetAlert()
      this.resetAlertRed()
  }

  public getStudent() : void {
    this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
      this.student = result;
    })
  }
}

