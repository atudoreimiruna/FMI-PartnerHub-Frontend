import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
