import { Component, inject, input, OnInit } from '@angular/core';
import { CustomButtonComponent } from "../../UI/custom-button/custom-button.component";
import { Task } from '../../model/board.model';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../../UI/custom-select/custom-select.component';
import { BoardService } from '../../board.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface SubtaskForm {
  title: FormControl<string>;
  isCompleted: FormControl<boolean>;
}

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CustomButtonComponent, CommonModule, CustomSelectComponent, ReactiveFormsModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {
  boardService = inject(BoardService);
  task = input.required<Task>();

  form = new FormGroup({
    subtasks: new FormArray<FormGroup<SubtaskForm>>([]),
    status: new FormControl('', Validators.required)
  })

  get getSubtasksControls() {    
    return this.form.controls.subtasks.controls;
  }

  ngOnInit(): void {
    this.form.controls.status.setValue(this.task().status);

    this.task().subtasks.forEach(a => {
      (<FormArray>this.form.get('subtasks')).push(new FormGroup({
        title: new FormControl(a.title, Validators.required),
        isCompleted: new FormControl(a.isCompleted, Validators.required)
      }));
    });
  }

  getStatusOptions() {
    const columns = this.boardService.getBoardColumns(this.boardService.activeBoardId());
    return columns.map(a => ({ value: a.name, display: a.name }));
  }

  getCompletedSubtaskCount() {
    return this.task().subtasks.filter(a => a.isCompleted).length;
  }
}
