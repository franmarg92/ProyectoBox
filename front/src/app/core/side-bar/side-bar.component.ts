import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

 sidebarItems = [
    { label: 'Cargar Pagos', path: 'paids', roles: ['admin'] },
    { label: 'Cargar Asistencia', path: 'attendance', roles: ['admin', 'profesor'] },
    { label: 'Inscribirse a Clases', path: 'activities', roles: ['admin', 'profesor'] },
    { label: 'Cargar wod', path: 'wods', roles: ['admin', 'profesor'] },
    { label: 'Alumnos', path: 'users', roles: ['admin', 'profesor'] },
    { label: 'Cargar Apto Medico', path: 'medicalFit', roles: ['admin', 'profesor'] }
  ];

  filteredSidebarItems: any[] = [];
  userRole: string = '';

  @Output() closeSidebar = new EventEmitter<void>(); 

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.userRole = this.LoginService.getUserRole()?? 'user';
    this.updateSidebarItems();
  }

  updateSidebarItems() {
    this.filteredSidebarItems = this.sidebarItems.filter(item =>
      item.roles.includes(this.userRole)
    );
  }

  onItemClick() {
    this.closeSidebar.emit(); 
  }
}
