import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public login(): void {
    this.authService.login().subscribe(() => {
      }
    );
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}