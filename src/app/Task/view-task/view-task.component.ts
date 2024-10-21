import { Component, input } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { Task } from '../../model/board.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CustomButtonComponent, CommonModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {
  task = input.required<Task>();

  getCompletedSubtaskCount() {
    return this.task().subtasks.filter(a => a.isCompleted).length;
  }
}
