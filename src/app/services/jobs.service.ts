import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Job } from '../interfaces/job';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  public url = 'https://localhost:5001/api/jobs';
  private filteredJobsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public filteredJobs$: Observable<any[]> = this.filteredJobsSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getJobs(pageNumber?: any, pageSize?: any) : Observable<Job[]> {
      const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<Job[]>(`${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}&OrderByDescending=LastUpdated`, { headers });
      }
      return of([]);
  }

  public getJobsFilter(pageNumber?: any, pageSize?: any, partner?: string, address?: string, category?: string): Observable<Job[]> {
    let params = new HttpParams();

    if (partner) {
      params = params.set('PartnerName', partner);
    }
    if (address) {
      params = params.set('Address', address);
    }
    if (category) {
      params = params.set('Title', category);
    }

    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<Job[]>(`${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}&OrderByDescending=LastUpdated`, { params, headers });
    }
    return of([]);
  }

  loadJobsByPartner(partnerName: string): void {
    const filter = { PartnerName: partnerName };
    const queryParams = new URLSearchParams(filter).toString();

    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<Job[]>(`https://localhost:5001/api/jobs?${queryParams}`, { headers })
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

  public getJobById(id: any): Observable<Job> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${this.url}/by/${id}`, { headers });
    }
    return of();
  }
}