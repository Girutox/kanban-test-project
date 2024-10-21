import { Component, computed, inject, input, signal } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { BoardService } from '../../board.service';
import { IconVerticalEllipsisComponent } from "../../UI/SVG/icon-vertical-ellipsis/icon-vertical-ellipsis.component";
import { FloatingCardComponent } from '../../UI/floating-card/floating-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent, IconVerticalEllipsisComponent, FloatingCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  boardService = inject(BoardService);
  sidebarHidden = input<boolean>(false);
  showFloatingCard = signal(false);

  activeBoardId = this.boardService.activeBoardId;
  boardName = computed(() => {
    return this.activeBoardId() ? this.boardService.getBoardName(this.activeBoardId()) : '';
  });
  isBoardEmpty = computed(() => {    
    return (this.activeBoardId()) ? this.boardService.getBoardColumns(this.activeBoardId()).length == 0 : true;
  });

  onToggleFloatingCard() {
    this.showFloatingCard.set(!this.showFloatingCard());
  }
}
