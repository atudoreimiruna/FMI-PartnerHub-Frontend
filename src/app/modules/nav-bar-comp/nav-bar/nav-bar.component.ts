import { Component } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { PartnersService } from 'src/app/services/partners.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  partners: Partner[] = []

  constructor(
    private partnersService: PartnersService,
    private authService: AuthService,
    private router: Router
  ) { this.getAllPartners(); }

  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }

  getEmailFromToken(): string {
    return this.authService.getEmailFromToken(); // Replace with your actual implementation
  }
}
