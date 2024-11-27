import { inject, Injectable, signal } from '@angular/core';
import { Board, Column, Subtask } from './model/board.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  router = inject(Router);
  http = inject(HttpClient);

  private boards = signal<Board[]>([]);
  private dummyBoards = signal<Board[]>([
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
              "description": "We're planning to launch on Product Hunt in 2 weeks. We need to get everything ready for the launch, including the product page, assets, and network notifications.",
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
              "description": "We're planning to share our product on Show HN to get feedback from the community. We need to draft out the post, get feedback, and publish the post.",
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
              "description": "We're planning to write an article about our launch and publish it on multiple channels to get the word out. We need to draft the article and publish it on LinkedIn, Indie Hackers, and Medium.",
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
              "description": "We're planning to launch version one of our product in 2 weeks. We need to get everything ready for the launch, including the product page, assets, and network notifications.",
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
  private fireBaseBoardUID = '';
  allBoards = this.boards.asReadonly();

  activeBoardId = signal<number | null>(null);

  constructor() {
    const activeBoardId = window.localStorage.getItem('activeBoardId');
    if (activeBoardId) {
      this.setActiveBoardId(parseInt(activeBoardId));
    }
  }

  testFireBase() {
    this.http.post(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, this.dummyBoards()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //#region Board Management (local)
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
   * Stores/Updates the current selected board ID.
   * @param id - The ID of the board currently selected (route).
  */
  setActiveBoardId(id: number) {
    this.activeBoardId.set(null);
    this.activeBoardId.set(id);
    window.localStorage.setItem('activeBoardId', id.toString());
  }

  /**
   * Generates a random hexadecimal color string.
   *
   * This function creates a random color by generating random values for the red, green,
   * and blue components of the color, converting these values to hexadecimal, and then
   * concatenating them into a single string prefixed with '#'.
   *
   * @returns {string} A random hexadecimal color string in the format '#RRGGBB'.
   */
  private getRandomHexColor(): string {
    const getRandomValue = () => Math.floor(Math.random() * 256);
    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  }
  //#endregion

  setBoardFullData() {
    return this.http.get<{ [key: string]: Board[] }>(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`).pipe(
      tap((response) => {        
        if (response) {
          this.fireBaseBoardUID = Object.keys(response)[0];          
          const boards = response[this.fireBaseBoardUID];
          boards.map((board) => {
            if (!board.hasOwnProperty('columns')) {
              board.columns = [];
            } else {
              board.columns.map((column) => {
                if (!column.hasOwnProperty('tasks')) {
                  column.tasks = [];
                } else {
                  column.tasks.map((task) => {
                    if (!task.hasOwnProperty('subtasks')) {
                      task.subtasks = [];
                    }
                  });
                }
              });
            }
          });
          this.boards.set(boards);
        } else {
          this.boards.set([]);
        }        
      })
    );
  }

  /**
   * Updates/Adds the specified board.
   * @param boardName - The name of the board to be managed.
   * @param columns - The columns data to be included in the board.
  */
  saveBoard(id: number | null, name: string, columns: Column[]) {
    let board: Board;

    // If board does not exist, create a new one
    // If it exists, remove it and then update the name
    if (id != null) {
      const boardIndex = this.boards().findIndex(a => a.id == id);
      board = { ...this.boards()[boardIndex] };
      this.boards().splice(boardIndex, 1);
      board.name = name;
    } else {
      const newBoardId = this.boards().length > 0 ? Math.max(...this.boards().map(a => a.id)) + 1 : 1; // If no boards, start with ID 1
      board = {
        id: newBoardId,
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

    if (this.fireBaseBoardUID == '') {
      return this.http.post(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, [...this.boards(), board]);
    } else {
      return this.http.put(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, { [this.fireBaseBoardUID]: [...this.boards(), board] });
    }
  }

  /**
   * Saves or updates a task within the specified column.
   * If the task exists, it updates the task's details.
   * If the task does not exist, it creates a new task.
   * If the task's status changes, it moves the task to the new column.
   * 
   * @param columnName - The name of the column where the task is currently located.
   * @param id - The ID of the task to be saved or updated.
   * @param subtasks - The list of subtasks associated with the task.
   * @param status - The status of the task, which corresponds to the column name.
   * @param title - The title of the task (optional).
   * @param description - The description of the task (optional).
   */
  saveTask(columnName: string, id: number, subtasks: Subtask[], status: string, title: string = '', description: string = '') {
    const boardIndex = this.boards().findIndex(a => a.id == this.activeBoardId());
    const board = { ...this.boards()[boardIndex] };
    this.boards().splice(boardIndex, 1);
    board.columns = [...board.columns];

    const activeBoardColumn = board.columns.find(a => a.name == columnName);
    const taskIndex = activeBoardColumn?.tasks.findIndex(b => b.id == id)!;
    let task = activeBoardColumn?.tasks[taskIndex];

    if (task) {
      if (columnName == status) {
        task.title = title == '' ? task.title : title;
        task.description = description == '' ? task.description : description;
        task.subtasks = subtasks;
        task.status = status;
      } else {
        const targetColumn = board.columns.find(a => a.name == status)!;
        activeBoardColumn!.tasks.splice(taskIndex, 1);

        targetColumn.tasks.push({
          ...task,
          title: title == '' ? task.title : title,
          description: description == '' ? task.description : description,
          subtasks: subtasks,
          status: status
        });
      }
    } else {
      const targetColumn = board.columns.find(a => a.name == status)!;
      const newTaskId = targetColumn.tasks.length > 0 ? Math.max(...targetColumn.tasks.map(a => a.id)) + 1 : 1; // If no tasks, start with ID 1
      task = {
        id: newTaskId, // TO DO: Get max ID from all columns (TEMP until DB connection)
        title,
        description,
        subtasks,
        status,
      };
      targetColumn.tasks.push(task);
    }

    return this.http.put(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, { [this.fireBaseBoardUID]: [...this.boards(), board] });
  }

  /**
   * Deletes the currently active board.
   *
   * This function finds the index of the currently active board in the list of boards,
   * removes it from the list, and then sets the active board ID to null.
   */
  deleteActiveBoard() {
    const boardIndex = this.boards().findIndex(a => a.id == this.activeBoardId());
    const newBoard = [...this.boards()];
    newBoard.splice(boardIndex, 1);
    
    return this.http.put(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, { [this.fireBaseBoardUID]: newBoard });
  }

  /**
   * Deletes the specified task from the specified column.
   *
   * This function finds the index of the specified task in the specified column, removes
   * it from the column, and then updates the list of boards with the modified column.
   *
   * @param columnName - The name of the column from which to delete the task.
   * @param id - The ID of the task to delete.
   */
  deleteTask(columnName: string, id: number) {
    const boardIndex = this.boards().findIndex(a => a.id == this.activeBoardId());
    const board = { ...this.boards()[boardIndex] };
    this.boards().splice(boardIndex, 1);
    board.columns = [...board.columns];

    const activeBoardColumn = board.columns.find(a => a.name == columnName)!;
    const taskIndex = activeBoardColumn.tasks.findIndex(b => b.id == id)!;
    activeBoardColumn.tasks.splice(taskIndex, 1);

    return this.http.put(`${environment.firebaseConfig.authDomain}/boards/user1.json?key=${environment.firebaseConfig.apiKey}`, { [this.fireBaseBoardUID]: [...this.boards(), board] });
  }
}
