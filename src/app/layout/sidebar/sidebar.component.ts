import { Component, output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { BoardListComponent } from './board-list/board-list.component';
import { IconHideSidebarComponent } from "../../UI/SVG/icon-hide-sidebar/icon-hide-sidebar.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BoardListComponent, IconHideSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, width: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        animate('0.1s ease-in')
      ]),
      transition(':leave', [
        animate('0.1s ease-out')
      ])
    ])
  ],
  host: {
    '[@fadeInOut]': 'fadeInOutAnimation'
  }
})
export class SidebarComponent {  
  hideSidebar = output<boolean>();

  onHideSidebar() {
    this.hideSidebar.emit(true);
  }
}
