# CampusOS

CampusOS is a MERN university management system with TypeScript, JWT auth, RBAC, MongoDB/Mongoose, Socket.IO, AI endpoints, Stripe-ready finance, Cloudinary-ready uploads, analytics, notifications, and audit logs.

## Run Locally

1. Copy `backend/.env.example` to `backend/.env` and fill secrets.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Start MongoDB locally or run with Docker Compose.
4. Backend: `cd backend && npm run dev`
5. Frontend: `cd frontend && npm run dev`

## Docker

```bash
docker compose up --build
```

Frontend runs on `http://localhost:8080`; backend runs on `http://localhost:5000`.

## Implemented Coverage

- Auth: register, login, logout, refresh token, forgot-password stub, Zod validation.
- RBAC: Super Admin, University Admin, Department Admin, Lecturer, Student, Parent, with legacy Admin alias.
- CRUD/API: users, students, lecturers, departments, courses, enrollments, attendance, assignments, exams, grades, library, hostel, finance, events, notifications, audit logs.
- Workflows: course enrollment capacity checks, assignment submission/grading, attendance marking, GPA summary, library borrow/return with fine calculation, hostel request/allocation, Stripe payment intent creation, Cloudinary upload endpoint.
- AI: study assistant, question generation, assignment feedback, GPA prediction, dropout risk, course recommendation endpoints with request logging.
- Realtime: Socket.IO notifications and announcements.
- Frontend: protected dashboards and navigable CRUD screens for major modules.

Provider-backed features require real credentials in `backend/.env`.
