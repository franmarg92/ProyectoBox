import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { days } from '../../models/days';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  private apiUrl = 'http://localhost:3000/api/days'; 

  constructor(private http: HttpClient) { }

  getAllDays(): Observable<days[]> {
    return this.http.get<days[]>(`${this.apiUrl}`);
  }
}