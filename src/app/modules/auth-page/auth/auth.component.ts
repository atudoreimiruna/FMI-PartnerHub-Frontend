import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class LoginComponent {

  // public tokens : Token = {
  //   success: false,
  //   accessToken: this.authService.getMicrosoftAccessToken(),
  //   refreshToken: this.authService.getRefreshToken()
  // };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Login method called');
    this.authService.login().subscribe(() => {
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // sendTokensToBackend(): void {
  //   const tokens: Token = {
  //     accessToken: this.authService.getAccessToken(),
  //     refreshToken: this.authService.getRefreshToken()
  //   };

  //   this.authService.sendTokens(this.authService.getAccessToken(), this.authService.getRefreshToken()).subscribe(
  //     () => {
  //       console.log('Tokens sent successfully');
  //     },
  //     (error) => {
  //       console.error('Failed to send tokens:', error);
  //     }
  //   );
  // }
}