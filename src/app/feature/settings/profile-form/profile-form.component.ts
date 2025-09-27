import { Component, signal } from '@angular/core';
import { CardComponent } from "../../../shared/ui/card/card.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { DarkModeService } from '../../../service/dark-mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CardComponent, ButtonComponent,CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
   
   constructor( public darkMode: DarkModeService){
    
   }

  exportData() {
    console.log("Exporting...");
  }

  importData() {
    console.log("Importing...");
  }

  clearData() {
    if (confirm("Are you sure you want to clear all data?")) {
      console.log("Data cleared");
    }
  }
}
