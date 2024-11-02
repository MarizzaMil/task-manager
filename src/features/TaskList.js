import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, createTask } from '../services/apiTask';
import { fetchCategories } from '../services/apiCategory'; 
import TaskItem from '../components/TaskItem/TaskItem';
import { useAuth } from '../context/AuthContext';
import TaskModal from '../components/TaskModal/TaskModal';
import AuthModal from '../components/AuthModal/AuthModal';
import './TaskList.css';
import { FaPlus } from 'react-icons/fa';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [currentTask, setCurrentTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasksResponse = await fetchTasks();
                const categoriesResponse = await fetchCategories();
        
                const categoryMap = Object.fromEntries(
                    categoriesResponse.map(category => [category.id, category])
                );
                console.log("categoryMap:", categoryMap);
        
                const tasksWithCategoryNames = tasksResponse.map(task => {
                    const category = task.category ? categoryMap[task.category.id] : null;
        
                    console.log("category:", category);
        
                    return {
                        ...task,
                        category: category ? category : null 
                    };
                });
        
                console.log("tasksWithCategoryNames:", tasksWithCategoryNames);
                setTasks(tasksWithCategoryNames);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                const categoryNames = response.map(category => category.name); 
                setCategories(categoryNames);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        getTasks();
        getCategories(); 
    }, []);

    const handleDelete = async (id) => {
        if (user) {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleSaveTask = async (task) => {
        if (user) {
            if (task.id) {
                await updateTask(task.id, task);
                setTasks(tasks.map(t => (t.id === task.id ? task : t)));
            } else {
                const createdTask = await createTask(task);
                setTasks([...tasks, createdTask]);
            }
            setIsTaskModalOpen(false);
            setCurrentTask(null); 
        }
    };

    const openAddModal = () => {
        if (user) {
            setCurrentTask({ title: '', description: '' });
            setIsTaskModalOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const openEditModal = (task) => {
        if (user) {
            setCurrentTask(task);
            setIsTaskModalOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const todoTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="task-list-container">
            <h1 className="task-list-title">My Task List</h1>
            <div className="add-task-container">
                <button className="add-task-button" onClick={openAddModal}>
                    <FaPlus />  ADD TASK
                </button>
            </div>
            <div className="task-columns">
                <div className="task-column">
                    <h2>ToDo</h2>
                    {todoTasks.length > 0 ? (
                        todoTasks.map(task => (
                            <TaskItem
                                key={task.id} 
                                task={task} 
                                onDelete={handleDelete} 
                                onEdit={() => openEditModal(task)} 
                                onToggleCompleted={async (id) => {
                                    const updatedTask = { ...task, completed: !task.completed };
                                    await updateTask(id, updatedTask);
                                    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
                                }}
                                categories={categories} 
                            />
                        ))
                    ) : (
                        <p className="no-tasks-message">No tasks to do!</p>
                    )}
                </div>
                
                <div className="task-column">
                    <h2>Completed</h2>
                    {completedTasks.length > 0 ? (
                        completedTasks.map(task => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onDelete={handleDelete} 
                                onEdit={() => openEditModal(task)} 
                                onToggleCompleted={async (id) => {
                                    const updatedTask = { ...task, completed: !task.completed };
                                    await updateTask(id, updatedTask);
                                    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
                                }}
                                categories={categories} 
                            />
                        ))
                    ) : (
                        <p className="no-tasks-message">No completed tasks!</p>
                    )}
                </div>
            </div>
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
            {isTaskModalOpen && (
                <TaskModal
                    task={currentTask}
                    onSave={handleSaveTask}
                    onClose={() => setIsTaskModalOpen(false)}
                    categories={categories} 
                />
            )}
        </div>
    );
};

export default TaskList;
