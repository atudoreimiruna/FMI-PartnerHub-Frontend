import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../interfaces/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  public url = 'https://localhost:44330/api/partners';
  
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
