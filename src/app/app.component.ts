import { Component, OnInit } from '@angular/core';
import { Partner } from './interfaces/partner';
import { PartnersService } from './services/partners.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Licenta';
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
