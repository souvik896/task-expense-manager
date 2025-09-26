import { Component, effect, signal } from '@angular/core';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { CardComponent } from "../../../shared/ui/card/card.component";
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { InputComponent } from "../../../shared/ui/input/input.component";
import { DarkModeService } from '../../../service/dark-mode.service';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../../service/share.service';

@Component({
  selector: 'app-expense-list',
  imports: [ButtonComponent, CardComponent, ModalComponent, InputComponent, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  constructor(
    public darkMode: DarkModeService,
    private shareService: ShareService
  ) {
    effect(() => {
      this.darkMode.isDarkMode();

      // ✅ push total to ShareService
      const total = this.expenses().reduce((sum: number, e: any) => sum + Number(e.amount), 0);
      this.shareService.setTotalExpenses(total);
    });
  }

  expenses = signal<any>([
    {
      id: 1,
      title: 'Groceries',
      amount: 1200,
      category: 'Food',
      date: '2025-09-25',
      notes: 'Bought vegetables and fruits'
    },
    {
      id: 2,
      title: 'Internet Bill',
      amount: 800,
      category: 'Utilities',
      date: '2025-09-20',
      notes: 'Monthly broadband payment'
    }
  ]);

  showModel = signal(false);
  siganlTitle = signal('');
  signalAmount = signal('');
  signalCategory = signal('');
  signalDate = signal('');
  signalnote = signal('');

  addTask() {
    if (!this.siganlTitle() || !this.signalAmount() || !this.signalCategory() || !this.signalDate() || !this.signalnote()) return;

    const newTask = {
      id: this.expenses().length + 1,
      title: this.siganlTitle(),
      amount: Number(this.signalAmount()),
      category: this.signalCategory(),
      date: this.signalDate(),
      notes: this.signalnote()
    };
    this.expenses.set([...this.expenses(), newTask]);

    // reset form
    this.showModel.set(false);
    this.siganlTitle.set('');
    this.signalAmount.set('');
    this.signalCategory.set('');
    this.signalDate.set('');
    this.signalnote.set('');
  }

  removeExpence(index: any) {
    const updatedArray = [...this.expenses()];
    updatedArray.splice(index, 1);
    this.expenses.set(updatedArray);
  }
}
