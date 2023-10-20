const taskInput = document.getElementById('task__input');
const taskAddButton = document.getElementById('tasks__add');
const tasksList = document.getElementById('tasks__list');
let tasks;

loadTasksFromLocalStorage();

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

taskAddButton.addEventListener('click', addTask);

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('task__remove')) {
    const task = event.target.closest('.task');
    const taskId = task.dataset.id;

    task.remove();

    delete tasks[taskId];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
})

function loadTasksFromLocalStorage() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || {};
  
  for (const taskId in tasks) {
    addTaskToHTML(tasks[taskId], taskId);
  }
}

function addTaskToHTML(taskTitle, taskId) {
  const taskHTML = `
    <div class="task" data-id="${taskId}">
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
    const lastTaskId = JSON.parse(localStorage.getItem('lastTaskId')) || 0;
    const taskId = lastTaskId + 1;

    taskInput.value = '';
    addTaskToHTML(taskTitle, taskId);
    
    tasks[taskId] = taskTitle;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('lastTaskId', taskId);
  } else {
    taskInput.value = '';
  }
}