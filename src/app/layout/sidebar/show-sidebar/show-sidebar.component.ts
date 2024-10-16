import { Component, output, ViewEncapsulation } from '@angular/core';
import { CustomButtonComponent } from "../../../UI/custom-button/custom-button.component";

@Component({
  selector: 'app-show-sidebar',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './show-sidebar.component.html',
  styleUrl: './show-sidebar.component.scss'
})
export class ShowSidebarComponent {
  showSidebar = output<boolean>();

  onShowSidebar() {
    this.showSidebar.emit(true);
  }
}
