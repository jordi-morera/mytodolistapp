// app.js
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('task-dialog');
    const form = document.getElementById('task-form');
    const dialogTitle = document.getElementById('task-dialog-title');
    const idField = document.getElementById('task-id');
    const errorMessage = document.getElementById('task-form-error');

    function openDialogForCreate() {
        form.reset();
        idField.value = '';
        dialogTitle.textContent = 'New Task';
        errorMessage.textContent = '';
        dialog.showModal();
    }

    function openDialogForEdit(button) {
        form.reset();
        idField.value = button.dataset.taskId;
        document.getElementById('title').value = button.dataset.taskTitle;
        document.getElementById('description').value = button.dataset.taskDescription || '';
        document.getElementById('eta').value = button.dataset.taskEta;
        dialogTitle.textContent = 'Edit Task';
        errorMessage.textContent = '';
        dialog.showModal();
    }

    document.getElementById('new-task-btn').addEventListener('click', openDialogForCreate);
    document.getElementById('cancel-task-btn').addEventListener('click', () => dialog.close());
    document.querySelectorAll('.edit-task').forEach(button => button.addEventListener('click', () => openDialogForEdit(button)));
    document.querySelectorAll('.mark-finished').forEach(button => button.addEventListener('click', markAsFinished));
    document.querySelectorAll('.delete-task').forEach(button => button.addEventListener('click', deleteTask));

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const id = idField.value;
        const task = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            eta: document.getElementById('eta').value
        };

        const response = await fetch(id ? `/tasks/${id}` : '/tasks', {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            window.location.reload();
        } else {
            errorMessage.textContent = 'Something went wrong saving the task. Please try again.';
        }
    });
});

async function markAsFinished(event) {
    const taskId = event.currentTarget.dataset.taskId;
    const response = await fetch(`/tasks/mark_as_finished/${taskId}`, { method: 'PATCH' });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('Error marking task as finished');
    }
}

async function deleteTask(event) {
    const taskId = event.currentTarget.dataset.taskId;
    const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
        window.location.reload();
    } else {
        console.error('Error deleting task');
    }
}
