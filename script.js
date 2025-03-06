document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.querySelector(".todo-form");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("total-tasks");
    const completedTasks = document.getElementById("completed-tasks");
    const noTasksMessage = document.querySelector(".no-tasks");

    let tasks = []; // Array to store tasks

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("task-title").value.trim();
        const description = document.getElementById("task-description").value.trim();
        const priority = document.getElementById("task-priority").value;
        const dueDate = document.getElementById("task-due-date").value;

        if (title === "") return;

        const task = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false
        };

        tasks.push(task);
        updateTaskList();
        taskForm.reset();
    });

    function updateTaskList() {
        taskList.innerHTML = "";
        if (tasks.length === 0) {
            taskList.appendChild(noTasksMessage);
        } else {
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "task-item";
                li.innerHTML = `
                    <div>
                        <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
                        <span class="task-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.title}</span>
                        <span class="task-priority">(${task.priority})</span>
                        <p class="task-desc">${task.description}</p>
                        <p class="task-date">Due: ${task.dueDate || "No Due Date"}</p>
                    </div>
                    <button class="delete-task" data-id="${task.id}">Delete</button>
                `;
                taskList.appendChild(li);
            });
        }
        updateStats();
    }

    function updateStats() {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    }

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-task")) {
            const taskId = Number(e.target.getAttribute("data-id"));
            tasks = tasks.filter(task => task.id !== taskId);
            updateTaskList();
        }

        if (e.target.classList.contains("task-checkbox")) {
            const taskId = Number(e.target.getAttribute("data-id"));
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                task.completed = e.target.checked;
                updateTaskList();
            }
        }
    });
});
