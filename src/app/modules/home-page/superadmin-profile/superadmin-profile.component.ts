import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Partner } from 'src/app/interfaces/partner';
import { Practice } from 'src/app/interfaces/practice';
import { UserRoles } from 'src/app/interfaces/userRoles';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { PartnersService } from 'src/app/services/partners.service';
import { PracticeService } from 'src/app/services/practice.service';
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
    private route: ActivatedRoute,
    private practiceService: PracticeService,
  ) { 
    this.getUsersAndRoles();
    this.getAllPartners();
    this.getPractice();
    this.getUsersAndRolesWithoutPag();
    // this.displayCount = this.userRoles.length;
  }

  public partners!: Partner[];
  public userRoles!: UserRoles[];
  public userRolesPag!: UserRoles[];
  public searchText: string = '';
  public practiceId: number = 1;
  public practice!: Practice;

  // for pagination
  public displayCount: number = 0;
  private pageNumber: number = 1;
  public pageSize: number = 5;

  public email: string = '';
  public role: number = 2;
  public name: string = '';
  public partner: string = '';
  public partnerToDelete: string = '';

  public isAlert = false;
  public isAlertRed = false;
  public alertMsg!: string;
  public alertMsgRed!: string;

  public Editor = ClassicEditor;

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
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsersAndRoles();
  }

  public getUsersAndRoles(): void {
    this.authService.getUsersAndRoles(this.searchText, this.pageNumber, this.pageSize).subscribe((result) => {
      this.userRoles = result;
    });
  }

  public getUsersAndRolesWithoutPag(): void {
    this.authService.getUsersAndRolesWithoutPag().subscribe((result) => {
      this.userRolesPag = result;
      this.displayCount = result.length;
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
   
    this.authService.postRoleToUser(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes!"
        this.closeAlert();
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Rolul nu a putut fi adăugat!"
        this.closeAlertRed();
      }
    );
    this.resetAlert()
    this.resetAlertRed()
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
   
    this.authService.addPartnerToAdmin(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes!"
        this.closeAlert();
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Adminul nu a putut fi adăugat!"
        this.closeAlertRed();
      }
    );
    this.resetAlert()
    this.resetAlertRed()
    form.reset();
    }
  }

  public addPartner(form: NgForm): void {
    if (form.valid) {
      const { name } = form.value;
  
      const requestBody = {
        name: this.name
      };
   
    this.partnersService.postPartner(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai adăugat cu succes partenerul!"
        this.closeAlert();
        this.partners.push(response)
      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Partenerul nu a putut fi adăugat!"
        this.closeAlertRed();
      }
    );
    this.resetAlert()
    this.resetAlertRed()
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

  public removePartner(form: NgForm): void {
    if (form.valid) {
      const { partnerToDelete } = form.value;
  
      const requestBody = {
        name: this.partnerToDelete
      };
   
    this.partnersService.deletePartner(requestBody).subscribe(
      response => {
        this.isAlert = true;
        this.alertMsg = "Ai eliminat cu succes partenerul!"
        this.closeAlert();
        window.location.reload();

      },
      error => {
        this.isAlertRed = true;
        this.alertMsgRed = "Partenerul nu poate fi eliminat!"
        this.closeAlertRed();
        window.location.reload();
      }
    );
    this.resetAlert()
    this.resetAlertRed()
    }
  }

  public updatePractice(form: NgForm) {
    const { description } = form.value;
  
    const requestBody: any = {};
    requestBody.id = this.practice.id; // Assuming this.practice contains the practice object with an 'id' property
    if (description) requestBody.description = description;
  
    this.practiceService.updatePractice(requestBody)
      .subscribe(
        response => {
          this.isAlert = true;
          this.alertMsg = "Ai actualizat cu succes informațiile!";
          this.closeAlert();
        },
        error => {
          this.isAlertRed = true;
          this.alertMsgRed = "Informațiile nu au putut fi actualizate!"
          this.closeAlertRed();
        }
      );
    this.resetAlertRed()
    this.resetAlert();
  }

  public getPractice() : void {
    this.practiceService.getPracticeById(this.practiceId).subscribe( (result) => {
        this.practice = result;
        })
    }
}