import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public url = 'https://localhost:5001/api/events';
  public changedUrlSbj : Subject<any> = new Subject<any>();
  public changedUrl = this.changedUrlSbj.asObservable();
  
  constructor(
    private http: HttpClient
  ) { }

  public getEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}?OrderByDescending=LastUpdated`);
  }

  public getEventsByPartnerId(partnerId: any) : Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}?PartnerId=${partnerId}OrderByDescending=LastUpdated`);
  }
}

