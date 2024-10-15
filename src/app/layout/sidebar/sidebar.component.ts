import { Component } from '@angular/core';
import { BoardListComponent } from './board-list/board-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
}
