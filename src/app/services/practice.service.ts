import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../interfaces/job';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  public url = 'https://localhost:5001/api/practice';
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getPracticeById(id: any): Observable<Job> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${this.url}/by/${id}`, { headers });
    }
    return of();
  }

  public updatePractice(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
  
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      return this.http.put(`${this.url}`, requestBody, { headers });
    }
  
    return of(); // Return an empty observable if there is no token
  }
  

}