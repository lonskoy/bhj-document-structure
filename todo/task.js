const inputText = document.getElementById('task__input');
const btn = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
const storage = window.localStorage;
count = 0;


function addTask() {
    let taskObj = document.createElement('div');
    taskObj.className = 'task';

    let taskTitle = document.createElement('div');
    taskTitle.className = 'task__title';
    taskTitle.textContent = inputText.value;

    let taskRemove = document.createElement('a');
    taskRemove.className = 'task__remove';
    taskRemove.innerHTML = '&times;'
    taskRemove.addEventListener('click', () => {
        taskObj.remove();
    });

    taskObj.appendChild(taskTitle);
    taskObj.appendChild(taskRemove);

    storage.setItem('task' + count, inputText.value);
    inputText.value = '';
    count += 1;

    taskList.appendChild(taskObj);
}

function checkInput() {
    if(inputText.value) {
        addTask();
    }   
}

function addTaskCash() {

    for(let i = 0; i < storage.length; i++) {

        let taskObj = document.createElement('div');
        taskObj.className = 'task';

        let taskTitle = document.createElement('div');
        taskTitle.className = 'task__title';
        taskTitle.textContent = storage.getItem('task' + i);

        let taskRemove = document.createElement('a');
        taskRemove.className = 'task__remove';
        taskRemove.innerHTML = '&times;'
        taskRemove.addEventListener('click', () => {
        taskObj.remove();
        });

        taskObj.appendChild(taskTitle);
        taskObj.appendChild(taskRemove);

        taskList.appendChild(taskObj);
    }
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    checkInput()
});

inputText.addEventListener('keydown', (k) => {
    if(k.code === 13) {
        checkInput()
    }
});

window.addEventListener('load', ()=> {
    if(storage.length > 0) {
        addTaskCash();
    }
});




