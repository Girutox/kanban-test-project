import { Component, computed, inject, input, output, TemplateRef, viewChild } from '@angular/core';
import { Task } from '../../../model/board.model';
import { ViewTaskComponent } from "../../../Task/view-task/view-task.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-task',
  standalone: true,
  imports: [ViewTaskComponent],
  templateUrl: './board-task.component.html',
  styleUrl: './board-task.component.scss',
  host: {
    '(click)': 'onViewTask()'
  }
})
export class BoardTaskComponent {
  modalService = inject(NgbModal);

  task = input.required<Task>();
  viewTaskModal = viewChild<TemplateRef<any>>('viewTaskModal');

  completedSubtaskCount = computed(() => {
    return this.task().subtasks.filter(a => a.isCompleted).length;
  });

  onViewTask() {
    this.modalService.open(this.viewTaskModal());
  }
}
