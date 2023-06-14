import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { FilesService } from 'src/app/services/files.service';
import { PartnersService } from 'src/app/services/partners.service';
import { StudentsService } from 'src/app/services/students.service';
import { Event } from 'src/app/interfaces/event';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventSettingsComponent } from '../event-settings/event-settings.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  
  public partners!: Partner[];
  public email!: string;
  public partnerId!: string[] | null;
  public events!: Event[] ; 
  public partner!: Partner;
  public partnerName!: string;
  public isAlert = false;
  public alertMsg!: string;
  public Editor = ClassicEditor;
  
  constructor(
    public authService: AuthService,
    public studentService: StudentsService,
    public fileService: FilesService,
    private route: ActivatedRoute,
    private partnersService: PartnersService,
    private eventsService: EventsService,
    private dialog: MatDialog
  ) { 
  }

  resetAlert() {
    this.isAlert = false; 
  }

  closeAlert() {
    setTimeout(() => {
      this.isAlert = false; 
    }, 5000); 
  }

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.partnerId = this.authService.getPartnerFromToken();
    this.getPartner();
    this.getEventsByPartner();
  }

  public getPartner() : void {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      this.partnerName = result.name;
    })
  }

  public getEventsByPartner() : void {
    console.log(this.partnerId)
    this.eventsService.getEventsByPartnerId(this.partnerId).subscribe( (result) => {
      this.events = result;
      console.log(result)
    })
  }

  updatePartner(form: NgForm) {
    const { name, address, phone, email, social, mainDescription, description} = form.value;

    const requestBody: any = {};
    requestBody.id = this.partner.id;
    if (name) requestBody.name = name;
    if (phone) requestBody.phone = phone;
    if (address) requestBody.address = address;
    if (email) requestBody.email = email;
    if (social) requestBody.social = social;
    if (mainDescription) requestBody.mainDescription = mainDescription;
    if (description) requestBody.description = description;

    this.partnersService.updatePartner(requestBody)
      .subscribe(
        response => {
          this.isAlert = true;
          this.alertMsg = "Ai actualizat cu succes informațiile tale!"
          this.closeAlert();
        },
        error => {
          // Handle any errors that occurred during the request
        }
      );
      this.resetAlert()
  }

  openEventEdit(eventId: number): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: eventId}
    dialogConfig.width = '600px';
    dialogConfig.height = '90vh';
    let dialogRef = this.dialog.open(EventSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      //in res am date trimise la inchidere popup
    })
  }

}