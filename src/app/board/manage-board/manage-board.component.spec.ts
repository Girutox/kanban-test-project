import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBoardComponent } from './manage-board.component';
import { BoardService } from '../../board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { IconCrossComponent } from "../../UI/SVG/icon-cross/icon-cross.component";
import { ComponentRef } from '@angular/core';
import { Board } from '../../model/board.model';
import {worker} from '../../../mocks/browser'

xdescribe('ManageBoardComponent', () => {
  let component: ManageBoardComponent;
  let componentRef: ComponentRef<ManageBoardComponent>;
  let fixture: ComponentFixture<ManageBoardComponent>;
  let boardService: jasmine.SpyObj<BoardService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    worker.start();
    
    const boardServiceSpy = jasmine.createSpyObj('BoardService', ['getBoard', 'saveBoard']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['dismissAll']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomButtonComponent,
        IconCrossComponent,
        ManageBoardComponent
      ],
      providers: [
        { provide: BoardService, useValue: boardServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBoardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    boardService = TestBed.inject(BoardService) as jasmine.SpyObj<BoardService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Add New Board" when isNew is true', () => {
    spyOn(component, 'isNew').and.returnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.custom-modal-title').textContent).toContain('Add New Board');
  });
  
  it('should display "Create New Board" on the button when isNew is true', () => {
    spyOn(component, 'isNew').and.returnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-custom-button[ng-reflect-mode="primary"]').textContent).toContain('Create New Board');
  });

  it('should display "Edit Board" when isNew is false', () => {
    spyOn(component, 'isNew').and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.custom-modal-title').textContent).toContain('Edit Board');
  });
  
  it('should display "Save Changes" on the button when isNew is false', () => {
    spyOn(component, 'isNew').and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-custom-button[ng-reflect-mode="primary"]').textContent).toContain('Save Changes');
  });
  
  it('should initialize form with board data if id is provided', () => {
    const board: Board = { id: 1, name: 'Test Board', columns: [{ name: 'To Do', color: '#fff', tasks: [] }, { name: 'Done', color: '#fff', tasks: [] }] };
    componentRef.setInput('id', 1);
    boardService.getBoard.and.returnValue(board);
    component.ngOnInit();

    expect(component.name()).toBe('Test Board');
    expect(component.columns()).toEqual(board.columns);
    
    expect(component.form.controls.boardName.value).toBe('Test Board');
    expect(component.getColumns.length).toBe(2);
  });
  
  it('should initialize form with empty data if id is null', () => {
    componentRef.setInput('id', null);
    component.ngOnInit();

    expect(component.name()).toBe('');
    expect(component.columns()).toEqual([]);

    expect(component.form.controls.boardName.value).toBe('');
    expect(component.getColumns.length).toBe(0);
  });

  it('should display "Start adding columns to your board!" when there are no columns', () => {
    component.form.controls.columns.clear();
    spyOn(component, 'isNew').and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Start adding columns to your board! 👇');
  });

  it('should add a new column', () => {
    component.onAddNewColumn();
    expect(component.getColumns.length).toBe(1);
  });

  it('should remove a column', () => {
    component.onAddNewColumn();
    component.onRemoveColumn(0);
    expect(component.getColumns.length).toBe(0);
  });

  it('should not save the board if the form is invalid', () => {
    component.onSave();
    expect(boardService.saveBoard).not.toHaveBeenCalled();
    expect(modalService.dismissAll).not.toHaveBeenCalled();
  });

  it('should save the board if the form is valid', () => {
    component.form.controls.boardName.setValue('Test Board');
    component.onAddNewColumn();
    (<FormGroup>component.getColumns[0]).controls['name'].setValue('Test Status');
    component.onSave();

    expect(boardService.saveBoard).toHaveBeenCalled();
    expect(modalService.dismissAll).toHaveBeenCalled();
  });
});
