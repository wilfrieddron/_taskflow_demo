# _TaskFlow_

This is a task flow project based on the [T3 Stack](https://create.t3.gg/) developed by Wilfried Dron.

.
├── prisma
│   ├── db.sqlite
│   └── schema.prisma
├── public
│   ├── favicon.ico
│   └── favicon.png
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── [...nextauth]
│   │   │   │   │   └── route.ts
│   │   │   │   └── register
│   │   │   │       └── route.ts
│   │   │   └── trpc
│   │   │       └── [trpc]
│   │   │           └── route.ts
│   │   ├── auth
│   │   │   ├── register
│   │   │   │   └── page.tsx
│   │   │   └── signin
│   │   │       └── page.tsx
│   │   ├── kanban
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── building_assets
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   ├── favicon.svg
│   │   └── favicon.xcf
│   ├── components
│   │   ├── kanban
│   │   │   ├── KanbanBoardPreview.tsx
│   │   │   └── KanbanBoardView.tsx
│   │   ├── tasks
│   │   │   ├── EditTaskModal.tsx
│   │   │   ├── NewTaskForm.tsx
│   │   │   ├── TaskCardView.tsx
│   │   │   └── TaskColumnView.tsx
│   │   ├── AuthBar.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx
│   ├── features
│   │   └── tasks
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── utils.ts
│   ├── server
│   │   ├── api
│   │   │   ├── routers
│   │   │   │   └── task.ts
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   └── db.ts
│   ├── styles
│   │   └── globals.css
│   ├── trpc
│   │   ├── query-client.ts
│   │   ├── react.tsx
│   │   └── server.ts
│   ├── types
│   │   └── next-auth.d.ts
│   └── env.js
├── .env
├── .env.example
├── .env.production
├── .gitignore
├── .npmrc
├── Dockerfile
├── eslint.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.js
├── prettier.config.js
├── README.md
└── tsconfig.json