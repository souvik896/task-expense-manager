import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  totaltask = signal(0);
  totalExpences = signal(0);

  taskdata = signal<any[]>([]);

  constructor() {}

  // ----- TASKS -----
  settask(total: any) {
    this.totaltask.set(total);
  }
  _totaltask = computed(() => this.totaltask());

  settaskData(data: any) {
    this.taskdata.set(data);
    console.log(
      this.taskdata(),
      '*************',
      this._completedTask(),
      this._pendingtask()
    );
  }
  _completedTask = computed(() => this.taskdata().filter((task: any) => task.completed));
  _pendingtask = computed(() => this.taskdata().filter((task: any) => !task.completed));

  // ----- EXPENSES -----
  setTotalExpenses(total: number) {
    this.totalExpences.set(total);
  }
  _totalExpenses = computed(() => this.totalExpences());
}
