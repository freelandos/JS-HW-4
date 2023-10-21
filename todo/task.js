const taskInput = document.getElementById('task__input');
const taskAddButton = document.getElementById('tasks__add');
const tasksList = document.getElementById('tasks__list');
let tasks;

loadTasksFromLocalStorage();

taskAddButton.addEventListener('click', (event) => {
  event.preventDefault();
  addTask();
})

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('task__remove')) {
    const task = event.target.closest('.task');

    task.remove();
    loadTasksToLocalStorage();
  }
})

function loadTasksFromLocalStorage() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  if (tasks.length > 0) {
    for (const taskTitle of tasks) {
      addTaskToHTML(taskTitle);
    }
  }
}

function loadTasksToLocalStorage() {
  const tasksTitleList = tasksList.querySelectorAll('.task__title');
  tasks = [];

  for (const taskTitle of tasksTitleList) {
    tasks.push(taskTitle.innerText);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToHTML(taskTitle) {
  const taskHTML = `
    <div class="task">
      <div class="task__title">
        ${taskTitle}
      </div>
      <a href="#" class="task__remove">&times;</a>
    </div>
  `;
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

function addTask() {
  const taskTitle = taskInput.value.trim();

  if (taskTitle) {
    addTaskToHTML(taskTitle);
    loadTasksToLocalStorage();
  }

  taskInput.value = '';
}