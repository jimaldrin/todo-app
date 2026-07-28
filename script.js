const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskTitle = document.getElementById('taskTitle');
const line = document.getElementById('line');
const charCount = document.getElementById('charCount')


userInput.addEventListener('input', function() {
    charCount.textContent = userInput.value.length + ' / 100';
    
    if (userInput.value.length === 100){
            charCount.style.color = 'red';
            charCount.textContent = userInput.value.length + ' / 100' + ' (Max  limit reached)';
        } else {
            charCount.style.color = 'black';
        }
});

addBtn.addEventListener ('click', addTask);
// addBtn.addEventListener ('click', taskListText);
userInput.addEventListener ('keydown', function(e){
    if (e.key === 'Enter') {
        addTask();
    }
});


function addTask() {
    const text = userInput.value.trim();

    // Validates user input when it is empty
    if (text === "") {
        userInput.focus();
        return;
    }

    userInput.value = '';
    charCount.textContent = '0 / 100';


    // this creates a section title
    // charCount.classList.remove('hidden');
    taskTitle.classList.remove('hidden');
    line.classList.remove('hidden');

    // this creates the list of tasks
    const li = document.createElement('li');

    // span is like a div, this contains the information the user types in
    const span = document.createElement('span');
    span.className = 'taskText';
    span.textContent = text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';

    checkbox.addEventListener('change', function() {
    li.classList.toggle('done');
    });

    // it adds class="done" on and off when the toggle is triggered by 'click'
    span.addEventListener('click', function() {
        li.classList.toggle('done');
    });



        // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';

    // Create Google Material delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined';
    deleteIcon.textContent = 'delete';

    // Delete the <li> when clicked
    deleteBtn.addEventListener('click', function() {
        li.remove();
        
        if (taskList.children.length === 0){
            line.classList.add('hidden');
            taskTitle.classList.add('hidden');
        }
    });

    li.appendChild(span);
    deleteBtn.appendChild(deleteIcon);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    

    userInput.value = '';
    userInput.focus();
}