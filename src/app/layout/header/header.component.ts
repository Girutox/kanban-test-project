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

  activeBoardName = this.boardService.activeBoardName;
  isBoardEmpty = computed(() => {    
    return (this.activeBoardName()) ? this.boardService.getBoardColumns(this.activeBoardName()).length == 0 : true;
  });

  onToggleFloatingCard() {
    this.showFloatingCard.set(!this.showFloatingCard());
  }
}
