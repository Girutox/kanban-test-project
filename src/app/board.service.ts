import { Injectable, signal } from '@angular/core';
import { Board, Column } from './model/board.model';

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
              "title": "Share on Show HN",
              "description": "",
              "status": "",
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
              "title": "Write launch article to publish on multiple channels",
              "description": "",
              "status": "",
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
              "title": "Launch version one",
              "description": "",
              "status": "",
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
              "title": "Review early feedback and plan next steps for roadmap",
              "description": "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              "status": "",
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

  getBoard(id: number) {
    return { ...this.boards().find(a => a.id == id)! };
  }

  getBoardName(id: number | null) {
    return this.boards().find(a => a.id == id)?.name || '';
  }

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
}
