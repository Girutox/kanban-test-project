import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from "./layout/header/header.component";
import { ShowSidebarComponent } from './layout/sidebar/show-sidebar/show-sidebar.component';
import { ScreenSizeService } from './screen-size.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ShowSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  hideSidebar = false;
  screenSizeService = inject(ScreenSizeService);
  isMobileMediumSize = signal(false);

  ngOnInit(): void {
    this.screenSizeService.resized$.subscribe(sizes => {      
      this.isMobileMediumSize.set(sizes.width <= this.screenSizeService.mobileMediumSize);
    });
  }

  onHideSidebar() {
    this.hideSidebar = true;    
  }

  onShowSidebar() {
    this.hideSidebar = false;
  }
}
