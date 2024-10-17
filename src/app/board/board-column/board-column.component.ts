import { Component, input } from '@angular/core';
import { Task } from '../../model/board.model';
import { BoardTaskComponent } from "./board-task/board-task.component";

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [BoardTaskComponent],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
  status = input.required<string>();
  tasks = input.required<Task[]>();
}
