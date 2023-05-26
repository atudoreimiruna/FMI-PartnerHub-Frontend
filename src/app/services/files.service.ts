import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  public url = 'https://localhost:5001/api/image';
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(entity: number, id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.url}/${entity}/${id}`, formData);
  }
}
