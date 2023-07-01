import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventsService } from 'src/app/services/events.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'event-settings-add',
    templateUrl: './event-settings-add.component.html',
    styleUrls: ['./event-settings-add.component.scss']
})
export class EventSettingsAddComponent {

  public Editor = ClassicEditor;
  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;
  public partnerId!: number;
  public title: string = '';
  public description: string = '';
  public location: string = '';
  public time: string = '';
  public type: string = '';
  public date: string = '';
  public events!: Event[];

  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-default',
    dateInputFormat: 'DD-MM-YYYY',
  };

  constructor(public dialogRef: MatDialogRef<EventSettingsAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private eventsService: EventsService,
    ) { }

    ngOnInit() {
      this.partnerId = this.data.id;
      this.events = this.data.events;
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
  addEvent(form: NgForm) {
    const { title, type, location, date, time, description, partnerId } = form.value;

    const requestBody: any = {};
    if (title) requestBody.title = title;
    if (description) requestBody.description = description;
    if (type) requestBody.type = type;
    if (location) requestBody.location = location;
    if (date) requestBody.date = date;
    if (time) requestBody.time = time;

    requestBody.partnerId = this.partnerId;

    this.eventsService.addEvent(requestBody)
      .subscribe(
        response => {
          this.events.push(response);
          this.isAlert = true;
          this.alertMsg = "Ai adăugat cu succes evenimentul!"
          this.closeAlert();
          form.reset();
        },
        error => {
          this.isAlertRed = true;
          this.alertMsgRed = "Evenimentul nu a fost adăugat!"
          this.closeAlertRed();
        }
      );
      this.resetAlert()
      this.resetAlertRed()
  }
}