import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', 
});

// Fetch all categories
export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories/'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Re-throw the error for further handling if needed
    }
};

// Fetch a specific category by ID
export const fetchCategory = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};

// Create a new category
export const createCategory = async (category) => {
    console.log(category)
    try {
        const response = await api.post('/categories/', category);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Update an existing category
export const updateCategory = async (id, category) => {
    try {
        const response = await api.put(`/categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw error;
    }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
    try {
        await api.delete(`/categories/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};
