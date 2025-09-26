import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
    @Input() open = false;
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();
}
