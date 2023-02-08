# Overview

This web page displays a local to-do list that can have items added, marked as complete, and deleted. When an item is marked as complete, it is changed to a darker color scheme.

This is done using JavaScript functions that test if a task has been given, and then pushes the inputted data onto the browser as a new task. If the task name is missing, an error message will display, prompting the user to type in a task. A completion date is not required to add a task.

The delete button will remove the task by locating it within the task array and removng it, thus removing the respective element from the browser.

The mark as complete button functions in a similar capacity, but to change the colors of the element of the task.