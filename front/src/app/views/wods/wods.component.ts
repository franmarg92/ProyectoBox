import { Component } from '@angular/core';
import { wods } from '../../models/wods';
import { WodsService } from '../../services/wods/wods.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wods.component.html',
  styleUrl: './wods.component.css'
})
export class WodsComponent {
wod: wods = { wod_id: 0, description: '' }; // 🔹 Inicializa el WOD vacío
  editing: boolean = false; // 🔹 Indica si estamos editando

  constructor(private wodsService: WodsService) {}

  ngOnInit(): void {
    this.loadWod(); // 🔹 Carga el WOD al iniciar el componente
  }

 loadWod(): void {
  this.wodsService.getAllWods().subscribe((response: wods[]) => {
    if (response.length > 0) {
      this.wod = response[0]; // 🔹 Usa el primer WOD
      this.editing = false; // 🔹 Muestra la tarjeta primero
    }
  });
}

editWod(): void {
  this.editing = true; // 🔹 Activa el formulario
}

  saveWod(): void {
  if (this.editing) {
    this.wodsService.updateWod(this.wod.wod_id, this.wod).subscribe(() => {
      
      this.editing = false; // 🔹 Vuelve a la tarjeta después de guardar
    });
  } else {
    this.wodsService.createWod(this.wod).subscribe(() => {
      
      this.editing = false; // 🔹 Vuelve a la tarjeta después de crear
    });
  }
}

 cancelEdit(): void {
  this.editing = false; // 🔹 Vuelve a la tarjeta sin borrar el WOD
}
}
