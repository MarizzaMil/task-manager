import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onSave, onClose }) => {
    const [taskData, setTaskData] = useState(task || { title: '', description: '' });

    useEffect(() => {
        setTaskData(task || { title: '', description: '' });
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (taskData.title.trim()) {
            onSave(taskData);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="task-modal">
                <h2>{taskData.id ? 'Edit Task' : 'Add New Task'}</h2>
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="task-input"
                />
                <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="Task Description"
                    className="task-input"
                />
                <div className="modal-actions">
                    <button className="save-task-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="cancel-task-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
