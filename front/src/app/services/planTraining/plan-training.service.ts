import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { planTraining } from '../../models/planTraining';

@Injectable({
  providedIn: 'root'
})
export class PlanTrainingService {

  private apiUrl = 'http://localhost:3000/api/trainingPlan'
  constructor(private http:HttpClient) { }

  createPlan(planData : planTraining): Observable<planTraining>{
    return this.http.post<planTraining>(`${this.apiUrl}/createPlan`, planData)
  }

  updateWod(trainingPlan_id: number, planData: Partial<planTraining> ){
    return this.http.put<planTraining>(`${this.apiUrl}/updatePlan/${trainingPlan_id}`, planData)
  }

  getPlanByUserId(user_id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${user_id}`)
  }
}
