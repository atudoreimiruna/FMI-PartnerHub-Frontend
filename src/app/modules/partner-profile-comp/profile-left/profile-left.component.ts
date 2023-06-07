import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { Partner } from 'src/app/interfaces/partner';
import { JobsService } from 'src/app/services/jobs.service';
import { PartnersService } from 'src/app/services/partners.service';

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
  public jobs!: Job[];
  
  // info for map
  public latitude!: number;
  public longitude!: number;

  constructor(
    private partnersService: PartnersService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
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

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}