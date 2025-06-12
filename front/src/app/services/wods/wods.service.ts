import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { wods } from '../../models/wods';
@Injectable({
  providedIn: 'root'
})
export class WodsService {

  private apiUrl = 'http://localhost:3000/api/wods'
  constructor(private http:HttpClient) { }


  getAllWods(): Observable<wods[]> {
  return this.http.get<wods[]>(`${this.apiUrl}`);
}


  createWod(wodData: wods): Observable<wods> {
    return this.http.post<wods>(`${this.apiUrl}/create`, wodData); 
  }

  updateWod(wod_id: number, wodData: Partial<wods>): Observable<wods> {
    return this.http.put<wods>(`${this.apiUrl}/${wod_id}`, wodData); 
  }
}
