import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaidsService {
  private apiUrl = 'http://localhost:3000/api/payment';

  constructor(private http: HttpClient) {}

  createPayment(paymentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/register`, paymentData, { headers });
  }

  getStatus(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${user_id}`);
  }


  getAllPaids(): Observable<any> {
  return this.http.get(`${this.apiUrl}`);
}
}
