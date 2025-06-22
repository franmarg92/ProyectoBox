import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserActivitiesComponent } from './views/user-activities/user-activities.component';
import { AuthGuard } from './guards/auth-guard';
import { DasboardComponent } from './views/dasboard/dasboard.component';
import { PaidsComponent } from './views/paids/paids.component';
import { WodsComponent } from './views/wods/wods.component';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { AllUsersComponent } from './views/all-users/all-users.component';
import { MedicalFitComponent } from './views/medical-fit/medical-fit.component';
import { PlanTrainingComponent } from './views/plan-training/plan-training.component';
import { CreateClassComponent } from './views/create-class/create-class.component';


export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'activities',  component:UserActivitiesComponent , canActivate: [AuthGuard]},
    {path: 'dashboard', component:DasboardComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] },
        children:[
            {path: 'paids', component:PaidsComponent, canActivate: [AuthGuard], data: { roles: 'admin' }},
            {path: 'wods', component:WodsComponent, canActivate: [AuthGuard], data: { roles: 'admin' }},
            {path: 'attendance', component:AttendanceComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] }},
            {path: 'activities',  component:UserActivitiesComponent , canActivate: [AuthGuard]},
            {path: 'users', component:AllUsersComponent,canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] }},
            {path: 'medicalFit', component:MedicalFitComponent, canActivate: [AuthGuard], data: { roles: 'admin' }},
            {path: 'planTraining', component:PlanTrainingComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'profesor'] }},
            {path: 'createClass', component:CreateClassComponent, canActivate: [AuthGuard], data: {roles: 'admin'}}
        ]

    }, 
      
];


