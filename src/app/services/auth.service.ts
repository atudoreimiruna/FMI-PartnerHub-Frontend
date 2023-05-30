import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, OAuthEvent } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'https://localhost:5001/api/auth';
  accessToken: any;

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureOAuth();
  }

  private saveAccessTokenAndRoles(token: string) {
    // Save the access token to browser storage
    localStorage.setItem('accessToken', token);
    this.getRolesFromToken();
  }

  public getAccessToken(): string | null {
    // Retrieve the access token from browser storage
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null ? accessToken : null;
  }

  private async callExternalSignIn() {
    const accessToken = this.oauthService.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    try {
      const response = await this.http.post<Token>(`${this.url}/Login`, null, { headers }).toPromise();
      if (response) {
        this.accessToken = response.accessToken;
        this.saveAccessTokenAndRoles(this.accessToken);
        // Continue with the necessary actions
      } else {
        // Handle the failed login
      }
    } catch (error) {
      // Handle the error
    }
  }
  
  private configureOAuth() {
    const authConfig: AuthConfig = {
      issuer: 'https://login.microsoftonline.com/20ed8f4e-52f7-4d77-bfc1-862ced77c351/v2.0',
      redirectUri: window.location.origin,
      clientId: 'f969fab1-6d79-42a0-96c0-32eb06cb8d0b',
      responseType: 'code',
      scope: 'api://f969fab1-6d79-42a0-96c0-32eb06cb8d0b/Users.All',
      showDebugInformation: false,
      strictDiscoveryDocumentValidation: false
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        // console.log('Access Token:', accessToken);
        this.callExternalSignIn(); 
      }
    });
  }

  login(): Observable<boolean> {
    console.log('Login method calleddddddddddddddddddddddddd');
    return new Observable<boolean>(observer => {
      this.oauthService.initImplicitFlow();
      
      const tokenSubscription = this.oauthService.events.subscribe(e => {
        console.log('Token event:', e);
        if (e.type === 'token_received') {
          const tokens: Token = {
            success: true,
            accessToken: this.getMicrosoftAccessToken(),
            refreshToken: this.getRefreshToken()
          };
        }
      });
  
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

  getMicrosoftAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  getRefreshToken(): string {
    return this.oauthService.getRefreshToken();
  }

  getEmailFromToken(): string | null {
    const token = this.getAccessToken();
    if (token !== null) {
      const decodedToken: any = jwt_decode(token);
      const email = decodedToken.email;
      return email;
    }
    return null;
  }

  getRolesFromToken(): string[] | null {
    const token = this.getAccessToken();
    if (token !== null) {
      const decodedToken: any = jwt_decode(token);
      const roles = decodedToken.role || [];
      localStorage.setItem('roles', roles);
      return roles;
    }
    return null;
  }
}