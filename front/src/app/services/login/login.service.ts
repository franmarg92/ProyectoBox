import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Auth } from '../../models/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { loginResponse } from '../../models/loginRespone';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';

constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) {}

login(auth: Auth): Observable<loginResponse> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<loginResponse>(this.apiUrl, auth, { headers }).pipe(
  tap((response) => {
   
  if (response.success) {
  
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token); 
  }
}),
    catchError((error) => {
      console.error('Error al iniciar sesión:', error);
      return throwError(() => new Error('No se pudo iniciar sesión'));
    })
  );

  
}

logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

}



