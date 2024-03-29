import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Event } from '../interfaces/event';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public url = 'https://localhost:5001/api/events';
  public changedUrlSbj : Subject<any> = new Subject<any>();
  public changedUrl = this.changedUrlSbj.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getEvents() : Observable<Event[]> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Event[]>(`${this.url}?OrderByDescending=Date`, { headers });
      }
      return of([]);
  }

  public getEventsByPartnerId(partnerId: any) : Observable<Event[]> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Event[]>(`${this.url}?PartnerId=${partnerId}&OrderByDescending=LastUpdated`, { headers });
      }
      return of([]);
  }

  public getEventsByPartnerName(partnerName: any) : Observable<Event[]> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Event[]>(`${this.url}?PartnerName=${partnerName}&OrderByDescending=LastUpdated`, { headers });
      }
      return of([]);
  }

  updateEvent(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }

  deleteEvent(id: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete(`${this.url}/${id}`, { headers })
      }
      return of([]);
  }

  addEvent(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }

  public getEventById(id: any): Observable<Event> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.url}/${id}`, { headers });
      }
      return of();
  }
}

