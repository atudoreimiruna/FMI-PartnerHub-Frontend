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

  public getJobsWithoutPagination() : Observable<Job[]> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<Job[]>(`${this.url}`, { headers });
    }
    return of([]);
}

public getJobsFilter(pageNumber?: any, pageSize?: any, partner?: string, address?: string, category?: string): Observable<Job[]> {
  let params = new HttpParams();

  if (partner) {
    params = params.append('PartnerName', partner);
  }
  if (address) {
    params = params.append('Address', address);
  }
  if (category) {
    params = params.append('Title', category);
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

  public getJobsByPartnerId(partnerId: any): Observable<Job[]> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${this.url}/${partnerId}`, { headers });
    }
    return of();
  }

  addJob(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }

  updateJob(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }

  deleteJob(id: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete(`${this.url}/${id}`, { headers })
      }
      return of([]);
  }
}