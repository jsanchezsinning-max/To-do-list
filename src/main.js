import './style.css'

const API = "http://localhost:3000/tasks";


// aqui se definen todos los elementos HTML 

const tasksContainer = document.getElementById("tasksContainer");
const newTask = document.getElementById("newTask");
const createTaskBtn = document.getElementById("createTask");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

const tasksInfo = document.getElementById("tasksInfo");
const emptyMessage = document.getElementById("emptyMessage");

const searchTask = document.getElementById("searchTask");


// ESTADOS GLOBALES

let allTasks = [];

let currentFilter = sessionStorage.getItem("filter") || "all";

let searchValue = sessionStorage.getItem("search") || "";

// restaurar input de búsqueda
searchTask.value = searchValue;



// SEARCH con el sessionStorage

searchTask.addEventListener("input", (e) => {
    searchValue = e.target.value.toLowerCase();

    sessionStorage.setItem("search", searchValue);

    applyFilter();
});


// obtener tareas

async function getTasks() {

    const response = await fetch(API);
    const tasks = await response.json();

    allTasks = tasks;

    applyFilter();
}


// RENDER TASKS

function renderTasks(tasks) {

    tasksContainer.innerHTML = "";

    tasksInfo.textContent = `${tasks.length} tareas disponibles`;

    if (tasks.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }

    tasks.forEach(task => {

        tasksContainer.innerHTML += `
        
            <li class="bg-slate-100 p-4 rounded-2xl flex justify-between items-center shadow">

                <span class="${task.completed ? 'line-through text-gray-400' : ''}">
                    ${task.title}
                </span>

                <div class="flex gap-2">

                    <button
                        type="button"
                        onclick="toggleTask('${task.id}', ${task.completed})"
                        class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                    >
                        Complete
                    </button>

                    <button
                        type="button"
                        onclick="deleteTask('${task.id}')"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                    >
                        Delete
                    </button>

                </div>

            </li>
        `;
    });
}

// ========================
// APPLY FILTER
// ========================
function applyFilter() {

    let tasks = [...allTasks];

    if (currentFilter === "active") {
        tasks = tasks.filter(task => !task.completed);
    } 
    else if (currentFilter === "completed") {
        tasks = tasks.filter(task => task.completed);
    }

    if (searchValue.trim() !== "") {
        tasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchValue)
        );
    }

    renderTasks(tasks);
}

// ========================
// CREATE TASK
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
// DELETE TASK
// ========================
async function deleteTask(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    getTasks();
}

// ========================
// COMPLETE TASK
// ========================
async function toggleTask(id, completed) {

    await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: !completed
        })
    });

    getTasks();
}

// ========================
// CREAR TAREA
// ========================
createTaskBtn.addEventListener("click", () => {

    const title = newTask.value.trim();

    if (!title) return;

    createTask(title);

    newTask.value = "";
});

// ========================
// FILTROS
// ========================
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    sessionStorage.setItem("filter", currentFilter);
    applyFilter();
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    sessionStorage.setItem("filter", currentFilter);
    applyFilter();
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    sessionStorage.setItem("filter", currentFilter);
    applyFilter();
});

// ========================
// FUNCIONES GLOBALES
// ========================
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;

// ========================
// INIT
// ========================
getTasks();
