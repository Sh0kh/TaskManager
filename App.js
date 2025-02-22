document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("taskInput");
    const addButton = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Загружаем задачи из LocalStorage
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    function renderTasks() {
        taskList.innerHTML = savedTasks
            .map((task, index) => `
                <div class="Wrapper__card__smallCard ${task.completed ? "done" : ""}">
                    <span>${task.text}</span>
                    <div class="Card__grid">
                        <button class="SmallCardBnt1" onclick="toggleTask(${index})">
                            ${task.completed ? "Вернуть" : "Готово"}
                        </button>
                        <button class="SmallCardBnt2" onclick="removeTask(${index})">Удалить</button>
                    </div>
                </div>
            `)
            .join("");
    }

    window.toggleTask = function (index) {
        savedTasks[index].completed = !savedTasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.removeTask = function (index) {
        savedTasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addButton.addEventListener("click", function () {
        const taskText = input.value.trim();
        if (taskText) {
            savedTasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            input.value = "";
        }
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addButton.click();
        }
    });

    renderTasks();
});
