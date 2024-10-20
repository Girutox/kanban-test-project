import { Component, HostBinding, inject, OnInit, TemplateRef } from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../model/board.model';
import { CustomButtonComponent } from "../UI/custom-button/custom-button.component";
import { BoardColumnComponent } from "./board-column/board-column.component";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CustomButtonComponent, BoardColumnComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  boardService = inject(BoardService);
  modalService = inject(NgbModal);
  activatedRoute = inject(ActivatedRoute);
  boardColumns: Column[] = [];
  isSpecial = true;

  @HostBinding('class.start-aligned') get specialClass() {
    return this.isSpecial;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['name']) {    
          this.boardColumns = this.boardService.getBoardColumns(params['name']);
          this.isSpecial = this.boardColumns.length > 0;
        }
      }
    });
  }

  onAddNewColumn(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onCreateNewColumn() {
    this.boardService.addNewColumn(this.boardService.activeBoardName(), 'DEMO');
  }
}
