// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', removeAllTasks);
  filter.addEventListener('keyup', filterTasks);
}

function addTask(event) {
  if(taskInput.value === '') {
    alert('Add a task');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'fa fa-remove delete-item secondary-content';
    // link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
  }

  event.preventDefault(); // prevent form submit
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(event) {
  // Event delegation
  if (event.target.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      event.target.parentElement.remove();
    }
  }
}

function removeAllTasks(event) {
  // const tasks = document.querySelectorAll('.collection .collection-item');
  // tasks.forEach((task) => {
  //   task.remove();
  // })

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // taskList.innerHTML = '';
}

function filterTasks(event) {
  const str = filter.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(str) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}