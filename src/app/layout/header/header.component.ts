import { Component, inject, effect } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  boardService = inject(BoardService);
  activeBoardName = this.boardService.activeBoardName;

  constructor() { }
}
