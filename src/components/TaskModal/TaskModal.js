import React, { useState } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSave = () => {
        if (task.title.trim()) {
            onSave(task);
            setTask({ title: '', description: '' });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Task</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={handleChange}
                    className="modal-input"
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={task.description}
                    onChange={handleChange}
                    className="modal-textarea"
                />
                <div className="modal-actions">
                    <button onClick={handleSave} className="modal-save-button">Save</button>
                    <button onClick={onClose} className="modal-cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
