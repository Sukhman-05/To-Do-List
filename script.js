// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    
    // Create a text node for the task and append it to the list item
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);
    
    // Create a delete button and append it to the list item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        li.remove();
        saveTasks();  // Save tasks after deleting
    };
    li.appendChild(deleteButton);

    // Add the list item to the task list
    document.getElementById('taskList').appendChild(li);

    // Save tasks to localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = '';
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskListItems = document.querySelectorAll('#taskList li');

    taskListItems.forEach(item => {
        tasks.push(item.firstChild.textContent);  // Push task text into the tasks array
    });

    // Save the tasks array in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (storedTasks) {
        storedTasks.forEach(task => {
            const li = document.createElement('li');
            const textNode = document.createTextNode(task);
            li.appendChild(textNode);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.onclick = function() {
                li.remove();
                saveTasks();  // Save tasks after deleting
            };
            li.appendChild(deleteButton);

            document.getElementById('taskList').appendChild(li);
        });
    }
}

// Load tasks when the page is loaded
window.onload = loadTasks;
