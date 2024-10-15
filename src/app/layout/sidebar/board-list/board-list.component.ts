import { Component, inject } from '@angular/core';
import { BoardService } from '../../../board.service';
import { BoardListItemComponent } from './board-list-item/board-list-item.component';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [BoardListItemComponent],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
  boardService = inject(BoardService);
  boards = this.boardService.allBoards;
}
