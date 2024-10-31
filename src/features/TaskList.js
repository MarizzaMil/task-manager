import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, createTask } from '../services/api';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';
import './TaskList.css'; 
import { FaPlus } from 'react-icons/fa'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const { user } = useAuth(); 

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetchTasks();
                setTasks(response);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        getTasks();
    }, []);

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleAddTask = async () => {
        if (newTask.title) {
            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
            setNewTask({ title: '', description: '' }); 
        }
    };

    const handleToggleCompleted = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        await updateTask(id, updatedTask);
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };

    return (
        <div className="task-list-container">
            <h1 className="task-list-title">My Task List</h1>
            {user && (
                <div className="add-task-container">
                    <input
                        type="text"
                        placeholder="New Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="new-task-input"
                    />
                    <button className="add-task-button" onClick={handleAddTask}>
                        <FaPlus /> Add Task
                    </button>
                </div>
            )}
            <div className="task-items">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            onDelete={handleDelete} 
                            onToggleCompleted={handleToggleCompleted}
                        />
                    ))
                ) : (
                    <p className="no-tasks-message">No tasks available. Please add some!</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
