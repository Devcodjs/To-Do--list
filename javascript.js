document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newTask').addEventListener('click', function (e) {
      e.preventDefault();
      addTask();
    });
  });
  
  const tasks = [];
  
  const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
  
    if (text) {
      tasks.push({ text: text, completed: false });
      updateTasksList();
      updateStats();
      saveTask();
      taskInput.value = '';
    }
  };
  
  const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTask();
  };
  
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTask();
  };
  
  const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
  
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTask();
  };
  
  const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0;
  
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
  };
  
  const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
  
      listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? 'completed' : ''}">   
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
            <p>${task.text}</p>
          </div>
          <div id="icons">
            <img src="./img/edit.png" onClick="editTask(${index})" alt="Edit" />
            <img src="./img/delete.png" onClick="deleteTask(${index})" alt="Delete" />
          </div>
        </div>
      `;
      listItem.querySelector('.checkbox').addEventListener("change", () => toggleTaskComplete(index));
      taskList.appendChild(listItem);
    });
  };
  
 
  document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(...savedTasks);
    updateTasksList();
    updateStats();
  });
  