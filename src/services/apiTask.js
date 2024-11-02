import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', 
});

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const response = await api.get('/tasks/'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Re-throw the error for further handling if needed
    }
};

// Fetch a specific task by ID
export const fetchTask = async (id) => {
    try {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with ID ${id}:`, error);
        throw error;
    }
};

// Create a new task
export const createTask = async (task) => {
    try {
        const response = await api.post('/tasks/', task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update an existing task
export const updateTask = async (id, task) => {
    try {
        const response = await api.put(`/tasks/${id}`, task);
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
        throw error;
    }
};

// Delete a task by ID
export const deleteTask = async (id) => {
    try {
        await api.delete(`/tasks/${id}`);
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw error;
    }
};
