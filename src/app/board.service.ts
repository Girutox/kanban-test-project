import { Injectable, signal } from '@angular/core';
import { Board, Column, Subtask, Task } from './model/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boards = signal<Board[]>([
    {
      "id": 1,
      "name": "Platform Launch",
      "columns": []
    },
    {
      "id": 2,
      "name": "Marketing Plan",
      "columns": [
        {
          "name": "Todo",
          "color": "#ff5733",
          "tasks": [
            {
              "id": 1,
              "title": "Plan Product Hunt launch",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "title": "Find hunter",
                  "isCompleted": false
                },
                {
                  "title": "Gather assets",
                  "isCompleted": false
                },
                {
                  "title": "Draft product page",
                  "isCompleted": false
                },
                {
                  "title": "Notify customers",
                  "isCompleted": false
                },
                {
                  "title": "Notify network",
                  "isCompleted": false
                },
                {
                  "title": "Launch!",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": 2,
              "title": "Share on Show HN",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "title": "Draft out HN post",
                  "isCompleted": false
                },
                {
                  "title": "Get feedback and refine",
                  "isCompleted": false
                },
                {
                  "title": "Publish post",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": 3,
              "title": "Write launch article to publish on multiple channels",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "title": "Write article",
                  "isCompleted": false
                },
                {
                  "title": "Publish on LinkedIn",
                  "isCompleted": false
                },
                {
                  "title": "Publish on Inndie Hackers",
                  "isCompleted": false
                },
                {
                  "title": "Publish on Medium",
                  "isCompleted": false
                }
              ]
            }
          ]
        },
        {
          "name": "Doing",
          "color": "#d5e723",
          "tasks": []
        },
        {
          "name": "Done",
          "color": "#2367e7",
          "tasks": []
        }
      ]
    },
    {
      "id": 3,
      "name": "Roadmap",
      "columns": [
        {
          "name": "Now",
          "color": "#e72382",
          "tasks": [
            {
              "id": 4,
              "title": "Launch version one",
              "description": "",
              "status": "Now",
              "subtasks": [
                {
                  "title": "Launch privately to our waitlist",
                  "isCompleted": false
                },
                {
                  "title": "Launch publicly on PH, HN, etc.",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": 5,
              "title": "Review early feedback and plan next steps for roadmap",
              "description": "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              "status": "Now",
              "subtasks": [
                {
                  "title": "Interview 10 customers",
                  "isCompleted": true
                },
                {
                  "title": "Review common customer pain points and suggestions",
                  "isCompleted": false
                },
                {
                  "title": "Outline next steps for our roadmap",
                  "isCompleted": false
                }
              ]
            }
          ]
        },
        {
          "name": "Next",
          "color": "#23e7e1",
          "tasks": []
        },
        {
          "name": "Later",
          "color": "#23e729",
          "tasks": []
        }
      ]
    }
  ]);
  allBoards = this.boards.asReadonly();

  activeBoardId = signal<number | null>(null);

  constructor() {
    const activeBoardId = window.localStorage.getItem('activeBoardId');
    if (activeBoardId) {
      this.setActiveBoardId(parseInt(activeBoardId));
    }
  }

  /**
   * Obtains the stored columns/status for the specified board.
   * @param id - The ID of the board to retrieve the columns.
  */
  getBoardColumns(id: number | null) {
    const board = this.boards().filter(a => a.id == id);
    if (board.length == 0) {
      return [];
    }

    return [...board[0].columns];
  }

  /**
   * Allows to obtain the complete board based on the provided ID
   * @param id - The ID of the board to retrieve.
   */
  getBoard(id: number) {
    return { ...this.boards().find(a => a.id == id)! };
  }

  /**
   * Retrieves the requested board's name.
   * @param id - The ID of the board to retrieve the name.
   */
  getBoardName(id: number | null) {
    return this.boards().find(a => a.id == id)?.name || '';
  }

  /**
   * Verifies if the specified board exists.
   * @param id - The ID of the board to verify.
  */
  boardExists(id: number) {
    return this.boards().some(a => a.id == id);
  }

  /**
   * Updates/Adds the specified board.
   * @param boardName - The name of the board to be managed.
   * @param columns - The columns data to be included in the board.
  */
  saveBoard(id: number | null, name: string, columns: Column[]) {
    let board: Board;

    // If board does not exist, create a new one
    // If it exists,remove it and then update the name
    if (id != null) {
      const boardIndex = this.boards().findIndex(a => a.id == id);
      board = { ...this.boards()[boardIndex] };
      this.boards().splice(boardIndex, 1);
      board.name = name;
    } else {
      board = {
        id: Math.max(...this.boards().map(a => a.id)) + 1,
        name: name,
        columns: []
      };
    }

    // Update columns
    for (const column of columns) {
      const currentColumn = board.columns.find(a => a.name == column.name);

      column.color = currentColumn?.color || this.getRandomHexColor();
      column.tasks = currentColumn?.tasks || [];
    }
    board.columns = columns;

    this.boards.set([...this.boards(), board]);
  }

  /**
   * Stores/Updates the current selected board ID.
   * @param id - The ID of the board currently selected (route).
  */
  setActiveBoardId(id: number) {
    this.activeBoardId.set(id);
    window.localStorage.setItem('activeBoardId', id.toString());
  }

  private getRandomHexColor(): string {
    const getRandomValue = () => Math.floor(Math.random() * 256);
    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  }

  saveTask(columnName: string, id: number, subtasks: Subtask[], status: string) {
    const boardIndex = this.boards().findIndex(a => a.id == this.activeBoardId());
    const board = { ...this.boards()[boardIndex] };
    this.boards().splice(boardIndex, 1);
    board.columns = [...board.columns];

    const activeBoardColumn = board.columns.find(a => a.name == columnName)!;
    const taskIndex = activeBoardColumn.tasks.findIndex(b => b.id == id)!;
    const task = activeBoardColumn.tasks[taskIndex];

    if (columnName == status) {
      task.subtasks = subtasks;
      task.status = status;
    } else {
      const targetColumn = board.columns.find(a => a.name == status)!;
      activeBoardColumn.tasks.splice(taskIndex, 1);
      targetColumn.tasks.push({
        ...task,
        subtasks: subtasks,
        status: status
      });
    }

    this.boards.set([...this.boards(), board]);
  }
}
