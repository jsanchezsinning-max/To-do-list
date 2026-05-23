import './style.css'

const API = "http://localhost:3000/tasks";

const tasksContainer = document.getElementById("tasksContainer");
const newTask = document.getElementById("newTask");
const createTaskBtn = document.getElementById("createTask");


// ========================
// GET TASKS
// ========================
async function getTasks() {
    const response = await fetch(API);
    const tasks = await response.json();

    console.log(tasks);

    renderTasks(tasks);
}


// ========================
// RENDER TASKS
// ========================
function renderTasks(tasks) {
    tasksContainer.innerHTML = "";

    tasks.forEach(task => {
        tasksContainer.innerHTML += `
           <li class="bg-slate-100 p-4 rounded-2xl flex justify-between items-center shadow">

                <span>
                    ${task.title}
                </span>

            </li> 
        `;
    });
}


// ========================
// POST TASK (CREATE)
// ========================
async function createTask(title) {

    const response = await fetch(API);
    const tasks = await response.json();

    const ids = tasks.map(task => Number(task.id));

    const maxId = Math.max(...ids, 0);

    const newId = maxId + 1;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: String(newId),
            title: title,
            completed: false
        })
    });

    getTasks();
}

// ========================
// EVENTO BOTÓN CREAR
// ========================
createTaskBtn.addEventListener("click", () => {
    const title = newTask.value.trim();

    if (!title) return;

    createTask(title);

    newTask.value = "";
});


// ========================
// INIT
// ========================
getTasks();