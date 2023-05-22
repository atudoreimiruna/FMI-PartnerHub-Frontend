import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, OAuthEvent } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureOAuth();
  }

  private configureOAuth() {
    const authConfig: AuthConfig = {
      issuer: 'https://login.microsoftonline.com/20ed8f4e-52f7-4d77-bfc1-862ced77c351/v2.0',
      redirectUri: window.location.origin,
      clientId: 'f969fab1-6d79-42a0-96c0-32eb06cb8d0b',
      responseType: 'code',
      scope: 'openid email profile',
      showDebugInformation: false,
      strictDiscoveryDocumentValidation: false
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        const accessToken = this.oauthService.getAccessToken();
        // console.log('Access Token:', accessToken);
      }
    });
  }

  login(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.oauthService.initImplicitFlow()
      
      // Subscribe to the token events to check for successful login
      const tokenSubscription = this.oauthService.events.subscribe(e => {
        if (e.type === 'token_received') {
          observer.next(true); // Emit true when token is received
          observer.complete(); // Complete the observable
        }
      });

      // Cleanup: Unsubscribe from token events when the observable is unsubscribed
      return () => {
        tokenSubscription.unsubscribe();
      };
    });
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  getRefreshToken(): string {
    return this.oauthService.getRefreshToken();
  }

  sendTokens(tokens: Token): Observable<any> {
    return this.http.post('/api/auth/tokens', tokens);
  }
}