import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'dark' |'danger' = 'primary' ;

  get classes() {
    switch (this.variant) {
      case 'secondary': return 'bg-gray-500 text-white hover:bg-gray-600';
      case 'danger': return 'bg-red-500 text-white hover:bg-red-600';
      case 'dark' : return 'bg-gray-800 text-white hover:bg-gray-600';
      default: return 'bg-blue-500 text-white hover:bg-blue-600';
    }
  }
}
