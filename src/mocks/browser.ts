import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { environment } from '../environments/environment'
import { Board } from '../app/model/board.model';

let dummyBoards: Record<string, Board[]> = {
  ["-OCiVFLHoccVfZtGPtaO"]: [
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
  ]
};

export const mocks = [
  http.get(`${environment.firebaseConfig.authDomain}/boards/user1.json`, ({ request }) => {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (key === environment.firebaseConfig.apiKey) {
      return HttpResponse.json(dummyBoards);
    }
    return HttpResponse.json([]);
  }),
  http.post(`${environment.firebaseConfig.authDomain}/boards/user1.json`, async ({ request }) => {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    const payload = await request.json() as Record<string, Board[]>;
    dummyBoards = payload;
    if (key === environment.firebaseConfig.apiKey) {
      return HttpResponse.json(payload);
    }
    return HttpResponse.json([]);
  }),
  http.put(`${environment.firebaseConfig.authDomain}/boards/user1.json`, async ({ request }) => {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    const payload = await request.json() as Record<string, Board[]>;
    dummyBoards = payload;
    if (key === environment.firebaseConfig.apiKey) {
      return HttpResponse.json(payload);
    }
    return HttpResponse.json([]);
  })
]

export const worker = setupWorker(...mocks)