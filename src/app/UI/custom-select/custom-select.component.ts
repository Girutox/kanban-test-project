import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  options = input.required<{value: string, display: string}[]>();
}
