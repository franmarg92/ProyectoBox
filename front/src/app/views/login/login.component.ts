import { LoginService } from './../../services/login/login.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, ReactiveFormsModule, Validators} from '@angular/forms'
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth } from '../../models/auth';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;

  constructor(private fb : FormBuilder, private loginService: LoginService, private router : Router){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',  Validators.required]
    })
  }

   manejarEnvio() {
    if (this.loginForm.valid) {
      const userData: Auth = this.loginForm.value;
      this.loginService.login(userData).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);

          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          }).then(() => {
            this.router.navigate(['/activities']); 
          });
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          const errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa correctamente el formulario.',
      });
    }
  }


}
