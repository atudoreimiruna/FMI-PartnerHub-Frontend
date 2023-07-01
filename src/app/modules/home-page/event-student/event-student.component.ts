import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Resume } from 'src/app/interfaces/resume';
import { Student } from 'src/app/interfaces/student';
import { FilesService } from 'src/app/services/files.service';

@Component({
    selector: 'event-student',
    templateUrl: './event-student.component.html',
    styleUrls: ['./event-student.component.scss']
})
export class EventStudentComponent {

  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;
  public student!: Student;

  constructor(public dialogRef: MatDialogRef<EventStudentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  public fileService: FilesService,
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

  resetAlertRed() {
    this.isAlertRed = false; 
  }

  closeAlertRed() {
    setTimeout(() => {
      this.isAlertRed = false; 
    }, 5000); 
  }

  public downloadFile(fileName: string): void {
    this.fileService.downloadFile(fileName).subscribe(
      (response: Resume) => {
        const data = `data:application/pdf;base64,${response.content}`;
        const link = document.createElement('a');
        link.href = data;
        link.download = response.name;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        this.isAlert = true;
        this.alertMsg = "Ai descărcat cu succes CV-ul!";
        this.closeAlert();
      },
      (error: any) => {
        this.isAlertRed = true;
        this.alertMsgRed = "CV-ul nu a fost descărcat!"
        this.closeAlertRed();
      }
    );
    this.resetAlert();
    this.resetAlertRed()
  }
  
}