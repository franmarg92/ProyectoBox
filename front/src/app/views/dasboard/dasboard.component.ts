import { Component } from '@angular/core';
import { SideBarComponent } from '../../core/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [SideBarComponent, RouterModule, CommonModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css'
})
export class DasboardComponent {
  sidebarOpen = false; // Estado inicial del sidebar
  

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
