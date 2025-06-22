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
import { wods } from '../../models/wods';
import { WodsService } from '../../services/wods/wods.service';
import { PaidsService } from '../../services/paids/paids.service';
import Swal from 'sweetalert2';
import { PlanTrainingService } from '../../services/planTraining/plan-training.service';
import { planTraining } from '../../models/planTraining';

@Component({
  selector: 'app-user-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-activities.component.html',
  styleUrl: './user-activities.component.css',
})
export class UserActivitiesComponent {
  plan: planTraining = { trainingPlan_id: 0, description: '', user_id: 0 };
  enrollments: enrollUser = { user_id: 0, class_id: 0 };
  selectedTab: string = 'Inscripciones';
  loggedUser: loggedUser | null = null;
  activities: activity[] = [];
  days: days[] = [];
  hours: hours[] = [];
  sessions: Session[] = [];
  wod: wods[] = [];
  isPaid: boolean = false;
  expirationDate: Date | null = null;
  mensaje: string = '';

  ngOnInit() {
    this.getLoggedUser();
    this.loadWods();
    this.loadActivities();
    this.loadHours();
    this.loadDays();
    this.loadSessions();
    this.loadUserPaymentStatus();

    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser?.user_id) {
        this.loadPlanSoloLectura(parsedUser.user_id);
      }
    }
  }

  constructor(
    private enrollmentsService: EnrollmentsService,
    private activityService: ActivityService,
    private hoursService: HoursService,
    private daysService: DaysService,
    private sessionService: SessionsService,
    private wodsService: WodsService,
    private paidsService: PaidsService,
    private planService: PlanTrainingService
  ) {}

  loadUserPaymentStatus(): void {
    this.paidsService.getStatus(this.loggedUser?.user_id ?? 0).subscribe({
      next: (payment) => {
        this.expirationDate = payment.expiration_date;
        this.isPaid = payment.is_paid;
      },
      error: () => {
        this.expirationDate = null;
        this.isPaid = false;
      },
    });
  }

  getLoggedUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedUser = JSON.parse(userData);
      if (this.loggedUser) {
        this.enrollments.user_id = this.loggedUser.user_id;
      }
    }
  }

  loadWods() {
    this.wodsService.getAllWods().subscribe((response: wods[]) => {
      this.wod = response;
    });
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

  // Variables para almacenar la selección del usuario
  claseSeleccionada = 0;
  diaSeleccionado = 0;
  horarioSeleccionado = 0;

  getAvailableSpots(): number {
    const selectedSession = this.sessions.find(
      (session) =>
        Number(session.id_activity) === Number(this.claseSeleccionada) &&
        Number(session.id_day) === Number(this.diaSeleccionado) &&
        Number(session.id_hour) === Number(this.horarioSeleccionado)
    );
    return selectedSession ? selectedSession.available_spots : 0; // 🔹 Si no hay sesión, devuelve 0
  }

  private getNextDateOfWeekday(targetDay: number): string {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Domingo) a 6 (Sábado)

    let daysToAdd = targetDay - currentDay;
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);

    return nextDate.toISOString().split('T')[0]; // YYYY-MM-DD
  }

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
      Swal.fire({
        icon: 'warning',
        title: 'Sesión no encontrada',
        text: 'No se encontró una sesión con la combinación seleccionada.',
      });
      return;
    }

    if (selectedSession.available_spots <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Cupos agotados',
        text: 'Lo sentimos, no hay cupos disponibles para esta clase.',
      });
      return;
    }
    const enrollmentDate = this.getNextDateOfWeekday(this.diaSeleccionado);
    // 🔹 Datos de inscripción
    const enrollmentData = {
      user_id: this.loggedUser?.user_id ?? 0,
      class_id: selectedSession.class_id,
      enrollment_date: enrollmentDate,
    };

    // 🔹 Llamada al servicio para enviar la inscripción al backend
    this.enrollmentsService.enroll(enrollmentData).subscribe(
      (response) => {
        console.log('✅ Inscripción exitosa:', response);

        // 🔹 Reducir cupos disponibles en el frontend sin recargar
        selectedSession.available_spots--;

        Swal.fire({
          icon: 'success',
          title: 'Inscripción exitosa',
          text: 'Te has inscrito correctamente en la clase.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      },

      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en inscripción',
          text: `Error al inscribirse: ${error.error}`,
        });
        console.error('❌ Error en inscripción:', error);
      }
    );
  }

  // Método para cambiar de pestaña
  cambiarTab(tab: string) {
    this.selectedTab = tab;
  }

  loadPlanSoloLectura(user_id: number): void {
    this.planService.getPlanByUserId(user_id).subscribe({
      next: (plan) => {
        if (plan) {
          this.plan = plan;
        } else {
          this.mensaje = 'No tenés un plan asignado aún';
        }
      },
      error: (err) => {
        this.mensaje = 'Ocurrió un error al cargar tu plan';
        console.error(err);
      },
    });
  }
}
