import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventsService } from 'src/app/services/events.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from 'src/app/interfaces/job';

@Component({
    selector: 'event-settings-add-job',
    templateUrl: './event-settings-add-job.component.html',
    styleUrls: ['./event-settings-add-job.component.scss']
})
export class EventSettingsAddJobComponent {

  public Editor = ClassicEditor;
  public isAlert = false;
  public alertMsg!: string;
  public partnerId!: number;
  public title: string = '';
  public description: string = '';
  public criteria: string = '';
  public skills: string = '';
  public address: string = '';
  public location: string = '';
  public minExperience: number = 0;
  public maxExperience: number = 0;
  public time: string = '';
  public type: string = '';
  public date: string = '';
  public jobs!: Job[];

  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD-MM-YYYY',
  };

  constructor(public dialogRef: MatDialogRef<EventSettingsAddJobComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private jobsService: JobsService,
    ) { }

    ngOnInit() {
      this.partnerId = this.data.id;
      this.jobs = this.data.jobs;
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

  addJob(form: NgForm) {
    const { title, salary, address, minExperience, description, maxExperience, criteria, skills } = form.value;

    const requestBody: any = {};
    if (title) requestBody.title = title;
    if (description) requestBody.description = description;
    if (salary) requestBody.salary = salary;
    if (address) requestBody.address = address;
    if (minExperience) requestBody.minExperience = minExperience;
    if (maxExperience) requestBody.maxExperience = maxExperience;
    if (criteria) requestBody.criteria = criteria;
    if (skills) requestBody.skills = skills;
    requestBody.partnerId = this.partnerId;
    
    this.jobsService.addJob(requestBody)
      .subscribe(
        response => {
          this.jobs.push(response);
          this.isAlert = true;
          this.alertMsg = "Ai adăugat cu succes jobul!"
          this.closeAlert();
          form.reset();
        },
        error => {
          // Handle any errors that occurred during the request
        }
      );
      this.resetAlert()
  }
}