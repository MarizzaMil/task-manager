import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, createTask } from '../services/apiTask';
import TaskItem from '../components/TaskItem/TaskItem';
import TaskModal from '../components/TaskModal/TaskModal';
import AuthModal from '../components/AuthModal/AuthModal';
import { useAuth } from '../context/AuthContext';
import './TaskList.css';
import { FaPlus } from 'react-icons/fa';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
        if (user) {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleAddTask = async (newTask) => {
        const createdTask = await createTask(newTask);
        setTasks([...tasks, createdTask]);
    };

    const handleToggleCompleted = async (id) => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        await updateTask(id, updatedTask);
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    };

    return (
        <div className="task-list-container">
            <h1 className="task-list-title">My Task List</h1>
            <div className="add-task-container">
                <button
                    className="add-task-button"
                    onClick={() => setIsTaskModalOpen(true)}
                >
                    <FaPlus /> Add Task
                </button>
            </div>
            <div className="task-items">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
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
            {isTaskModalOpen && (
                <TaskModal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    onSave={handleAddTask}
                />
            )}
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        </div>
    );
};

export default TaskList;
