import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from '../../models/sessions';
import { UpdateSession } from '../../models/updateSession';
import { CreateSession } from '../../models/createSession';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private apiUrl = 'http://localhost:3000/api/class';

  constructor(private http: HttpClient) {}

  createSession(sessionData :CreateSession): Observable<Session>{
    return this.http.post<Session>(`${this.apiUrl}/create`, sessionData)
  }

  getSessionById(
    clase: number,
    dia: number,
    hora: number
  ): Observable<{ class_id: number }> {
    return this.http.get<{ class_id: number }>(
      `${this.apiUrl}/session-id?clase=${clase}&dia=${dia}&hora=${hora}`
    );
  }

  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}`);
  }

  updateSession (class_id: number, sessionData : UpdateSession): Observable<Session>{
    return this.http.put<Session>(`${this.apiUrl}/updateSession/${class_id}`, sessionData)
  }
}
