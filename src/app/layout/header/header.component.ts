import { Component, computed, ElementRef, inject, input, Renderer2, signal } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { BoardService } from '../../board.service';
import { IconVerticalEllipsisComponent } from "../../UI/SVG/icon-vertical-ellipsis/icon-vertical-ellipsis.component";
import { FloatingCardComponent } from '../../UI/floating-card/floating-card.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageTaskComponent } from '../../Task/manage-task/manage-task.component';
import { Task } from '../../model/board.model';
import { ManageBoardComponent } from '../../board/manage-board/manage-board.component';
import { ConfirmationModalComponent } from '../../UI/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent, IconVerticalEllipsisComponent, FloatingCardComponent, ManageTaskComponent, ManageBoardComponent],
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
  modalService = inject(NgbModal);
  elRef = inject(ElementRef);
  renderer = inject(Renderer2);

  sidebarHidden = input<boolean>(false);
  showFloatingCard = signal(false);

  activeBoardId = this.boardService.activeBoardId;
  boardName = computed(() => {
    return this.activeBoardId() ? this.boardService.getBoardName(this.activeBoardId()) : '';
  });
  isBoardEmpty = computed(() => {    
    return (this.activeBoardId()) ? this.boardService.getBoardColumns(this.activeBoardId()).length == 0 : true;
  });

  private clickListener: () => void;

  constructor() {
    this.clickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }
  
  onDocumentClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showFloatingCard.set(false);
    }
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  onToggleFloatingCard() {
    this.showFloatingCard.set(!this.showFloatingCard());
  }

  onAddNewTask() {
    const modalRef = this.modalService.open(ManageTaskComponent);
    modalRef.componentInstance.isNew = signal(true);
    modalRef.componentInstance.task = signal<Task>({id: 0, title: '', description: '', subtasks: [], status: ''});
  }

  onEditBoard() {
    this.showFloatingCard.set(false);

    const modalRef = this.modalService.open(ManageBoardComponent);
    modalRef.componentInstance.isNew = signal(false);
    modalRef.componentInstance.id = this.activeBoardId;
  }

  onDeleteBoard() {
    this.showFloatingCard.set(false);

    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = signal('Delete this board?');
    modalRef.componentInstance.message = signal(`Are you sure you want to delete the ‘${this.boardName()}’ board? This action will remove all columns and tasks and cannot be reversed.`);
    modalRef.componentInstance.data = signal(this.boardName());
    modalRef.componentInstance.confirmedAction = signal(() => {
      this.boardService.deleteActiveBoard();
    });
  }
}
