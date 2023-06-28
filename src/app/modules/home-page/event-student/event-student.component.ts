import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/interfaces/student';

@Component({
    selector: 'event-student',
    templateUrl: './event-student.component.html',
    styleUrls: ['./event-student.component.scss']
})
export class EventStudentComponent {

  public isAlert = false;
  public alertMsg!: string;
  public student!: Student;

  constructor(public dialogRef: MatDialogRef<EventStudentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
      this.student = this.data.student;
    }

  closeDialog() {
      this.dialogRef.close();
  }

  resetAlert() {
    this.isAlert = false; 
  }

  closeAlert() {
    setTimeout(() => {
      this.isAlert = false; 
    }, 5000); 
  }
}