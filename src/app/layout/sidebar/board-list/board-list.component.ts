import { Component, inject, TemplateRef } from '@angular/core';
import { BoardService } from '../../../board.service';
import { BoardListItemComponent } from './board-list-item/board-list-item.component';
import { ManageBoardComponent } from "../../../board/manage-board/manage-board.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderByPipe } from "../../../UI/pipes/order-by.pipe";

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [BoardListItemComponent, ManageBoardComponent, OrderByPipe],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent {
  boardService = inject(BoardService);
  modalService = inject(NgbModal);

  boards = this.boardService.allBoards;

  onCreateNewBoard(manageBoardModal: TemplateRef<any>) {
    console.log('Create new board');    
    this.modalService.open(manageBoardModal);
  }
}
