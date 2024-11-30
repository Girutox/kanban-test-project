import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTaskComponent } from './manage-task.component';
import { BoardService } from '../../board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CustomSelectComponent } from '../../UI/custom-select/custom-select.component';
import { IconCrossComponent } from "../../UI/SVG/icon-cross/icon-cross.component";
import { ComponentRef } from '@angular/core';
import {worker} from '../../../mocks/browser'
import { HttpClientModule } from '@angular/common/http';

xdescribe('ManageTaskComponent', () => {
  let component: ManageTaskComponent;
  let componentRef: ComponentRef<ManageTaskComponent>;
  let fixture: ComponentFixture<ManageTaskComponent>;
  let boardService: jasmine.SpyObj<BoardService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  // beforeAll(async () => {
  //   return worker.start({
  //     onUnhandledRequest: 'bypass'
  //   })
  // })

  beforeEach(async () => {
    worker.start();

    const boardServiceSpy = jasmine.createSpyObj('BoardService', ['getBoardColumns', 'activeBoardId', 'saveTask']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['dismissAll']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomButtonComponent,
        CustomSelectComponent,
        IconCrossComponent,
        ManageTaskComponent,
        HttpClientModule
      ],
      providers: [
        { provide: BoardService, useValue: boardServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    boardService = TestBed.inject(BoardService) as jasmine.SpyObj<BoardService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ManageTaskComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('isNew', true);
    componentRef.setInput('task', {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      subtasks: [{ title: 'Subtask 1', isCompleted: false }],
      status: 'To Do'
    });
    boardService.getBoardColumns.and.returnValue([{ name: 'To Do', color: '', tasks: [] }]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with task data', () => {
    component.ngOnInit();
    expect(component.form.controls.title.value).toBe('Test Task');
    expect(component.form.controls.description.value).toBe('Test Description');
    expect(component.form.controls.status.value).toBe('To Do');
  });

  it('should add a new subtask', () => {
    component.onAddNewSubtask();
    expect(component.form.controls.subtasks.length).toBe(2);
  });

  it('should remove a subtask', () => {
    component.onRemoveSubtask(0);
    expect(component.form.controls.subtasks.length).toBe(0);
  });

  it('should save the task', () => {
    component.onSave();
    expect(boardService.saveTask).toHaveBeenCalled();
    expect(modalService.dismissAll).toHaveBeenCalled();
  });

  it('should display "Add New Task" when isNew is true', () => {
    componentRef.setInput('isNew', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.custom-modal-title').textContent).toContain('Add New Task');
  });

  it('should display "Edit Task" when isNew is false', () => {
    componentRef.setInput('isNew', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.custom-modal-title').textContent).toContain('Edit Task');
  });

  it('should display "Start adding subtasks! 👇" when there are no subtasks', () => {
    component.form.controls.subtasks.clear();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Start adding subtasks! 👇');
  });

  it('should display "* Please complete all the required form values" when form is invalid and touched', () => {
    component.form.controls.title.setValue('');
    component.form.markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('* Please complete all the required form values');
  });
});