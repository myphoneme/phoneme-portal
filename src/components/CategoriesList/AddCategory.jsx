import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './AddCategory.module.css';

const AddCategory = ({ onAdd, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!categoryName || !categoryDescription) {
      setError('All fields are required!');
      return;
    }

    const newCategory = {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      description: categoryDescription,
      count: 0,
      icon: Plus,
      image: categoryImage || 'https://via.placeholder.com/300',
    };

    onAdd(newCategory);
    setCategoryName('');
    setCategoryDescription('');
    setCategoryImage('');
    setError('');
    alert(`Category "${categoryName}" added successfully!`);
    onClose(); // Close modal after adding
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Category</h2>
      {error && <p className={styles.error}>{error}</p>}

      {/* Category Name Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className={styles.input}
          placeholder="Enter category name"
        />
      </div>

      {/* Description Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter category description"
        />
      </div>

      {/* Image URL Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Image URL (optional)</label>
        <input
          type="text"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
          className={styles.input}
          placeholder="Enter image URL"
        />
      </div>

      {/* Add & Cancel Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={handleAddCategory} className={styles.addButton}>
          <Plus className={styles.icon} />
          Add Category
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
