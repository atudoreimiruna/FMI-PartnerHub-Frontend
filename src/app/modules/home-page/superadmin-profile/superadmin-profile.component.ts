import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { UserRoles } from 'src/app/interfaces/userRoles';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { PartnersService } from 'src/app/services/partners.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'superadmin-profile',
    templateUrl: './superadmin-profile.component.html',
    styleUrls: ['./superadmin-profile.component.scss']
})
export class SuperAdminProfileComponent {
  
  constructor(
    public authService: AuthService,
    public studentService: StudentsService,
    public partnersService: PartnersService,
    public fileService: FilesService,
    private route: ActivatedRoute
  ) { 
    this.getUsersAndRoles();
    this.getAllPartners();
  }

  public partners!: Partner[];
  public userRoles!: UserRoles[];
  public searchText: string = '';

  // for pagination
  public displayCount: number = 12;
  private pageNumber: number = 1;
  public pageSize: number = 5;

  public email: string = '';
  public role: number = 2;
  public name: string = '';
  public partner: string = '';

  public isAlert = false;
  public isAlertRed = false;
  public alertMsg!: string;
  public alertMsgRed!: string;

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

  ngOnInit() {
    // this.email = this.route.snapshot.params['email'];
  }

  selectPagination(event: any) : void {
    // console.log(event);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsersAndRoles();
  }

  public getUsersAndRoles(): void {
    this.authService.getUsersAndRoles(this.searchText, this.pageNumber, this.pageSize).subscribe((result) => {
      this.userRoles = result;
    });
  }

  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }

  public addRoleToUser(form: NgForm): void {
    if (form.valid) {
      const { email, role } = form.value;
  
      const requestBody = {
        email: email,
        role: role
      };
   
    console.log(requestBody)
    this.authService.postRoleToUser(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes!"
        this.closeAlert();
      },
      error => {
        // Handle any errors that occurred during the request
      }
    );
    this.resetAlert()
    form.reset();
    }
  }

  public addAdminToPartner(form: NgForm): void {
    if (form.valid) {
      const { email, partner } = form.value;
  
      const requestBody = {
        email: email,
        partner: partner
      };
   
    console.log(requestBody)
    this.authService.addPartnerToAdmin(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes!"
        this.closeAlert();
      },
      error => {
        // Handle any errors that occurred during the request
      }
    );
    this.resetAlert()
    form.reset();
    }
  }

  public addPartner(form: NgForm): void {
    if (form.valid) {
      const { name } = form.value;
  
      const requestBody = {
        name: this.name
      };
   
    console.log(requestBody)
    this.partnersService.postPartner(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes partenerul!"
        this.closeAlert();
      },
      error => {
        // Handle any errors that occurred during the request
      }
    );
    this.resetAlert()
    form.reset();
    }
  }

  public removeRoleFromUser(form: NgForm): void {
    if (form.valid) {
      const { email, role } = form.value;
  
      const requestBody = {
        email: this.email,
        role: this.role
      };
   
    console.log(requestBody)
    this.authService.removeRoleFromUser(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai eliminat cu succes rolul user-ului!"
        this.closeAlert();
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Rolul user-ului nu a putut fi eliminat!"
        this.closeAlertRed();
      }
    );
    this.resetAlert()
    this.resetAlertRed()
    form.reset();
    }
  }
}