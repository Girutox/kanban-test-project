import { Component, inject, input } from '@angular/core';
import { BoardService } from '../../board.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtaskForm } from '../view-task/view-task.component';
import { Subtask, Task } from '../../model/board.model';
import { CustomSelectComponent } from '../../UI/custom-select/custom-select.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { IconCrossComponent } from "../../UI/SVG/icon-cross/icon-cross.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-task',
  standalone: true,
  imports: [CustomButtonComponent, CommonModule, CustomSelectComponent, ReactiveFormsModule, IconCrossComponent],
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  boardService = inject(BoardService);
  modalService = inject(NgbModal);
  
  isNew = input.required<boolean>();
  task = input.required<Task>();
  columnName = input<string>();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    subtasks: new FormArray<FormGroup<SubtaskForm>>([], Validators.required),
    status: new FormControl('')
  })

  get getSubtasksControls() {    
    return this.form.controls.subtasks.controls;
  }

  ngOnInit(): void {
    this.form.controls.title.setValue(this.task().title);
    this.form.controls.description.setValue(this.task().description);
    this.task().subtasks.forEach(a => {
      (<FormArray>this.form.get('subtasks')).push(new FormGroup({
        title: new FormControl(a.title, Validators.required),
        isCompleted: new FormControl(a.isCompleted, Validators.required)
      }));
    });
    this.form.controls.status.setValue(this.task().status != '' ? this.task().status : this.getStatusOptions()[0].value);
  }

  getStatusOptions() {
    const columns = this.boardService.getBoardColumns(this.boardService.activeBoardId());
    return columns.map(a => ({ value: a.name, display: a.name }));
  }

  onAddNewSubtask() {
    (<FormArray>this.form.get('subtasks')).push(
      new FormGroup({
        title: new FormControl('', [Validators.required]),
        isCompleted: new FormControl(false)
      })
    );
  }

  onRemoveSubtask(index: number) {
    (<FormArray>this.form.get('subtasks')).removeAt(index);
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }    

    this.boardService.saveTask(this.form.value.status ?? '', this.task().id, <Subtask[]>this.form.value.subtasks, this.form.value.status ?? '', this.form.value.title ?? '', this.form.value.description ?? '');
    this.modalService.dismissAll();
  }
}
