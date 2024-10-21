import { Component, computed, inject, input, TemplateRef, viewChild } from '@angular/core';
import { ManageBoardComponent } from "../../manage-board/manage-board.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../board.service';

@Component({
  selector: 'app-board-empty-column',
  standalone: true,
  imports: [ManageBoardComponent],
  templateUrl: './board-empty-column.component.html',
  styleUrl: './board-empty-column.component.scss',
  host: {
    '(click)': 'onClick()',
    '[class.new-column]': 'isNewColumn()'
  }
})
export class BoardEmptyColumnComponent {
  isNewColumn = input<boolean>(true);
  boardService = inject(BoardService);
  boardName = this.boardService.activeBoardName;
  boardColumns = computed(() => {
    return this.boardService.getBoardColumns(this.boardName());
  });
  modalService = inject(NgbModal);

  manageBoardModal = viewChild<TemplateRef<any>>('manageBoardModal');

  onClick() {
    if (this.isNewColumn()) {
      this.modalService.open(this.manageBoardModal());
    }
  }
}
