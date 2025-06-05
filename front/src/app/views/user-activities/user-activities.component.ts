import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-activities.component.html',
  styleUrl: './user-activities.component.css'
})
export class UserActivitiesComponent {
   selectedTab: string = 'Inscripciones'; // Por defecto mostrar "Clases"



  // Datos de clases separadas por tipo
    // Opciones de clases (estas vendrán del backend después)
  clasesCategorias = ['Funcional', 'Levantamiento', 'Cardio', 'Yoga', 'HIIT'];

   // Datos de WOD disponibles
  wods = [
    { nombre: 'Fran', fecha: '05/06/2025' },
    { nombre: 'Murph', fecha: '07/06/2025' }
  ];

  // Días de la semana
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Horarios disponibles
  horariosDisponibles = ['07:00 AM', '10:00 AM', '02:00 PM', '06:00 PM', '08:00 PM'];

  // Variables para almacenar la selección del usuario
  claseSeleccionada = '';
  diaSeleccionado = '';
  horarioSeleccionado = '';

  // Método para manejar la inscripción
  inscribirse() {
    if (this.claseSeleccionada && this.diaSeleccionado && this.horarioSeleccionado) {
      alert(`Inscripción confirmada: ${this.claseSeleccionada} el ${this.diaSeleccionado} a las ${this.horarioSeleccionado}`);
    } else {
      alert('Por favor, selecciona una clase, día y horario.');
    }
  }

  // Método para cambiar de pestaña
  cambiarTab(tab: string) {
    this.selectedTab = tab;
  }
}
