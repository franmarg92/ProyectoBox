import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollmentsService } from '../../services/enrollments/enrollments.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  
  dateHoy: string = new Date().toISOString().split('T')[0];
  sesiones: any[] = [];
  sesionSeleccionada: any = null;
  alumnos: any[] = [];
  porActividad: any[] = [];
  

  constructor(private enrollmentsService: EnrollmentsService) {}

  ngOnInit(): void {
    this.cargarSesionesDelDia();
     

  }

  cargarSesionesDelDia(): void {
    this.enrollmentsService.getEnrollmentsByDate(this.dateHoy).subscribe({
      next: (res) => {
        console.log('📅 Sesiones de hoy:', res);
        this.sesiones = res;
      },
      error: () => {
        console.error('❌ Error al cargar sesiones del día');
      },
    });
  }

  onSeleccionarSesion(): void {
    if (!this.sesionSeleccionada) return;

    const inscriptos = this.sesionSeleccionada.Enrollments ?? [];

    this.alumnos = inscriptos.map((e: any) => ({
      enrollment_id: e.enrollment_id,
      nombre: e.User?.name,
      apellido: e.User?.lastName,
      user_id: e.user_id,
      present: e.attended === true,
      clases: 0,
    }));

    
  }

  registrarAsistencia(): void {
    if (!this.sesionSeleccionada) return;

    const presentesIds = this.alumnos
      .filter((a) => a.present)
      .map((a) => a.enrollment_id);

    if (presentesIds.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Nadie marcado como presente',
        text: 'Debés marcar al menos un alumno para registrar asistencia.',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.enrollmentsService.registerAtendance(presentesIds).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Asistencia registrada',
          text: `${presentesIds.length} alumno(s) marcados como presentes.`,
          confirmButtonColor: '#28a745',
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar asistencia',
          text: 'Ocurrió un problema al guardar. Intentá de nuevo.',
          confirmButtonColor: '#dc3545',
        });
      },
    });
  }
}
