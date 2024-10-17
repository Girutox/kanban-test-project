import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../model/board.model';
import { CustomButtonComponent } from "../UI/custom-button/custom-button.component";
import { BoardColumnComponent } from "./board-column/board-column.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CustomButtonComponent, BoardColumnComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  boardService = inject(BoardService);
  activatedRoute = inject(ActivatedRoute);
  boardColumns: Column[] = [];
  isSpecial = true;

  @HostBinding('class.start-aligned') get specialClass() {
    return this.isSpecial;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.boardColumns = this.boardService.getBoardColumns(params['name']);
        this.isSpecial = this.boardColumns.length > 0;
      }
    });
  }
}
