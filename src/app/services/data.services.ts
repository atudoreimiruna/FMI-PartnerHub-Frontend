import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  public currentMessage = this.messageSource.asObservable();

  private userSource = new BehaviorSubject({
    username:'',
    password:'',
  });

  public currentUser = this.userSource.asObservable();
  constructor(private http: HttpClient, private oauthService: OAuthService) {}

  getData() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
    });
    return this.http.get('https://localhost:5001/api/', { headers });
  }
  
  public changeUserData(user: any): void{
    this.userSource.next(user);
  }

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }
}

