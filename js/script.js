// add note
const saveTask = (e) => {
    const newTask = document.querySelector('#task').value
    const dueDate = document.querySelector('#date').value

    if (!validateForm(newTask)) {
        return false
    }

    const taskInfo = {
        task: newTask,
        date: dueDate,
        complete: 'no'
    }

    // test if taskList is null
    if (localStorage.getItem("tasks") === null) {
        // init array
        const tasks = []
        // add to array
        tasks.push(taskInfo)
        // set to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        // get tasks from local storage
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        // add task to array
        tasks.push(taskInfo)
        // re-set back to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    // clear form
    document.querySelector('#myForm').reset()

    // re-display tasks
    displayTask()

    // prevent from submitting
    e.preventDefault()
}

// delete note
const deleteTask = (task) => {
    // get task from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"))

    // loop through the tasks
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].task == task) {
            // remove from array
            tasks.splice(i, 1)
        }
    }

    // re-set back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks))

    // re-display tasks
    displayTask()
}

// mark task complete
const markComplete = (num) => {
    // get the div
    const div = document.querySelector('#task' + num)

    // change div background color
    div.style.backgroundColor = '#f888b8'
}

// change complete button text
const changeText = (num) => {
    // get the button
    const btn = document.querySelector('#btnTask' + num)

    // change inner text
    btn.innerText = 'Complete'

    // change button color
    btn.style.backgroundColor = 'darkMagenta'
    btn.style.borderColor = 'darkMagenta'
}

// change task to complete
const completed = (num) => {
    // get tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"))

    // loop through the tasks
    for (let i = 0; i < tasks.length; i++) {
        if (i == num) {
            // change to complete
            tasks[i].complete = 'yes'
        }
    }

    // re-set back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks))

    // re-display tasks
    displayTask()
}

// display note
const displayTask = () => {
    // get tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const allTasks = document.querySelector("#allTasks")

    // build output
    allTasks.innerHTML = ""
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i].task
        let date = tasks[i].date
        let complete = tasks[i].complete

        allTasks.innerHTML += '<div class="newNote p-3 mb-3 newTask" id="task' + i + '"><h6>Date to Complete: ' + date + '</h6><h4>' + task + '</h4><a onclick="deleteTask(\'' + task + '\')" class="btn btn-secondary me-2">Delete Task</a><a onclick="completed(' + i + '), this.disabled=true" class="btn btn-secondary complete" id="btnTask' + i + '">Mark as Complete</a></div>'

        // check if complete
        if (complete == 'yes') {
            markComplete(i)
            changeText(i)
        }
    }
}

// validate form
const validateForm = (task) => {
    if (!task) {
        alert("Please enter a task.")
        return false
    } else {
        return true
    }
}

// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveTask)

displayTask()