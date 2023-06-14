import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Partner } from '../interfaces/partner';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  public url = 'https://localhost:5001/api/partners';
  public changedUrlSbj : Subject<any> = new Subject<any>();
  public changedUrl = this.changedUrlSbj.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getPartners() : Observable<Partner[]> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(this.url, { headers });
      }
      return of([]);
  }

  public postPartner(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }


  public getPartnerById(id: any): Observable<Partner> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.url}/${id}`, { headers });
      }
      return of();
  }

  updatePartner(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }
}
