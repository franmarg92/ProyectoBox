import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hours } from '../../models/hours';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private apiUrl = 'http://localhost:3000/api/hours'; 

  constructor(private http: HttpClient) { }

  getAllHours(): Observable<hours[]> {
    return this.http.get<hours[]>(`${this.apiUrl}`);
  }
}