import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-board-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-list-item.component.html',
  styleUrl: './board-list-item.component.scss'
})
export class BoardListItemComponent {
  boardName = input.required<string>();
  createMode = input<boolean>(false);
}
