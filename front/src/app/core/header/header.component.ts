import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MenuItem } from '../../models/menuItems';
import { loggedUser } from '../../models/loggedUser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];
  isAuthenticated: boolean = false;
  user: loggedUser | null = null;
  constructor(private loginService: LoginService, private router: Router) {}

 ngOnInit(): void {
  // 🔹 Recupera el usuario desde localStorage al iniciar
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    this.isAuthenticated = true;
  } else {
    this.isAuthenticated = false;
  }

  // 🔹 Suscribirse a cambios en el usuario (para actualizaciones en tiempo real)
  this.loginService.user$.subscribe((user) => {
    this.user = user;
    this.isAuthenticated = !!user;
    this.updateMenuItems();
  });

  this.updateMenuItems(); // 🔹 Asegura que el menú se actualiza correctamente
}


getLoggedUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.user) {
        this.user.user_id = this.user.user_id;
      }
    }
  }


  updateMenuItems() {
    if (this.isAuthenticated) {
      this.menuItems = [
        { text: 'Logout', event: () => this.logout(), class: 'logout-btn' },
      ];
    } else {
      this.menuItems = [
        { text: 'Iniciar Sesión', route: '/login', class: 'btn login-btn' },
        { text: 'Registrarse', route: '/register', class: 'btn register-btn' },
      ];
    }
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
