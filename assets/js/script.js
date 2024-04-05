// Grab references to the important DOM elements
form = $("#form-modal")

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// a function to generate a unique task id
// src: https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
function generateTaskId() {
    let taskID = Math.floor(Math.random() * Date.now()).toString(16);
    return taskID;
}

// a function to create a task card
function createTaskCard(task) {
    // create task cards using information in the taskList array
    const card = $("<div>")
        .addClass("card task-card my-3 draggable")
        .attr("data-task-id", task.id);
    
    const cardHeader = $("<div>")
        .addClass("card-header h3")
        .text(task.title);
    
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>")
        .addClass("card-text")
        .text(task.description)
    const cardDueDate = $("<p>")
        .addClass("card-text")
        .text(task.dueDate);
    
    const cardDeleteBtn  = $("<button>")
        .addClass("btn btn-danger delete")
        .text("Delete")
        .attr("data-task-id", task.id);
    cardDeleteBtn.on("click", handleDeleteTask)

    // assign colors to card based on date
    // validation to check if task doesn't have the status "done"
    if (task.status !== "done") {
        const now = dayjs();
        const dueDate = dayjs(task.dueDate, "MM-DD-YYYY");

        console.log(now);
        console.log(dueDate);

        // if today's date is up to 3 days before the due date, show yellow card
        // if after due date, show red card
        if (now.isBetween(dueDate.subtract(3, "day"), dueDate, "day", "[]")) {
            card.addClass("bg-warning text-white");
        } else if (now.isAfter(dueDate)) {
            card.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    // append elements to correct parent
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    card.append(cardHeader, cardBody)

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // empty existing cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();

     // loop through tasks and create cards for each status
    for (let i=0; i < taskList.length; i++) {
        if (taskList[i].status === "to-do") {
            todoList.append(createTaskCard(taskList[i]));
        } else if (taskList[i].status === "in-progress") {
            todoList.append(createTaskCard(taskList[i]));
        } else if (taskList[i].status === "done") {
            todoList.append(createTaskCard(taskList[i]));
        }
    }
}

// a function to handle adding a new task
function handleAddTask(event) {
    // prevent default behavior
    event.preventDefault();

    // store user inputs into variables
    const titleInput = $("#title").val();
    const dueDateInput = $("#due-date").val();
    const descriptionInput = $("#description").val();

    // validation to make sure all fields are filled out
    if ((titleInput === "") || (dueDateInput === "") || (descriptionInput === "")) {
        $("#msg").text("Please make sure to fill out all fields to add a task.");
    } else {
        $("#msg").text("");

        // create object of user inputs for task
        const newTask = {
            id: generateTaskId(),
            title: titleInput,
            dueDate: dueDateInput,
            description: descriptionInput,
            status: "to-do"
        };
         
        // If no tasks were retrieved from localStorage, assign tasks to a new empty array to push to later
        if (!taskList) {
            taskList = [];
        }

        // add new task to task list array
        taskList.push(newTask);

        // create key:value pair of task list array in local storage
        localStorage.setItem("tasks", JSON.stringify(taskList));

        // clear form input
        $("#title").val("");
        $("#due-date").val("");
        $("#description").val("");
        
        // exit out of modal
        form.modal("hide");

        // render task list to include new task
        renderTaskList();
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // render task list if there's any saved in local storage
    renderTaskList();

    // open modal when user clicks on the button "Add Task"
    form.on("click", function (event) {
        form.modal("show");
    });

    // close modal if user clicks on the X
    $(".close").on("click", function () {
        form.modal("hide");
    });

    // add date picker to due date input in modal
    $('#due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    // add user inputs into taskList array
    $("#add-task").on("click", handleAddTask);
});