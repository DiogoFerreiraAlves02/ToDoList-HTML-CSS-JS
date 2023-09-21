const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const list = document.querySelector('.list-tasks');

let tasksList = [];

function addNewTask(){
    if(input.value != ""){
        tasksList.push({
            task: input.value,
            finished: false,
        });
        input.value = "";
        listTasks();
    }
    else{
        alert("PROBLEM WITH THE ENTRY!");
    }
}

function listTasks(){
    let newLi = ''

    tasksList.forEach((item, index) => {
        newLi = newLi + `
            <li class="task ${item.finished && 'done'}">
                <img src="./img/checked.png" alt="check-task" onclick="finishTask(${index})">
                <p>${item.task}</p>
                <img src="./img/trash.png" alt="delete-task" onclick="deleteTask(${index})">
            </li>
        `
    }) 
    list.innerHTML = newLi;   

    localStorage.setItem('list', JSON.stringify(tasksList));
}

function finishTask(index){
    tasksList[index].finished = !tasksList[index].finished;
    listTasks();
}

function deleteTask(index){
    tasksList.splice(index, 1);
    listTasks();
}

function loadTasks(){
    const localStorageTasks = localStorage.getItem('list');
    if(localStorageTasks){
        tasksList = JSON.parse(localStorageTasks);
    }
    listTasks();
}

button.addEventListener('click', addNewTask)
loadTasks()