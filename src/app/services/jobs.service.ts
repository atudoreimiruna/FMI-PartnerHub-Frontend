import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  public url = 'https://localhost:44330/api/jobs';
  
  constructor(
    private http: HttpClient
  ) { }

  public getJobs() : Observable<Job[]> {
    return this.http.get<any>(this.url);
  }

  public getJobsFilter(partner?: string, address?: string, pageNumber = 1, pageSize = 10): Observable<Job[]> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());
  
    if (partner) {
      params = params.set('PartnerName', partner);
    }
    if (address) {
      params = params.set('Address', address);
    }
  
    return this.http.get<Job[]>('https://localhost:44330/api/jobs', { params });
  }

}