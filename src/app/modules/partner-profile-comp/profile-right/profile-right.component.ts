import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
    selector: 'profile-right',
    templateUrl: './profile-right.component.html',
    styleUrls: ['./profile-right.component.scss']
})
export class ProfileRightComponent implements OnDestroy, OnInit {

  public partnerId!: string;
  public partners!: Partner[];
  public partner!: Partner;
  public message: any;
  
  constructor(
    private partnersService: PartnersService,
    private route: ActivatedRoute
  ) { }

    ngOnInit() {
      this.partnerId = this.route.snapshot.paramMap.get('id')!;
      this.getPartner();
    }

  public getPartner() : void {
    this.partnersService.getPartnerById(this.partnerId).subscribe( (result) => {
      this.partner = result;
      console.log(this.partner);
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}