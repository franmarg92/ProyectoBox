import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserActivitiesComponent } from './views/user-activities/user-activities.component';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'activities',  component:UserActivitiesComponent , canActivate: [AuthGuard]}
];


