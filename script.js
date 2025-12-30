alert("JS KELOAD");

let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

// ambil data dari localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    tasks.push({ text: taskInput.value, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
}
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleTask(index);

        let span = document.createElement("span");
        span.textContent = task.text;
        if (task.done) span.classList.add("completed");

        let del = document.createElement("button");
        del.textContent = "❌";
        del.onclick = () => deleteTask(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(del);

        taskList.appendChild(li);
    });
