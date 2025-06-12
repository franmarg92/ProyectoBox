import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Auth } from '../../models/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { loginResponse } from '../../models/loginRespone';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';
  private jwtHelper = new JwtHelperService();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    this.userSubject.next(JSON.parse(storedUser)); 
  }
  }

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private authStatus = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  authStatus$ = this.authStatus.asObservable();

  login(auth: Auth): Observable<loginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<loginResponse>(this.apiUrl, auth, { headers }).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.user.role);
       
          this.userSubject.next(response.user);
        }
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        return throwError(() => new Error('No se pudo iniciar sesión'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token).role : null;
  }
}
