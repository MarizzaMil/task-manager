import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import Select from 'react-select';

const TaskModal = ({ task, onSave, onClose, categories = [] }) => {
    const initialTaskData = task || { title: '', description: '', category: '' };
    const initialCategory = task?.category?.name || ''; 
    const options = categories.map(category => ({
        value: category,
        label: category,
    }));

    const [taskData, setTaskData] = useState(initialTaskData);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        setTaskData((prev) => ({ ...prev, category: selectedOption.value }));
    };

    useEffect(() => {
        setTaskData(task || { title: '', description: '', category: '' });
        if (task) {
            setSelectedCategory(options.find(option => option.label === task.category?.name) || null);

        }else {
            setSelectedCategory(null);
        }
        setSelectedCategory(task?.category?.name || ''); // Safely access category name
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
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={options}
                    placeholder="Select Category"
                    className="category-dropdown"
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
