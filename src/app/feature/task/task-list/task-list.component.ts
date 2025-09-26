import { Component, effect, signal } from '@angular/core';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { InputComponent } from "../../../shared/ui/input/input.component";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../../service/dark-mode.service';
import { ShareService } from '../../../service/share.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, InputComponent, CardComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
    // Task list signal
  tasks = signal<any>([
    { id: 1, title: 'Finish dashboard', dueDate: '2025-09-30', completed: false },
    { id: 2, title: 'Create task layout', dueDate: '2025-10-01', completed: true }
  ]);

  constructor(public darkMode: DarkModeService ,private sharedservice:ShareService){
        effect(() => {
          this.darkMode.isDarkMode()
           this.sharedservice.settask(this.tasks().length)
            this.sharedservice.settaskData([...this.tasks()])
        })
           
  }

  // Modal open/close signal
  showModal = signal(false);

  // New task fields as signals
  newTaskTitle = signal('');
  newTaskDue = signal('');

  // Add a new task
  addTask() {
    if (!this.newTaskTitle() || !this.newTaskDue()) return;

    const newTask = {
      id: this.tasks().length + 1,
      title: this.newTaskTitle(),
      dueDate: this.newTaskDue(),
      completed: false
    };

    this.tasks.set([...this.tasks(), newTask]);
    this.showModal.set(false);
    this.newTaskTitle.set('');
    this.newTaskDue.set('');
    this.sharedservice.settask(this.tasks().length)
  }

  // Toggle task completion
  toggleComplete(taskId: number) {
   
      let data= this.tasks().map((t: any) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    console.log(data)
    this.tasks.set(data)
    this.sharedservice.settaskData(data)
  }
}
