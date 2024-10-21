import { Component, effect, inject, OnInit, TemplateRef } from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../model/board.model';
import { CustomButtonComponent } from "../UI/custom-button/custom-button.component";
import { BoardColumnComponent } from "./board-column/board-column.component";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageBoardComponent } from './manage-board/manage-board.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CustomButtonComponent, BoardColumnComponent, CommonModule, ManageBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  host: {
    '[class.start-aligned]': 'specialClass'
  }
})
export class BoardComponent implements OnInit {
  boardService = inject(BoardService);
  modalService = inject(NgbModal);
  activatedRoute = inject(ActivatedRoute);

  boardName = '';
  boardColumns: Column[] = [];
  isSpecial = true;

  constructor() {
    effect(() => {
      this.boardColumns = this.boardService.getBoardColumns(this.boardName);
      this.isSpecial = this.boardColumns.length > 0;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['name']) {
          this.boardName = params['name'];
          this.boardColumns = this.boardService.getBoardColumns(this.boardName);
          this.isSpecial = this.boardColumns.length > 0;
        }
      }
    });
  }

  onAddNewColumn(manageBoardModal: TemplateRef<any>) {
    this.modalService.open(manageBoardModal);
  }
}
