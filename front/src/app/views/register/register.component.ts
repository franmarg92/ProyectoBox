import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { Register } from '../../models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    registerForm: FormGroup;

    constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router 
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  manejarEnvio() {
    if (this.registerForm.valid) {
      const userData: Register = this.registerForm.value;
      this.registerService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado',
            text: 'El registro se ha realizado con éxito',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/login']); 
          });
          this.registerForm.reset(); 
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: 'No se pudo completar el registro. Por favor, inténtalo de nuevo.',
            showConfirmButton: true
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Inválido',
        text: 'Por favor completa correctamente el formulario.',
        showConfirmButton: true
      });
    }
  }
}
