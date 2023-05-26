import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../interfaces/partner';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public url = 'https://localhost:5001/api/students';
  constructor(
    private http: HttpClient
  ) { }

  public getStudentByEmail(email: any): Observable<Student> {
    return this.http.get<any>(`${this.url}/by/${email}`);
  }

  updateStudent(requestBody: any): Observable<any> {
    return this.http.put(`${this.url}`, requestBody);
  }

  updateJobOnStudent(requestBody: any): Observable<any> {
    return this.http.put(`${this.url}/job`, requestBody);
  }
}
