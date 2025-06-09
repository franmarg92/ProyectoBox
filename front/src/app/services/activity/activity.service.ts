import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { activity } from '../../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:3000/api/activity'; 

  constructor(private http: HttpClient) { }

  getAllActivities(): Observable<activity[]> {
    return this.http.get<activity[]>(`${this.apiUrl}`);
  }
}