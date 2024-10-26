import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconChevronDownComponent } from "../SVG/icon-chevron-down/icon-chevron-down.component";

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [ReactiveFormsModule, IconChevronDownComponent],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  form = input.required<any>();
  options = input.required<{value: string, display: string}[]>();
  customFormControlName = input.required<string>();

  change = output<void>();

  onChange() {
    this.change.emit();
  }
}
