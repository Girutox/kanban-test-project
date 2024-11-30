import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BoardService } from './board.service';
import { Column, Subtask } from './model/board.model';
import { HttpClient } from '@angular/common/http';

xdescribe('BoardService', () => {
  let service: BoardService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService,
        HttpClient,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get board columns', () => {
    const columns = service.getBoardColumns(2);
    expect(columns.length).toBe(3);
  });

  it('should get board by id', () => {
    const board = service.getBoard(1);
    expect(board.name).toBe('Platform Launch');
  });

  it('should get board name by id', () => {
    const name = service.getBoardName(2);
    expect(name).toBe('Marketing Plan');
  });

  it('should check if board exists', () => {
    const exists = service.boardExists(2);
    expect(exists).toBeTrue();
  });

  it('should save a new board', () => {
    const columns: Column[] = [{ name: 'New Column', color: '#ffffff', tasks: [] }];
    service.saveBoard(null, 'New Board', columns);
    const newBoard = service.getBoard(4);
    expect(newBoard.name).toBe('New Board');
  });

  it('should update an existing board', () => {
    const columns: Column[] = [{ name: 'Updated Column', color: '#ffffff', tasks: [] }];
    service.saveBoard(2, 'Updated Board', columns);
    const updatedBoard = service.getBoard(2);
    expect(updatedBoard.name).toBe('Updated Board');
  });

  it('should set active board id', () => {
    service.setActiveBoardId(2);
    expect(service.activeBoardId()).toBe(2);
  });

  it('should save a new task', () => {
    const subtasks: Subtask[] = [{ title: 'New Subtask', isCompleted: false }];
    service.saveTask('Todo', 0, subtasks, 'Todo', 'New Task', 'New Task Description');
    const board = service.getBoard(2);
    const task = board.columns.find(c => c.name === 'Todo')?.tasks.find(t => t.title === 'New Task');
    expect(task).toBeTruthy();
  });

  it('should delete the active board', () => {
    service.setActiveBoardId(2);
    service.deleteActiveBoard();
    expect(service.boardExists(2)).toBeFalse();
  });

  it('should delete a task', () => {
    service.deleteTask('Todo', 1);
    const board = service.getBoard(2);
    const task = board.columns.find(c => c.name === 'Todo')?.tasks.find(t => t.id === 1);
    expect(task).toBeUndefined();
  });
});