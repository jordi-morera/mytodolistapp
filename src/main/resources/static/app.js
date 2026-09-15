// app.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mark-finished').forEach(link => link.addEventListener('click', markAsFinished));
    document.querySelectorAll('.delete-task').forEach(link => link.addEventListener('click', deleteTask));

    const createTaskForm = document.getElementById('create-task-form');
    if (createTaskForm) {
        createTaskForm.addEventListener('submit', createTask);
    }
});

async function markAsFinished(event) {
    event.preventDefault();
    const taskId = event.target.getAttribute('data-task-id');

    const response = await fetch(`/tasks/mark_as_finished/${taskId}`, { method: 'PATCH' });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('Error marking task as finished');
    }
}

async function deleteTask(event) {
    event.preventDefault();
    const taskId = event.target.getAttribute('data-task-id');

    const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('Error deleting task');
    }
}

async function createTask(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const task = Object.fromEntries(formData.entries());

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        window.location.href = '/';
    } else {
        console.error('Error creating task');
    }
}
