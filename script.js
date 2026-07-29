// Get HTML elements
const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskTitle = document.getElementById('taskTitle');
const line = document.getElementById('line');
const charCount = document.getElementById('charCount');


// Character counter + auto-growing textarea
userInput.addEventListener('input', function() {

    charCount.textContent = userInput.value.length + ' / 200';

    // Automatically resize textarea
    userInput.style.height = 'auto';
    userInput.style.height = this.scrollHeight + 'px';

    // Change counter when max limit is reached
    if (userInput.value.length === 100) {
        charCount.style.color = 'red';
        charCount.textContent =
            userInput.value.length + ' / 200' + ' (Max limit reached)';
    } else {
        charCount.style.color = 'black';
    }
});


// Add task when button is clicked
addBtn.addEventListener('click', addTask);


// Add task when Enter is pressed
userInput.addEventListener('keydown', function(e) {

    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }

});


function addTask() {

    const text = userInput.value.trim();

    // Prevent empty tasks
    if (text === '') {
        userInput.focus();
        return;
    }


    // Show Task List title and line
    taskTitle.classList.remove('hidden');
    line.classList.remove('hidden');


    // Create list item
    const li = document.createElement('li');


    // Create task text
    const taskInput = document.createElement('input');
    taskInput.className = 'taskText';
    taskInput.value = text;
    taskInput.readOnly = true;

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';

    editBtn.addEventListener ('click', function(){

        if (taskInput.readOnly === true) {
            taskInput.readOnly = false;
            taskInput.focus();
        } else {
            const editedText = taskInput.value.trim();

            if (editedText === ''){
                taskInput.focus();
                return;
            }

            taskInput.value = editedText;
            taskInput.readOnly = true;
        }
    });


    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';


    // Mark task as done using checkbox
    checkbox.addEventListener('change', function() {
        li.classList.toggle('done');
    });


    // Mark task as done by clicking text
    taskInput.addEventListener('click', function() {
        li.classList.toggle('done');
        checkbox.checked = li.classList.contains('done');
    });


    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';

    // Create Google Material delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined';
    deleteIcon.textContent = 'delete';

    deleteBtn.appendChild(deleteIcon);

    // Create Google Material edit icon
    const editIcon = document.createElement('span');
    editIcon.className = 'material-symbols-outlined';
    editIcon.textContent = 'edit';

    editBtn.appendChild(editIcon);


    // Create container for icons
    const iconArea = document.createElement('span');
    iconArea.className = 'icons';

    iconArea.appendChild(deleteBtn);
    iconArea.appendChild(editBtn);


    // Put icon container inside <li>


    // Delete task when button is clicked
    deleteBtn.addEventListener('click', function() {

        li.remove();

        // Hide Task List title if there are no tasks left
        if (taskList.children.length === 0) {
            line.classList.add('hidden');
            taskTitle.classList.add('hidden');
        }

    });

    
        // Delete task when button is clicked


    // Put everything inside <li>
    li.appendChild(checkbox);
    li.appendChild(taskInput);
    li.appendChild(iconArea);

    // Put <li> inside task list
    taskList.appendChild(li);


    // Reset textarea
    userInput.value = '';
    userInput.style.height = 'auto';

    // Reset character counter
    charCount.textContent = '0 / 200';
    charCount.style.color = 'black';

    // Put cursor back into textarea
    userInput.focus();
}