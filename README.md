# Task Manager App

Task management application developed with JavaScript, Vite, TailwindCSS and json-server.  
The project allows creating, completing, deleting, filtering and searching tasks using a hybrid architecture with REST API persistence and browser storage.

---

## Project Objective

The main objective of this project is to implement a modern CRUD application using REST API consumption with json-server and persistence handling through sessionStorage.

The application was developed following a hybrid architecture where:

- Tasks are stored in json-server.
- Filters and searches are stored in sessionStorage.
- The interface is dynamically updated without reloading the page.

---

## Technologies Used

- JavaScript
- Vite
- TailwindCSS
- HTML5
- CSS3
- json-server

---

## Features

- Create tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks:
  - All
  - Active
  - Completed
- Real-time search
- Filter persistence with sessionStorage
- Search persistence with sessionStorage
- REST API consumption using fetch
- Dynamic DOM rendering

---

## Storage Architecture

### json-server
It is used as the main data source to store tasks.

Stored data:
- id
- title
- completed

### sessionStorage
It is used to store:
- Last selected filter
- Current search text

This allows maintaining navigation context while the tab remains open.

---

## Project Structure

## Project Structure

```bash
APP
│
├── node_modules/
├── public/
├── src/
│   ├── main.js
│   ├── counter.js
│   ├── style.css
│   └── assets/
│
├── .gitignore
├── db.json
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
```

---

## Installation and Execution

### 1. Clone the repository

```bash
git clone URL_OF_THE_REPOSITORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the project

```bash
npm run dev
```

### 4. Start json-server

```bash
npx json-server db.json --port 3000
```

---

## REST API

Used endpoint:

```bash
http://localhost:3000/tasks
```

Implemented methods:

- GET
- POST
- PATCH
- DELETE

---

## Data Flow

1. The user writes a task in the input.
2. JavaScript captures the entered value.
3. A POST request is sent to json-server.
4. The task is stored in db.json.
5. The interface is automatically re-rendered.
6. Filters and searches are maintained using sessionStorage.

---

## Applied Learnings

During the development of this project, concepts such as the following were applied:

- DOM manipulation
- JavaScript events
- Asynchronous functions with async/await
- REST API consumption
- Data persistence
- Dynamic rendering
- State management
- Hybrid storage architecture

---

## Author

Developed by Jhonatan Sanchez and Santiago Otalora
