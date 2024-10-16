import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  action = input<'show-sidebar'>();
  type = input.required<'primary' | 'secondary' | 'destructive'>();
  size = input<'large' | 'small'>();
  disabled = input(false);

  showSidebar = output<boolean>();

  onClick() {
    if (this.action() == 'show-sidebar') {
      this.showSidebar.emit(true);
    }
  }
}
