document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  let tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const tasks = getTasksFromStorage();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "↺" : "✓";
    completeBtn.title = task.completed ? "Undo" : "Mark as Done";
    completeBtn.className = "round";
    completeBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.title = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  let tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  renderTasks();
}

const input = document.getElementById("task-input");
const addBtn = document.getElementById("addTaskBtn");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(); // Directly call addTask to add the task
  }
});
