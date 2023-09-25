import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  public url = 'https://localhost:5001/api/image';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  uploadFile(entity: number, id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post(`${this.url}/${entity}/${id}`, formData, { headers });
      }
      return of([]);
  }

  public deleteFile(fileName: any): Observable<any> {
    const token = this.authService.getAccessToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete<any>(`${this.url}/${fileName}`, { headers });
      }
      return of([]);
   }

   public downloadFile(fileName: string): Observable<Resume> {
    const token = this.authService.getAccessToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<Resume>(`${this.url}/${fileName}`, { headers });
    }
    return of();
  }
}
