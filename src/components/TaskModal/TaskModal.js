import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onSave, onClose, categories = [] }) => {
    const [taskData, setTaskData] = useState(task || { title: '', description: '', category: '' });
    const [selectedCategory, setSelectedCategory] = useState(task.category.name || '');

    console.log("task.category",task.category.name )

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        // Update taskData with the selected category
        setTaskData((prev) => ({ ...prev, category: newCategory }));
    };

    useEffect(() => {
        setTaskData(task || { title: '', description: '', category: '' });
        setSelectedCategory(task.category.name || '');
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
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
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="category-dropdown"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
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
