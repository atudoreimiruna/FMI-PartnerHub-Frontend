import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Partner } from '../interfaces/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  public url = 'https://localhost:5001/api/partners';
  public changedUrlSbj : Subject<any> = new Subject<any>();
  public changedUrl = this.changedUrlSbj.asObservable();
  
  constructor(
    private http: HttpClient
  ) { }

  public getPartners() : Observable<Partner[]> {
    return this.http.get<any>(this.url);
  }

  public getPartnerById(id: any): Observable<Partner> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
