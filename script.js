let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateProgress();
    }
})

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
    }
}

const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();

    console.log({ tasks });
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
}

updateProgress = () => {
    const status = document.getElementById('status');
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressBar = document.getElementById('progress');
    const progress = (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;

    status.innerHTML = `${completedTasks} / ${totalTasks}`;
    // if (tasks.length && completedTasks === totalTasks) {
    //     blastConfetti();
    // }
}

const updateTasksList = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="check-box" ${task.completed ? 'checked' : ''}>
            <p id="taskText">${task.text}</p>
        </div>
        <div class="buttons">
            <img src="./imgs/edit.png" alt="edit" onClick="editTask(${index})">
            <img src="./imgs/delete.png" alt="delete" onClick="deleteTask(${index})">
        </div>`;

        listItem.addEventListener('change', () => toggleTask(index));
        taskList.appendChild(listItem);

    })
    updateProgress();
    saveTasks();
}

document.getElementById('taskSubmit').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
})

// const blastConfetti = () => {
//     const defaults = {
//         spread: 360,
//         ticks: 50,
//         gravity: 0,
//         decay: 0.94,
//         startVelocity: 30,
//         shapes: ["star"],
//         colors: ["#000", "#555"],
//     };

//     function shoot() {
//         confetti({
//             ...defaults,
//             particleCount: 40,
//             scalar: 1.2,
//             shapes: ["star"],
//         });

//         confetti({
//             ...defaults,
//             particleCount: 10,
//             scalar: 0.75,
//             shapes: ["circle"],
//         });
//     }

//     setTimeout(shoot, 0);
//     setTimeout(shoot, 100);
//     setTimeout(shoot, 200);
// }
