import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { PaidsService } from '../../services/paids/paids.service';
import { loggedUser } from '../../models/loggedUser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paids',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './paids.component.html',
  styleUrl: './paids.component.css',
})
export class PaidsComponent implements OnInit {
  users: loggedUser[] = [];
  selectedUserId: number | null = null;
  amountPaid: number = 0;
  monthsPaid: number = 1;
  expirationDate: Date = new Date();
  

  constructor(
    private usersService: UsersService,
    private paidsService: PaidsService
  ) {}

  

  ngOnInit(): void {
    this.loadUsers();
    this.selectedUserId = Number(localStorage.getItem('selectedUserId')) || 0;
    
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  calculateExpiration(): void {
    const paymentDate = new Date();
    this.expirationDate = new Date(
      paymentDate.setMonth(paymentDate.getMonth() + this.monthsPaid)
    );
  }

  registerPayment(): void {
    console.log('📌 selectedUserId:', this.selectedUserId);
    console.log('💸 amountPaid:', this.amountPaid);
    console.log('📅 monthsPaid:', this.monthsPaid);
    if (this.selectedUserId && this.amountPaid > 0 && this.monthsPaid > 0) {
      const paymentData = {
        user_id: this.selectedUserId,
        amount: this.amountPaid,
        months_paid: this.monthsPaid,
      };

      this.paidsService.createPayment(paymentData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Pago registrado correctamente!',
            text: `El usuario ha pagado ${this.amountPaid} por ${this.monthsPaid} meses.`,
            confirmButtonColor: '#28a745',
          });
        },
        error: (error) => {
          console.error('Error al registrar pago:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el pago',
            text: 'Hubo un problema al procesar el pago. Inténtalo nuevamente.',
            confirmButtonColor: '#dc3545',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonColor: '#ffc107',
      });
    }
  }
}
