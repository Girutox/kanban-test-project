import { Component } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
