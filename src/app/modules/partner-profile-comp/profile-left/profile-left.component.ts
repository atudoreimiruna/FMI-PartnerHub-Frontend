import { MapsAPILoader } from '@agm/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { Student } from 'src/app/interfaces/student';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.services';
import { JobsService } from 'src/app/services/jobs.service';
import { PartnersService } from 'src/app/services/partners.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'profile-left',
    templateUrl: './profile-left.component.html',
    styleUrls: ['./profile-left.component.scss']
})
export class ProfileLeftComponent implements OnDestroy, OnInit {

  public partnerId!: string;
  public partners!: Partner[];
  public partner!: Partner;
  public message: any;
  public email!: string | null;
  public student!: Student;
  public jobs!: Job[];
  public isAlert = false;
  public alertMsg!: string;
  public isAlertRed = false;
  public alertMsgRed!: string;

  // info for map
  public latitude!: number;
  public longitude!: number;

  constructor(
    private partnersService: PartnersService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public studentService: StudentsService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private dataService: DataService
  ) { }

    ngOnInit() {
      this.partnerId = this.route.snapshot.paramMap.get('id')!;
      this.getPartner().then(() => {
        this.findCoordinates(this.partner.address);
      });
    }

    isUserAuthorized()
    {
      const roles = localStorage.getItem("roles")
      return roles?.includes("User")
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

  public async getPartner(): Promise<void>  {
    return new Promise<void>((resolve) => {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      resolve()
    });
  });
  }

  public getJobsByFilter(partner?: string) {
    // this.dataService.updateSelectedPartner(partner)
    this.jobsService.getJobsFilter(0, 0, partner).subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  loadJobsByPartner(partnerName: string): void {
    this.jobsService.loadJobsByPartner(partnerName);

    // Redirect to the jobs page
    this.router.navigateByUrl('/joburi');
  }

  findCoordinates(address: string) {
    this.mapsAPILoader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
        } else {
          console.error('Geocoding error:', status);
        }
      });
    });
  }

  public updatePartnerOnStudent() : void {
    this.email = this.authService.getEmailFromToken();
    this.studentService.getStudentByEmail(this.email).subscribe( (result) => {
        this.student = result;

    const requestBody: any = {};
    requestBody.id = this.student.id;
    requestBody.partnerId = this.partnerId;

    this.studentService.updatePartnerOnStudent(requestBody)
        .subscribe(
        (response: any) => {
          this.isAlert = true;
          this.alertMsg = "Partenerul a fost salvat cu succes!"
          this.closeAlert();
        },
        (error: any) => {
          this.isAlertRed = true;
          this.alertMsgRed = "Partenerul se află deja în lista de favorite!"
          this.closeAlertRed();
        }
    );
    });
    this.resetAlert()
    this.resetAlertRed()
}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}