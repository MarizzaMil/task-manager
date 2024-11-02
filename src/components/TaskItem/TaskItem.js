import React from 'react';
import './TaskItem.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onEdit, onToggleCompleted }) => {
    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleCompleted(task.id)}
                className="completed-checkbox"
            />
            <div className="task-content">
                <h2 className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</h2>
                <p className="task-description">{task.description}</p>

                {task.category && <p className="category-name">{task.category.name}</p>}

            </div>
            <div className="task-actions">
                <button className="edit-task-button" onClick={onEdit}>
                    <FaEdit />
                </button>
                <button className="delete-task-button" onClick={() => onDelete(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
