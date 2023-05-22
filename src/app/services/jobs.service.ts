import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  public url = 'https://localhost:44330/api/jobs';
  private filteredJobsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public filteredJobs$: Observable<any[]> = this.filteredJobsSubject.asObservable();
  
  constructor(
    private http: HttpClient
  ) { }

  public getJobs() : Observable<Job[]> {
    return this.http.get<any>(this.url);
  }

  public getJobsFilter(partner?: string, address?: string): Observable<Job[]> {
    let params = new HttpParams();
  
    if (partner) {
      params = params.set('PartnerName', partner);
    }
    if (address) {
      params = params.set('Address', address);
    }
  
    return this.http.get<Job[]>('https://localhost:44330/api/jobs', { params });
  }

  loadJobsByPartner(partnerName: string): void {
    const filter = { PartnerName: partnerName };
    const queryParams = new URLSearchParams(filter).toString();

    this.http.get<Job[]>(`https://localhost:44330/api/jobs?${queryParams}`)
      .subscribe(
        (response: Job[]) => {
          // Update the filtered jobs data in the service
          this.filteredJobsSubject.next(response);
        },
        (error: any) => {
          console.error('Failed to load jobs:', error);
        }
      );
  }
}