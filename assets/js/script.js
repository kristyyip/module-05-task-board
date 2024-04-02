// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// src: https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
function generateTaskId() {
    let taskID = Math.floor(Math.random() * Date.now()).toString(16);
    console.log(Date.now());
    console.log(taskID);
    return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    $("#add-task").on("click", function () {
        if (($("#title").val() === "") || ($("#due-date").val() === "") || ($("#description").val() === "")) {
            $("#msg").text("Please make sure to fill out all fields to add a task.");
        } else {
            $("#msg").text("");

            let taskID = generateTaskId();
            let title = $("#title").val();
            let dueDate = $("#due-date").val();
            let description = $("#description").val();

            let task = {
                taskID = taskID,
                title = title,
                dueDate = dueDate,
                description = description
            };
            
            $("#formModal").modal("hide");

            return task;
        }
    })
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // open modal when user clicks on the button "Add Task"
    $("#formModal").on("click", function (event) {
        $("#formModal").modal("show");
    });

    // close modal if user clicks on the X
    $(".close").on("click", function () {
        $("#formModal").modal("hide");
    })
});
