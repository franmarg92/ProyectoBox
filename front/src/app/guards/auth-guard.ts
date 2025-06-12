import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot , Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.loginService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }

    const userRole = this.loginService.getUserRole();
    const requiredRole = route.data['role']; 

    if (!requiredRole || requiredRole === userRole) {
      return true;
    }

    console.warn("❌ Acceso denegado: Se requiere rol", requiredRole);
    this.router.navigate(['']);
    return false;
  }
}
