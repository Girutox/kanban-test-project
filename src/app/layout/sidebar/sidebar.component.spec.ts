
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ScreenSizeService } from '../../screen-size.service';
import { BoardListComponent } from './board-list/board-list.component';
import { IconHideSidebarComponent } from "../../UI/SVG/icon-hide-sidebar/icon-hide-sidebar.component";
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let screenSizeService: ScreenSizeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BoardListComponent, IconHideSidebarComponent, BrowserAnimationsModule],
      providers: [ScreenSizeService]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    screenSizeService = TestBed.inject(ScreenSizeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on logo click', () => {
    spyOn(component.router, 'navigate');
    const logo = fixture.debugElement.query(By.css('.logo'));
    logo.triggerEventHandler('click', null);
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should emit hideSidebar event on hide sidebar button click', () => {
    spyOn(component.hideSidebar, 'emit');
    const button = fixture.debugElement.query(By.css('.hide-sidebar-button'));
    button.triggerEventHandler('click', null);
    expect(component.hideSidebar.emit).toHaveBeenCalledWith(true);
  });
});