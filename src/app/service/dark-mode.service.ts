import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  // Signal to track dark mode state
  private _isDarkMode = signal(false);

  // Read-only computed signal for other components
  isDarkMode = computed(() => this._isDarkMode());

  // Toggle function
  toggleDarkMode() {
    this._isDarkMode.set(!this._isDarkMode());
  }
}
