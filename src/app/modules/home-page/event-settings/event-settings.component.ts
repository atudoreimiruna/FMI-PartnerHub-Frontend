import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/interfaces/event';

@Component({
    selector: 'event-settings',
    templateUrl: './event-settings.component.html',
    styleUrls: ['./event-settings.component.scss']
})
export class EventSettingsComponent {

  public Editor = ClassicEditor;
  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;
  public event!: Event; 
  public eventId!: number;
  public partnerId!: number;
  public events!: Event[];

  constructor(public dialogRef: MatDialogRef<EventSettingsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private eventsService: EventsService,
    ) { }

    ngOnInit() {
      this.eventId = this.data.id;
      this.partnerId = this.data.partnerId;
      this.getEvent();
    }

  closeDialog() {
      this.dialogRef.close();
  }

  resetAlert() {
    this.isAlert = false; 
  }

  resetAlertRed() {
    this.isAlertRed = false; 
  }

  closeAlert() {
    setTimeout(() => {
      this.isAlert = false; 
    }, 5000); 
  }

  closeAlertRed() {
    setTimeout(() => {
      this.isAlertRed = false; 
    }, 5000); 
  }

  public getEvent() : void {
    this.eventsService.getEventById(this.eventId).subscribe( (result) => {
      this.event = result;
    })
  }

  public deleteEvent(id: number): void {
    this.eventsService.deleteEvent(id).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Evenimentul a fost șters cu succes!";
        this.closeAlert();
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Evenimentul nu a fost șters!"
        this.closeAlertRed();
      }
    );
    this.resetAlert(); 
    this.resetAlertRed()
  }

  updateEvent(form: NgForm) {
    const { title, type, location, date, time, description} = form.value;

    const requestBody: any = {};
    requestBody.id = this.event.id;
    if (title) requestBody.title = title;
    if (type) requestBody.type = type;
    if (location) requestBody.location = location;
    if (date) requestBody.date = date;
    if (time) requestBody.time = time;
    if (description) requestBody.description = description;
    requestBody.partnerId = this.event.partner.id;
    
    this.eventsService.updateEvent(requestBody)
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
}