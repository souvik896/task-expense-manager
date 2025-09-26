import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DarkModeService } from './service/dark-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'taskmanager';
   constructor(public darkMode: DarkModeService) {}
   
  sidebarOpen = signal(true); // sidebar starts open
  ngOnInit(): void {
          window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.sidebarOpen.set(false);
      }
    });
  }
  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
  toggleDarkMode() {
    this.darkMode.toggleDarkMode();
  }
}
