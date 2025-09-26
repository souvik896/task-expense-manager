import { Component, signal, effect, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DarkModeService } from '../../../service/dark-mode.service';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../../service/share.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  private tasksChart?: Chart;
  private expensesChart?: Chart;

  @ViewChild('tasksCanvas') tasksCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expensesCanvas') expensesCanvas!: ElementRef<HTMLCanvasElement>;

  cmtask: number = 0;
  pndtask: number = 0;

  constructor(
    private router: Router,
    public darkMode: DarkModeService,
    public sharedservice: ShareService
  ) {
    effect(() => {
      this.darkMode.isDarkMode();
      this.sharedservice._totaltask();

      // ✅ Update task counts
      this.cmtask = this.sharedservice._completedTask().length;
      this.pndtask = this.sharedservice._pendingtask().length;

      if (this.tasksChart) {
        this.tasksChart.data.datasets[0].data = [this.cmtask, this.pndtask];
        this.tasksChart.update();
      }

      // ✅ Update expenses
      if (this.expensesChart) {
        const total = this.sharedservice.totalExpences();
        this.expensesChart.data.datasets[0].data = [total];
        this.expensesChart.update();
      }
    });
  }

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  goToTasks() { this.router.navigate(['/tasks']); }
  goToExpenses() { this.router.navigate(['/expenses']); }

  private renderCharts() {
    if (!this.tasksCanvas || !this.expensesCanvas) return;

    const isDark = this.darkMode.isDarkMode();

    // ----- TASKS CHART -----
    if (!this.tasksChart) {
      this.tasksChart = new Chart(this.tasksCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Pending'],
          datasets: [{
            data: [this.cmtask, this.pndtask],
            backgroundColor: ['#22c55e', '#f87171'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#333', font: { weight: 'bold' } }
            },
            tooltip: {
              backgroundColor: isDark ? '#222' : '#fff',
              titleColor: isDark ? '#fff' : '#000',
              bodyColor: isDark ? '#fff' : '#000'
            }
          }
        }
      });
    }

    // ----- EXPENSES CHART -----
    this.expensesChart?.destroy();
    this.expensesChart = new Chart(this.expensesCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Total'],
        datasets: [{
          label: 'Expenses ₹',
          data: [this.sharedservice.totalExpences()],
          backgroundColor: isDark ? '#60a5fa' : '#2563eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, labels: { color: '#333' } },
          tooltip: {
            backgroundColor: isDark ? '#222' : '#fff',
            titleColor: isDark ? '#fff' : '#000',
            bodyColor: isDark ? '#fff' : '#000'
          }
        },
        scales: {
          x: { ticks: { color: '#333' }, grid: { color: isDark ? '#555' : '#eee' } },
          y: { ticks: { color: '#333' }, grid: { color: isDark ? '#555' : '#eee' } }
        }
      }
    });
  }
}
