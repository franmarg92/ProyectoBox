import { Component, OnInit } from '@angular/core';
import { planTraining } from '../../models/planTraining';
import { PlanTrainingService } from '../../services/planTraining/plan-training.service';
import { loggedUser } from '../../models/loggedUser';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-training',
  standalone: true,
  templateUrl: './plan-training.component.html',
  styleUrl: './plan-training.component.css',
  imports: [CommonModule, FormsModule]
})
export class PlanTrainingComponent implements OnInit {
  plan: planTraining = { trainingPlan_id: 0, description: '', user_id: 0 };
  usuarios: loggedUser[] = [];
  selectedUserName: string = '';
  mensaje: string = '';
  editing: boolean = false;
  selectedUserId: number | null = null;

  constructor(
    private planService: PlanTrainingService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     
  this.selectedUserId = Number(localStorage.getItem('selectedUserId'));

  if (this.selectedUserId && this.selectedUserId > 0) {
    this.plan.user_id = this.selectedUserId;
    this.loadPlan(this.selectedUserId);
  }

 
  this.userService.loadAllUsers().subscribe(); 
  this.userService.getUsersObservable().subscribe(users => {
    this.usuarios = users;

    const user = users.find(u => u.user_id === this.plan.user_id);
    if (user) this.selectedUserName = `${user.name} ${user.lastName}`;
  });
  }
loadPlan(user_id: number): void {
  this.planService.getPlanByUserId(user_id).subscribe({
    next: (plan) => {
      if (plan) {
        this.plan = plan;
      } else {
        this.mensaje = 'El usuario no tiene plan asignado aún';
        this.editing = true; // mostrar formulario de creación
      }
    },
    error: (err) => {
      this.mensaje = 'Error al cargar el plan';
      console.error(err);
    }
  });
}

  createPlan(): void {
    if (!this.plan.user_id || !this.plan.description) {
      this.mensaje = 'Faltan datos';
      return;
    }

    this.planService.createPlan(this.plan).subscribe({
      next: () => {
        this.mensaje = 'Plan creado correctamente 💪';
        this.plan.description = '';
        this.editing = false;
      },
      error: (err) => {
        this.mensaje = 'Error al crear el plan';
        console.error(err);
      }
    });
  }

  saveWod(): void {
    if (this.editing) {
      this.planService.updateWod(this.plan.trainingPlan_id, this.plan).subscribe(() => {
        this.editing = false;
        this.mensaje = 'Plan actualizado ✔️';
      });
    } else {
      this.createPlan();
    }
  }

  editWod(): void {
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  actualizarNombreSeleccionado(): void {
    const user = this.usuarios.find(u => u.user_id === this.plan.user_id);
    this.selectedUserName = user ? `${user.name} ${user.lastName}` : '';
  }
}
