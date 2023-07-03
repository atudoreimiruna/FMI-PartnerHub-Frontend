import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, OAuthEvent } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { Token } from '../interfaces/token';
import jwt_decode from 'jwt-decode';
import { UserRoles } from '../interfaces/userRoles';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'https://localhost:5001/api/auth';
  accessToken: any;

  constructor(private oauthService: OAuthService, private http: HttpClient, private router: Router) {
    this.configureOAuth();
  }

  public getUsersAndRoles(userName: string, pageNumber?: number, pageSize?: number) : Observable<UserRoles[]> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        if(userName != null)
        {
          return this.http.get<any>(`${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}&UserName=${userName}`, { headers });
        }
        else
        {
          return this.http.get<any>(`${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}`, { headers });
        }
      }
      return of([]);
  }

  public getUsersAndRolesWithoutPag() : Observable<UserRoles[]> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.url}`, { headers });
      }
      return of([]);
  }

  public postRoleToUser(requestBody: any): Observable<any> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}/Role`, requestBody, { headers });
      }
      return of([]);
  }

  public addPartnerToAdmin(requestBody: any): Observable<any> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}/Partner`, requestBody, { headers });
      }
      return of([]);
  }

  public removeRoleFromUser(requestBody: any): Observable<any> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        const options = {
          body: requestBody,
          headers: headers
        };

        return this.http.delete(`${this.url}/Role`, options);
      }
      return of([]);
  }

  private saveAccessTokenAndRoles(token: string) {
    // Save the access token to browser storage
    localStorage.setItem('accessToken', token);
    // console.log(token)
    this.getRolesFromToken();
    this.getPartnerFromToken();
    this.router.navigate(["/home"])
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
        this.callExternalSignIn(); 
      }
    });
  }

  public login(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.oauthService.initImplicitFlow();
      const tokenSubscription = this.oauthService.events.subscribe(e => {
        if (e.type === 'token_received') {
          const tokens: Token = {
            success: true,
            accessToken: this.getMicrosoftAccessToken(),
            refreshToken: this.getRefreshToken()
          };
          // window.location.href = 'http://localhost:4200/home';
        }
      });
  
      return () => {
        tokenSubscription.unsubscribe();
      };
    });
  }
  
  logout() {
    this.oauthService.logOut();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('partnerId');
  }

  isLoggedIn(): any {
    return this.oauthService.hasValidAccessToken() && localStorage.getItem('accessToken');
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

  getPartnerFromToken(): string[] | null {
    const token = this.getAccessToken();
    if (token !== null) {
      const decodedToken: any = jwt_decode(token);
      const partner = decodedToken.partnerId || [];
      localStorage.setItem('partnerId', partner);
      return partner;
    }
    return null;
  }

  public runModel(): Observable<any> {
    const token = this.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}/model_training`, { headers });
      }
      return of([]);
  }
}