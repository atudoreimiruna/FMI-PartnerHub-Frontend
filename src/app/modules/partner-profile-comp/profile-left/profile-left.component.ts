import { MapsAPILoader } from '@agm/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { Student } from 'src/app/interfaces/student';
import { AuthService } from 'src/app/services/auth.service';
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
    private mapsAPILoader: MapsAPILoader
  ) { }

    ngOnInit() {
      this.partnerId = this.route.snapshot.paramMap.get('id')!;
      this.getPartner().then(() => {
        console.log(this.partner); // Check the retrieved partner data
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

  public async getPartner(): Promise<void>  {
    return new Promise<void>((resolve) => {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      resolve()
      // console.log(this.partner);
    });
  });
  }

  public getJobsByFilter(partner?: string) {
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
    console.log(address)
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
        console.log(this.student);

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
          this.isAlert = true;
          this.alertMsg = "Partenerul se află deja în lista de favorite!"
          this.closeAlert();
        }
    );
    });
    this.resetAlert()
}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}