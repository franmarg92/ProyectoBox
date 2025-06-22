import { Component } from '@angular/core';
import { loggedUser } from '../../models/loggedUser';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaidsService } from '../../services/paids/paids.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  users: loggedUser[] = [];
  searchText: string = '';
  isPaid :boolean = false;
  expirationDate : Date | null = null;

  ngOnInit(): void {
    this.getUsers(); 
    this.loadAllUsers();
  }

  constructor(
    private usersService: UsersService,
    private paidsService: PaidsService,
    private router :Router
  ) {}

  getFilteredUsers(): any[] {
    if (!this.searchText.trim()) {
      return this.users;
    }

    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.dni.toString().includes(this.searchText) 
    );
  }

  getUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response; 
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }


loadAllUsers(): void {
  this.usersService.getAllUsers().subscribe({
    next: (users) => {
      this.users = users.map(user => ({
        ...user,
        expirationDate: null,
        isPaid: false
      }));

      this.paidsService.getAllPaids().subscribe({
        next: (payments) => {
          this.users.forEach(user => {
            const userPayment = payments.find((payment: { user_id: number; }) => payment.user_id === user.user_id);
            if (userPayment) {
              user.expirationDate = new Date(userPayment.expiration_date);
              user.isPaid = userPayment.is_paid;
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener pagos:', error);
        }
      });
    },
    error: (error) => {
      console.error('Error al obtener usuarios:', error);
    }
  });
}


goToRegisterPayment(userId: number): void {
  localStorage.setItem('selectedUserId', userId.toString()); 
  this.router.navigate(['/dashboard/paids']); 
}

changeUserRole(userId: number, newRole: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres cambiar el rol de este usuario a ${newRole}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Sí, cambiar rol'
  }).then((result) => {
    if (result.isConfirmed) {
      this.usersService.updateUserRole(userId, newRole).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Rol actualizado!',
            text: `El usuario ahora es ${newRole}.`,
            confirmButtonColor: '#28a745'
          });
          this.loadAllUsers(); 
        },
        error: (error) => {
          console.error('Error al actualizar rol:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el rol',
            text: 'Hubo un problema. Inténtalo nuevamente.',
            confirmButtonColor: '#dc3545'
          });
        }
      });
    }
  });
}

goToUserPlan(userId: number) {
  localStorage.setItem('selectedUserId', userId.toString()); 
  this.router.navigate(['/dashboard/planTraining']);
}

}
