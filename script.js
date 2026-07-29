// ========================================
// GET HTML ELEMENTS
// ========================================

const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskTitle = document.getElementById('taskTitle');
const line = document.getElementById('line');
const charCount = document.getElementById('charCount');



// ========================================
// MAIN INPUT EVENTS
// ========================================

// Character counter + auto-growing textarea
userInput.addEventListener('input', function() {

    charCount.textContent = userInput.value.length + ' / 200';

    // Automatically resize textarea
    userInput.style.height = 'auto';
    userInput.style.height = this.scrollHeight + 'px';

    // Change counter when max limit is reached
    if (userInput.value.length === 200) {
        charCount.style.color = 'red';
        charCount.textContent =
            userInput.value.length + ' / 200 (Max limit reached)';
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



// ========================================
// ADD TASK
// ========================================

function addTask() {

    // ------------------------------------
    // 1. GET AND VALIDATE USER INPUT
    // ------------------------------------

    const text = userInput.value.trim();

    if (text === '') {
        userInput.focus();
        return;
    }


    // ------------------------------------
    // 2. CREATE TASK ELEMENTS
    // ------------------------------------

    // List item
    const li = document.createElement('li');


    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';


    // Task text
    const taskInput = document.createElement('textarea');
    taskInput.className = 'taskText';
    taskInput.value = text;
    taskInput.readOnly = true;
    taskInput.rows = 1;


    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';


    // Edit icon
    const editIcon = document.createElement('span');
    editIcon.className = 'material-symbols-outlined';
    editIcon.textContent = 'edit';


    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';


    // Delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined';
    deleteIcon.textContent = 'delete';


    // Icon container
    const iconArea = document.createElement('span');
    iconArea.className = 'icons';



    // ------------------------------------
    // 3. TASK FUNCTIONS
    // ------------------------------------

    function resizeTask() {
        taskInput.style.height = 'auto';
        taskInput.style.height = taskInput.scrollHeight + 'px';
    }



    // ------------------------------------
    // 4. TASK EVENT LISTENERS
    // ------------------------------------

    // Automatically resize task text
    taskInput.addEventListener('input', resizeTask);


    // Checkbox: mark task as done
    checkbox.addEventListener('change', function() {
        li.classList.toggle('done');
    });


    // Edit / Save task
    editBtn.addEventListener('click', function() {

        // EDIT MODE
        if (taskInput.readOnly === true) {

            taskInput.readOnly = false;
            taskInput.focus();

            editIcon.textContent = 'check';
            checkbox.style.display = 'none';

        }

        // SAVE MODE
        else {

            const editedText = taskInput.value.trim();

            // Prevent empty task
            if (editedText === '') {
                taskInput.focus();
                return;
            }

            taskInput.value = editedText;
            taskInput.readOnly = true;

            editIcon.textContent = 'edit';
            checkbox.style.display = '';
        }

    });


    // Delete task
    deleteBtn.addEventListener('click', function() {

        li.remove();

        // Hide title and line if no tasks remain
        if (taskList.children.length === 0) {
            line.classList.add('hidden');
            taskTitle.classList.add('hidden');
        }

    });



    // ------------------------------------
    // 5. BUILD THE TASK
    // ------------------------------------

    // Put icons inside buttons
    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);


    // Put buttons inside icon container
    iconArea.appendChild(deleteBtn);
    iconArea.appendChild(editBtn);


    // Put task elements inside <li>
    li.appendChild(checkbox);
    li.appendChild(taskInput);
    li.appendChild(iconArea);


    // Put <li> inside task list
    taskList.appendChild(li);


    // Resize task textarea after it exists on page
    resizeTask();


    // Show Task List title and line
    taskTitle.classList.remove('hidden');
    line.classList.remove('hidden');



    // ------------------------------------
    // 6. RESET MAIN INPUT
    // ------------------------------------

    userInput.value = '';
    userInput.style.height = 'auto';

    charCount.textContent = '0 / 200';
    charCount.style.color = 'black';

    userInput.focus();
}