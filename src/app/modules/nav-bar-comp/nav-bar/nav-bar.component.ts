import { Component } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { PartnersService } from 'src/app/services/partners.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

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
    private eventsService: EventsService,
    private router: Router
  ) { this.getAllPartners(); }

  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }

  isSuperAdminAuthorized()
  {
    const roles = localStorage.getItem("roles")
    return roles === "SuperAdmin";
  }

  isUserAuthorized()
  {
    const roles = localStorage.getItem("roles")
    return roles?.includes("User")
  }

  isAdminAuthorized()
  {
    const roles = localStorage.getItem("roles")
    return roles === "Admin";
  }

  getEmailFromToken(): string | null {
    return this.authService.getEmailFromToken(); 
  }

  goToPartners()
  {
    this.partnersService.changedUrlSbj.next(true);
  }

  goToEvents()
  {
    this.eventsService.changedUrlSbj.next(true);
  }
  // goToUserProfile(): void {
  //   console.log(['/home/user'],{queryParams: { email : this.getEmailFromToken() } })
  //   this.router.navigate(['/home/user'],{queryParams: { email : this.getEmailFromToken() } });
  // }
}
