import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MenuItem } from '../../models/menuItems';
import { loggedUser } from '../../models/loggedUser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuItems = [
  { label: 'Panel de control', path: '/dashboard', roles: ['admin', 'profesor'] },
  { label: 'Inscripciones', path: '/activities', roles: ['alumno'] },
];

filteredMenuItems: any[] = [];
isAuthenticated: boolean = false;
userRole: string = '';
user: loggedUser | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

 ngOnInit(): void {
  const userData = localStorage.getItem('user');
  this.userRole = this.loginService.getUserRole()?.toLowerCase() ?? 'user';
  this.isAuthenticated = !!userData;

  if (userData) {
    this.user = JSON.parse(userData);
  }

  this.loginService.user$.subscribe(user => {
    this.user = user;
    this.isAuthenticated = !!user;
    this.userRole = this.loginService.getUserRole()?.toLowerCase() ?? 'user';
    this.updateMenuItems();
  });

  this.updateMenuItems();
}

updateMenuItems() {
  if (!this.isAuthenticated) {
    this.filteredMenuItems = [];
    return;
  }

  this.filteredMenuItems = this.menuItems.filter(item =>
    item.roles.includes(this.userRole)
  );
}

  logout() {
    this.loginService.logout();
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: true,
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
