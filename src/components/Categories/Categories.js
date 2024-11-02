import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/apiCategory';
import { useAuth } from '../../context/AuthContext';
import './Categories.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Categories = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        loadCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory) return;
        try {
            const createdCategory = await createCategory({ name: newCategory });
            setCategories([...categories, createdCategory]);
            setNewCategory('');
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    const handleEditCategory = async (id) => {
        if (!editingCategoryName) return;
        try {
            const updatedCategory = await updateCategory(id, { name: editingCategoryName });
            setCategories(categories.map(cat => (cat.id === id ? updatedCategory : cat)));
            setEditingCategory(null);
            setEditingCategoryName('');
        } catch (error) {
            console.error('Failed to edit category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    return (
        <div >
            <h2>Categories</h2>
            {categories.length === 0 ? (
                <p>No categories available. Add some!</p>
            ) : (
                <ul className="categories-list">
                    {categories.map(category => (
                        <li key={category.id} className="category-item">
                            {editingCategory === category.id ? (
                                <div className="editing-area">
                                    <input
                                        type="text"
                                        value={editingCategoryName}
                                        onChange={(e) => setEditingCategoryName(e.target.value)}
                                        placeholder="Edit category name"
                                        className="category-input"
                                    />
                                    <button className="btn btn-save" onClick={() => handleEditCategory(category.id)}>Save</button>
                                    <button className="btn btn-cancel" onClick={() => setEditingCategory(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="category-content">
                                    <span className="category-name">{category.name}</span>
                                    {user && (
                                        <div className="action-buttons">
                                            <button className="edit-task-button" onClick={() => { setEditingCategory(category.id); setEditingCategoryName(category.name); }}>
                                            <FaEdit />
                                            </button>
                                            <button className="edit-task-button" onClick={() => handleDeleteCategory(category.id)}>
                                            <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {user && (
                <div className="add-category">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category"
                        className="category-input"
                    />
                    <button className="btn btn-add" onClick={handleAddCategory}>Add Category</button>
                </div>
            )}
        </div>
    );
};

export default Categories;
