import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../interfaces/student';
import { AuthService } from './auth.service';
import { StudentJob } from '../interfaces/studentJob';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public url = 'https://localhost:5001/api/students';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getStudentByEmail(email: any): Observable<Student> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.url}/by/${email}`, { headers });
      }
      return of();
  }

  public getJobsForStudentByEmail(email: any): Observable<StudentJob[]> {
    console.log(email)
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.url}/jobs-for-student/${email}`, { headers });
      }
      return of([]);
  }

  updateStudent(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}`, requestBody, { headers });
      }
      return of([]);
  }

  updateJobOnStudent(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}/job`, requestBody, { headers });
      }
      return of([]);
  }

  updatePartnerOnStudent(requestBody: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put(`${this.url}/partner`, requestBody, { headers });
      }
      return of([]);
  }


  deleteStudentJob(studentId: any, jobId: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete(`${this.url}/${studentId}/${jobId}`, { headers })
      }
      return of([]);
  }

  deleteStudentPartner(studentId: any, partnerId: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete(`${this.url}/by/${studentId}/${partnerId}`, { headers })
      }
      return of([]);
  }
}
