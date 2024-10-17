import { Component, input } from '@angular/core';
import { Task } from '../../../model/board.model';

@Component({
  selector: 'app-board-task',
  standalone: true,
  imports: [],
  templateUrl: './board-task.component.html',
  styleUrl: './board-task.component.scss'
})
export class BoardTaskComponent {
  task = input.required<Task>();
}
