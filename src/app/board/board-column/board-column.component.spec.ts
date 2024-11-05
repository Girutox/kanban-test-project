import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardColumnComponent } from './board-column.component';
import { BoardTaskComponent } from './board-task/board-task.component';
import { BoardEmptyColumnComponent } from './board-empty-column/board-empty-column.component';
import { ComponentRef, ElementRef } from '@angular/core';

describe('BoardColumnComponent', () => {
  let component: BoardColumnComponent;
  let componentRef: ComponentRef<BoardColumnComponent>;
  let fixture: ComponentFixture<BoardColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskComponent, BoardEmptyColumnComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardColumnComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('status', 'To Do');
    component.circleElement = new ElementRef(document.createElement('div'));
    fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });

  it('should display the correct status text in the H4 element', () => {
    componentRef.setInput('status', 'In Progress');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('In Progress');
  });

  it('should set circle background color based on statusColor', () => {
    componentRef.setInput('statusColor', 'blue');
    fixture.detectChanges();
    expect(component.circleElement.nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should display the correct status and task count', () => {
    componentRef.setInput('tasks', [{ id: 1, title: 'Test Task', description: 'Test Description', subtasks: [] }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('To Do (1)');
  });

  it('should display tasks if tasks are present', () => {
    componentRef.setInput('tasks', [{ id: 1, title: 'Test Task', description: 'Test Description', subtasks: [] }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-board-task')).toBeTruthy();
  });

  it('should display empty column component if no tasks', () => {
    componentRef.setInput('tasks', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-board-empty-column')).toBeTruthy();
  });
});
