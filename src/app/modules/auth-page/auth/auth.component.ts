import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/token';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/home']);

        const tokens: Token = {
          accessToken: this.authService.getAccessToken(),
          refreshToken: this.authService.getRefreshToken()
        };

        this.authService.sendTokens(tokens).subscribe(
          () => {
            console.log('Tokens sent successfully');
          },
          (error) => {
            console.error('Failed to send tokens:', error);
          }
        );
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  sendTokensToBackend(): void {
    const tokens: Token = {
      accessToken: this.authService.getAccessToken(),
      refreshToken: this.authService.getRefreshToken()
    };

    this.authService.sendTokens(tokens).subscribe(
      () => {
        console.log('Tokens sent successfully');
      },
      (error) => {
        console.error('Failed to send tokens:', error);
      }
    );
  }
}