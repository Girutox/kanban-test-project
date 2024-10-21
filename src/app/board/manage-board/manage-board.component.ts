import { Component, inject, input, OnInit, TemplateRef, viewChild } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { Column } from '../../model/board.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconCrossComponent } from "../../UI/SVG/icon-cross/icon-cross.component";
import { CommonModule } from '@angular/common';
import { BoardService } from '../../board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-board',
  standalone: true,
  imports: [CustomButtonComponent, ReactiveFormsModule, IconCrossComponent, CommonModule],
  templateUrl: './manage-board.component.html',
  styleUrl: './manage-board.component.scss'
})
export class ManageBoardComponent implements OnInit {
  boardService = inject(BoardService);
  modalService = inject(NgbModal);

  isNew = input.required<boolean>();
  name = input<string | null>(null);
  columns = input<Column[]>([]);

  form = new FormGroup({
    boardName: new FormControl('', Validators.required),
    columns: new FormArray([])
  });

  get getColumns() {
    return this.form.controls.columns.controls;
  }

  ngOnInit(): void {
    this.form.controls.boardName.setValue(this.name());
    for (const column of this.columns()) {
      (<FormArray>this.form.get('columns')).push(
        new FormGroup({
          name: new FormControl(column.name, [Validators.required])
        })
      );
    }
  }

  onAddNewColumn() {
    (<FormArray>this.form.get('columns')).push(
      new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    );
  }

  onRemoveColumn(index: number) {
    this.form.controls.columns.removeAt(index);
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.boardService.saveBoard(this.form.controls.boardName.value ?? '', this.form.get('columns')?.value ?? []);
    this.modalService.dismissAll();
  }
}
