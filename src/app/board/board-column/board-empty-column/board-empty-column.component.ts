import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-board-empty-column',
  standalone: true,
  imports: [],
  templateUrl: './board-empty-column.component.html',
  styleUrl: './board-empty-column.component.scss'
})
export class BoardEmptyColumnComponent {
  isNewColumn = input<boolean>(true);

  @HostBinding('class.empty-column') get emptyTaskClass() {
    return this.isNewColumn();
  }
}
