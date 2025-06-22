import { activity } from './../../models/activity';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Session } from '../../models/sessions';
import { UpdateSession } from '../../models/updateSession';
import { SessionsService } from '../../services/sessions/sessions.service';
import { ActivityService } from '../../services/activity/activity.service';
import { hours } from '../../models/hours';
import { days } from '../../models/days';
import { HoursService } from '../../services/hours/hours.service';
import { DaysService } from '../../services/days/days.service';
import { forkJoin } from 'rxjs';
import { CreateSession } from '../../models/createSession';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css',
})
export class CreateClassComponent {
  actividades: activity[] = [];
  selectedActivityId: number | null = null;
  days: days[] = [];
  hours: hours[] = [];

  sesionesACrear: Session[] = [];
session: CreateSession = {
  class_id: 0,
  id_day: 0,
  id_hour: 0,
  max_spots: 0,
  available_spots: 0,
  is_available: true,
};
  nuevaActividad: activity = { name: '', id_activity: 0 };
  mostrarFormActividad: boolean = false;
  selectedDays: number[] = [];
  selectedHours: number[] = [];
  mensaje: string = '';

  constructor(
    private sessionService: SessionsService,
    private activityService: ActivityService,
    private hoursService: HoursService,
    private daysService: DaysService
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
    this.loadHours();
    this.loadDays();
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

  cargarActividades(): void {
    this.activityService.getAllActivities().subscribe((res) => {
      this.actividades = res;
    });
  }

crearSesionesDesdeCombinaciones(): void {
  const sesionesACrear: CreateSession[] = [];

  for (const dayId of this.selectedDays) {
    for (const hourId of this.selectedHours) {
      sesionesACrear.push({
        class_id: this.session.class_id,
        id_day: dayId,
        id_hour: hourId,
        max_spots: this.session.max_spots ?? 0,
        available_spots: this.session.available_spots ?? 0,
        is_available: this.session.is_available ?? false
      });
    }
  }

  const observables = sesionesACrear.map((sesion) =>
    this.sessionService.createSession(sesion)
  );
  console.log('🛠️ Sesiones a crear:', sesionesACrear);


  forkJoin(observables).subscribe({
    next: () => {
      this.mensaje = 'Sesiones creadas correctamente ✅';
      
      this.selectedDays = [];
      this.selectedHours = [];
    },
    error: (err: any) => {
      this.mensaje = 'Error al crear una o más sesiones ❌';
      console.error(err);
    }
  });
}

guardarClase(): void {
  if (!this.validarFormularioCreacion()) return;
  this.crearSesionesDesdeCombinaciones();
}

  

  validarFormularioCreacion(): boolean {
  if (
    !this.session.class_id ||
    !this.session.max_spots ||
    this.selectedDays.length === 0 ||
    this.selectedHours.length === 0
  ) {
    this.mensaje = 'Faltan campos obligatorios';
    return false;
  }
  return true;
}

  crearActividad(): void {
    if (!this.nuevaActividad.name.trim()) return;

    this.activityService.createActivity(this.nuevaActividad).subscribe({
      next: (res) => {
        this.mensaje = 'Actividad creada correctamente ✅';
        this.actividades.push(res);
        this.nuevaActividad = { name: '', id_activity: 0 };
        this.mostrarFormActividad = false;
      },
      error: (err) => {
        this.mensaje = 'Error al crear actividad';
        console.error(err);
      },
    });
  }

  toggleDay(dayId: number, event: any): void {
    if (event.target.checked) {
      this.selectedDays.push(dayId);
    } else {
      this.selectedDays = this.selectedDays.filter((id) => id !== dayId);
    }
  }

  toggleHour(hourId: number, event: any): void {
    if (event.target.checked) {
      this.selectedHours.push(hourId);
    } else {
      this.selectedHours = this.selectedHours.filter((id) => id !== hourId);
    }
  }
}
