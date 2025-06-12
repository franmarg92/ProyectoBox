import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { loggedUser } from '../../models/loggedUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient) { }



  getAllUsers(): Observable<loggedUser[]> {
      return this.http.get<loggedUser[]>(`${this.apiUrl}`);
    }

    
    
 updateUserRole(userId: number, newRole: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/update-role`, { user_id: userId, role: newRole }, { headers });
}

}
