import { Component, HostBinding, output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { BoardListComponent } from './board-list/board-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('tooltip', [
      state('void', style({ opacity: 0, width: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        animate('0.1s ease-in')
      ]),
      transition(':leave', [
        animate('0.1s ease-out')
      ])
    ])
  ]
})
export class SidebarComponent {
  @HostBinding('@tooltip') tooltipAnimation = true;
  
  hideSidebar = output<boolean>();

  onHideSidebar() {
    this.hideSidebar.emit(true);
  }
}
