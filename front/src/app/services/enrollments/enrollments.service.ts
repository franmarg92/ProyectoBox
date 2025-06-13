import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enrollUser } from '../../models/enrollUser';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private apiUrl = 'http://localhost:3000/api/enrollments';

  constructor(private http: HttpClient) {}

  enroll(enrollmentData: enrollUser): Observable<enrollUser> {
    return this.http.post<enrollUser>(`${this.apiUrl}/enroll`, enrollmentData);
  }

  getEnrollmentsByDate(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-date`, {
      params: { date },
    });
  }


  registerAtendance(ids: number[]): Observable<any> {
  return this.http.patch(`${this.apiUrl}/attend`, { enrollmentIds: ids });
}
}
