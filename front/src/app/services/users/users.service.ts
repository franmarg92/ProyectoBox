import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { loggedUser } from '../../models/loggedUser';
import { tap } from 'rxjs';
import { BehaviorSubject,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/user';
  private users: loggedUser[] = [];
  private usersLoaded = false;
  private usersSubject = new BehaviorSubject<loggedUser[]>([]);

  constructor(private http: HttpClient) { }



  getAllUsers(): Observable<loggedUser[]> {
      return this.http.get<loggedUser[]>(`${this.apiUrl}`);
    }

    
    
 updateUserRole(userId: number, newRole: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.patch(`${this.apiUrl}/update-role`, { user_id: userId, role: newRole }, { headers });
}


loadAllUsers(): Observable<loggedUser[]> {
    if (this.usersLoaded) {
      return of(this.users); // ya está en caché
    } else {
      return this.http.get<loggedUser[]>(this.apiUrl).pipe(
        tap(users => {
          this.users = users;
          this.usersLoaded = true;
          this.usersSubject.next(users); // actualiza observable
        })
      );
    }
  }

  // Para usar en componentes: versión reactiva
  getUsersObservable(): Observable<loggedUser[]> {
    return this.usersSubject.asObservable();
  }

  // Para acceso puntual
  getUserById(id: number): loggedUser | undefined {
    return this.users.find(u => u.user_id === id);
  }
}


