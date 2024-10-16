import { Injectable, signal } from '@angular/core';
import { Board } from './model/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards = signal<Board[]>([
    {
      "name": "Platform Launch",
      "columns": []
    },
    {
      "name": "Marketing Plan",
      "columns": [
        {
          "name": "Todo",
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
          "tasks": []
        },
        {
          "name": "Done",
          "tasks": []
        }
      ]
    },
    {
      "name": "Roadmap",
      "columns": [
        {
          "name": "Now",
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
                  "isCompleted": false
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
          "tasks": []
        },
        {
          "name": "Later",
          "tasks": []
        }
      ]
    }
  ]);
  allBoards = this.boards.asReadonly();

  constructor() { }

  getBoardColumns(name: string) {
    return [...this.boards().filter(a => a.name == name)[0].columns];
  }
}
