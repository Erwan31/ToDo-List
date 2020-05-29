const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event litener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(event){
    event.preventDefault();
    console.log('click');

    // Todo List Container
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // New Todo List Elements
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Local storage
    saveLocalTodos(todoInput.value);

    //Checked button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck (e) {
    const item = e.target;
    const todo = item.parentElement;

    if( item.classList[0] === 'delete-button'){
        todo.classList.add("fall");    
        removeLocalTodos( todo ) ;
        todo.addEventListener('transitionend', function() {
            todo.remove(); 
        })
    }

    if( item.classList[0] === 'check-button'){
        todo.classList.toggle("completed");
    }


}


function filterTodo (e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach( todo => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

            case "uncomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

        }
    })

}

function saveLocalTodos( todo ){
    let todos;

    // Do we have a todos??
    if( localStorage.getItem('todos') === null){
        // Create an empty array if not
        todos = [];
    }
    else{
        // Get todos from local storage if yes
        todos = JSON.parse( localStorage.getItem('todos'));
    }
    // Push new value into localstorage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    // Do we have a todos??
    if( localStorage.getItem('todos') === null){
        // Create an empty array if not
        todos = [];
    }
    else{
        // Get todos from local storage if yes
        todos = JSON.parse( localStorage.getItem('todos'));
    }

    todos.forEach( todo => {
        const todoDiv = document.createElement('div');
        const newTodo = document.createElement('li');
        const checkButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        // Todo List Container
        todoDiv.classList.add("todo");

        // New Todo List Elements
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Checked button
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-button");
        todoDiv.appendChild(checkButton);

        //Delete button
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    }

    )
}

function removeLocalTodos( todo ) {
    let todos;

    // Do we have a todos??
    if( localStorage.getItem('todos') === null){
        // Create an empty array if not
        todos = [];
    }
    else{
        // Get todos from local storage if yes
        todos = JSON.parse( localStorage.getItem('todos'));
    }

    //Get Index of the item, retrieve from array and push all todos again
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice( todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

