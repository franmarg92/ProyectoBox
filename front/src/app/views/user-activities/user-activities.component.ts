import { loggedUser } from './../../models/loggedUser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentsService } from '../../services/enrollments/enrollments.service';
import { enrollUser } from './../../models/enrollUser';
import { activity } from '../../models/activity';
import { ActivityService } from '../../services/activity/activity.service';
import { hours } from '../../models/hours';
import { HoursService } from '../../services/hours/hours.service';
import { DaysService } from '../../services/days/days.service';
import { days } from '../../models/days';
import { SessionsService } from '../../services/sessions/sessions.service';
import { Session } from '../../models/sessions';

@Component({
  selector: 'app-user-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-activities.component.html',
  styleUrl: './user-activities.component.css',
})
export class UserActivitiesComponent {
  enrollments: enrollUser = { user_id: 0, class_id: 0 };
  selectedTab: string = 'Inscripciones';
  loggedUser: loggedUser | null = null;
  activities: activity[] = [];
  days: days[] = [];
  hours: hours[] = [];
  sessions: Session[] = [];

  ngOnInit() {
    this.getLoggedUser();
    this.loadActivities();
    this.loadHours();
    this.loadDays();
    this.loadSessions();
  }

  constructor(
    private enrollmentsService: EnrollmentsService,
    private activityService: ActivityService,
    private hoursService: HoursService,
    private daysService: DaysService,
    private sessionService: SessionsService
  ) {}

  getLoggedUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedUser = JSON.parse(userData);
      if (this.loggedUser) {
        this.enrollments.user_id = this.loggedUser.user_id;
      }
    }
  }

  loadSessions() {
    this.sessionService.getAllSessions().subscribe((response) => {
      this.sessions = response;
    });
  }

  loadActivities() {
    this.activityService.getAllActivities().subscribe((response) => {
      this.activities = response;
    });
  }

  loadHours() {
    this.hoursService.getAllHours().subscribe((response) => {
      this.hours = response;
    });
  }

  loadDays() {
    this.daysService.getAllDays().subscribe((response) => {
      this.days = response;
    });
  }

  // Datos de WOD disponibles
  wods = [
    { nombre: 'Fran', fecha: '05/06/2025' },
    { nombre: 'Murph', fecha: '07/06/2025' },
  ];

  // Variables para almacenar la selección del usuario
  claseSeleccionada = 0;
  diaSeleccionado = 0;
  horarioSeleccionado = 0;

  // Método para manejar la inscripción
  inscribirse() {
    // 🔹 Buscar la sesión que coincide con la selección del usuario
    const selectedSession = this.sessions.find(
      (session) =>
        Number(session.id_activity) === Number(this.claseSeleccionada) &&
        Number(session.id_day) === Number(this.diaSeleccionado) &&
        Number(session.id_hour) === Number(this.horarioSeleccionado)
    );

    if (!selectedSession) {
      alert('No se encontró una sesión con la combinación seleccionada.');
      return;
    }

    if (selectedSession.available_spots <= 0) {
      alert('Lo sentimos, no hay cupos disponibles para esta clase.');
      return;
    }

    // 🔹 Datos de inscripción
    const enrollmentData = {
      user_id: this.loggedUser?.user_id ?? 0,
      class_id: selectedSession.class_id,
    };

    console.log('📌 Datos enviados al backend:', enrollmentData);

    // 🔹 Llamada al servicio para enviar la inscripción al backend
    this.enrollmentsService.enroll(enrollmentData).subscribe(
      (response) => {
      
        console.log('✅ Inscripción exitosa:', response);

        // 🔹 Reducir cupos disponibles en el frontend sin recargar
        selectedSession.available_spots--;
      },

      (error) => {
        alert(`Error al inscribirse: ${error.error}`);
        console.error('❌ Error en inscripción:', error);
      }
    );
  }

  // Método para cambiar de pestaña
  cambiarTab(tab: string) {
    this.selectedTab = tab;
  }
}
