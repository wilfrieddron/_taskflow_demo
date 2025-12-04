# _TaskFlow_

This is a task flow project based on the [T3 Stack](https://create.t3.gg/) developed by Wilfried Dron.
---
Simple task flow with OAuth and elegant drag and drop. 
Featuring NEXT, PRISMA & MONGODB, TYPESCRIPT, DND and REACT 
ℹ️ For demonstration purpose only
---

- Authentication with _Next Auth_
- Custom login; **Github** & **Google Auth**.
- _Prisma_ with _MongoDB Atlas_
- Models for users, accounts, sessions and tasks handling

## ➡️ Visual REACT components separated from the logic
Fully de-coupled visual components:
- Kanban: 2 boards; 
    - one with full feature, 
    - one with landing page demo [_TaskFlow_](https://taskflow.wmdstrategy.com/),
    - both are handling the drag and drop feature.
- TaskColumView: column of the Kanban with the titles and the list of task cards.
- TaskCardView: simple task card with title & description.
- EditTaskModal: modal to display, edit and delete cards.
- NewTaskForm: simple form to create a task.

---
## ➡️ Installation instruction:
### 1.Populate `.env` file with the following variables:
- `NEXTAUTH_URL` => your production url or localhost
- `AUTH_SECRET` => Secret used to encrypt NextAuth.js cookies and tokens 
- `DATABASE_URL` => Production MongoDB connection string to Atlas
- `GITHUB_ID` & `GITHUB_SECRET` => GitHub OAuth app credentials
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` => Google OAuth app credentials

### 2.Clone the repo and use the following command inside
```
npm install            
npx prisma generate    
npm run build          
```
---

Contact: wilfried.dron[at]wmdstrategy.com