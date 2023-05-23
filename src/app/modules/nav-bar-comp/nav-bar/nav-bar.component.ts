import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  partners: Partner[] = []

  constructor(
    private partnersService: PartnersService
  ) { this.getAllPartners(); }

  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }
}
