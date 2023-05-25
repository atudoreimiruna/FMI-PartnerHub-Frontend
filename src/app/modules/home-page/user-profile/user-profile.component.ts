import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }

  public email!: string;

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
  }

  logout() {
    this.authService.logout();
  }
}