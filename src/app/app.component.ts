import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from "./layout/header/header.component";
import { ShowSidebarComponent } from './layout/sidebar/show-sidebar/show-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ShowSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  hideSidebar = false;

  onHideSidebar() {
    this.hideSidebar = true;
  }

  onShowSidebar() {
    this.hideSidebar = false;
  }
}
