import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Job } from 'src/app/interfaces/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
    selector: 'event-settings-edit-job',
    templateUrl: './event-settings-edit-job.component.html',
    styleUrls: ['./event-settings-edit-job.component.scss']
})
export class EventSettingsEditJobComponent {

  public Editor = ClassicEditor;
  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;
  public job!: Job; 
  public jobId!: number;
  public partnerId!: number;
  public jobs!: Job[];

  constructor(public dialogRef: MatDialogRef<EventSettingsEditJobComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private jobsService: JobsService,
    ) { }

    ngOnInit() {
      this.jobId = this.data.id;
      this.partnerId = this.data.partnerId;
      this.getJob();
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

  public getJob() : void {
    this.jobsService.getJobById(this.jobId).subscribe( (result) => {
      this.job = result;
    })
  }

  public deleteJob(id: number): void {
    this.jobsService.deleteJob(id).subscribe(
      response => {
        // window.location.reload();
        this.isAlert = true;
        this.alertMsg = "Jobul a fost șters cu succes!";
        this.closeAlert();
        this.resetAlert(); // Move the resetAlert() call here
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Jobul nu a fost șters!"
        this.closeAlertRed();
      }
    );
    this.resetAlertRed()
  }

  updateJob(form: NgForm) {
    const { title, salary, minExperience, maxExperience, address, description, criteria, skills} = form.value;

    const requestBody: any = {};
    requestBody.id = this.job.id;
    if (title) requestBody.title = title;
    if (salary) requestBody.salary = salary;
    if (address) requestBody.address = address;
    if (minExperience) requestBody.minExperience = minExperience;
    if (maxExperience) requestBody.maxExperience = maxExperience;
    if (description) requestBody.description = description;
    if (criteria) requestBody.criteria = criteria;
    if (skills) requestBody.skills = skills;
    requestBody.partnerId = this.partnerId;
    
    this.jobsService.updateJob(requestBody)
      .subscribe(
        response => {
          this.isAlert = true;
          this.alertMsg = "Ai actualizat cu succes jobul!"
          this.closeAlert();
        },
        error => {
          this.isAlertRed = true;
          this.alertMsgRed = "Jobul nu a fost actualizat!"
          this.closeAlertRed();
        }
      );
      this.resetAlert()
      this.resetAlertRed()
  }
}