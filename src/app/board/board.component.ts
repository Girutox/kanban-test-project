import { Component, inject, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../model/board.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  boardService = inject(BoardService);
  activatedRoute = inject(ActivatedRoute);
  boardColumns: Column[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.boardColumns = this.boardService.getBoardColumns(params['name']);
      }
    });
  }
}
