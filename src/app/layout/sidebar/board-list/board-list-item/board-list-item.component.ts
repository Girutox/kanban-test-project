import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BoardService } from '../../../../board.service';

@Component({
  selector: 'app-board-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list-item.component.html',
  styleUrl: './board-list-item.component.scss'
})
export class BoardListItemComponent {
  boardService = inject(BoardService);
  router = inject(Router);

  boardName = input.required<string>();
  createMode = input<boolean>(false);

  onItemClick() {
    this.boardService.setActiveBoardName(this.boardName());
    this.router.navigate(['/board', this.boardName()]);
  }
}
