import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  form = input.required<any>();
  options = input.required<{value: string, display: string}[]>();

  change = output<void>();

  onChange() {
    this.change.emit();
  }
}
