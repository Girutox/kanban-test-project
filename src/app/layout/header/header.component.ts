import { Component, computed, inject, input, signal } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { BoardService } from '../../board.service';
import { IconVerticalEllipsisComponent } from "../../UI/SVG/icon-vertical-ellipsis/icon-vertical-ellipsis.component";
import { FloatingCardComponent } from '../../UI/floating-card/floating-card.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent, IconVerticalEllipsisComponent, FloatingCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  boardService = inject(BoardService);
  router = inject(Router);

  sidebarHidden = input<boolean>(false);
  showFloatingCard = signal(false);

  activeBoardId = this.boardService.activeBoardId;
  boardName = computed(() => {
    return this.activeBoardId() ? this.boardService.getBoardName(this.activeBoardId()) : '';
  });
  isBoardEmpty = computed(() => {    
    return (this.activeBoardId()) ? this.boardService.getBoardColumns(this.activeBoardId()).length == 0 : true;
  });
  
  onLogoClick() {
    this.router.navigate(['/']);
  }

  onToggleFloatingCard() {
    this.showFloatingCard.set(!this.showFloatingCard());
  }
}
