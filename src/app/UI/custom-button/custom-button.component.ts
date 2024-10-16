import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  buttonType = input.required<'primary' | 'secondary' | 'destructive'>();
  buttonSize = input<'large' | 'small'>();
  buttonDisabled = input<boolean>(false);
}
