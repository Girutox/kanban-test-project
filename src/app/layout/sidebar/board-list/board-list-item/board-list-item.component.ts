import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list-item.component.html',
  styleUrl: './board-list-item.component.scss'
})
export class BoardListItemComponent {
  boardName = input.required<string>();
  createMode = input<boolean>(false);
}
