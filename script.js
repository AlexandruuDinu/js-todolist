// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB78oGxSVuvXCZPuYJ1X5F5PDeshunot2M",
    authDomain: "todo-list-7e0a0.firebaseapp.com",
    databaseURL: "https://todo-list-7e0a0-default-rtdb.firebaseio.com",
    projectId: "todo-list-7e0a0",
    storageBucket: "todo-list-7e0a0.appspot.com",
    messagingSenderId: "568838034623",
    appId: "1:568838034623:web:288a9ec00ae56cbdd0a20a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


function saveData() {
    var todos = document.getElementById('');
}



const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event) {
    //PREVENT FORM FROM SUBMITTING
    event.preventDefault();

    //TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //CHECK MARK BTN
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BTN
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo) {
    //FIRST CHECK IF IS SOMETHING SAVED BEFORE
    let todos;
    if ( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //FIRST CHECK IF IS SOMETHING SAVED BEFORE
    let todos;
    if ( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        //TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK MARK BTN
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BTN
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if ( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}