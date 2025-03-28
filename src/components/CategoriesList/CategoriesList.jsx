import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code,
  Camera,
  Music,
  Palette,
  Utensils,
  Plus,
  LayoutGrid,
  List,
  Edit,
  Trash2,
} from 'lucide-react';
import { Modal, Button } from 'react-bootstrap';
import AddCategory from './AddCategory';
import styles from './Categories.module.css';

// Icon mapping for dynamic assignment
const iconMapping = {
  technology: Code,
  literature: BookOpen,
  photography: Camera,
  music: Music,
  art: Palette,
  food: Utensils,
  fashion: Palette,
  default: BookOpen,
};

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Fetch categories from FastAPI
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://fastapi.phoneme.in/categories');
      if (!response.ok) {
        throw new Error('Error fetching categories');
      }
      const data = await response.json();
      const formattedData = data.map((cat) => ({
        id: cat.id,
        name: cat.category_name,
        description: `Explore posts related to ${cat.category_name}`,
        count: Math.floor(Math.random() * 50) + 1,
        icon: iconMapping[cat.category_name.toLowerCase()] || iconMapping.default,
        // image: "https://don16obqbay2c.cloudfront.net/wp-content/uploads/Storefront_Images_C-1481632060.png",
        image : "https://www.jaggaer.com/wp-content/uploads/2024/06/Category-intelligence-product.jpg",
      }));
      setCategories(formattedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or Edit Category
  const handleSaveCategory = async (category) => {
    const url = category.id
      ? `http://fastapi.phoneme.in/categories/${category.id}`
      : 'http://fastapi.phoneme.in/categories';

    const method = category.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_name: category.name,
        }),
      });

      if (response.ok) {
        alert(
          `Category "${category.name}" ${
            category.id ? 'updated' : 'added'
          } successfully!`
        );
        fetchCategories(); // Refresh categories
      } else {
        console.error(`Failed to ${category.id ? 'update' : 'add'} category`);
      }
    } catch (error) {
      console.error(`Error ${category.id ? 'updating' : 'adding'} category:`, error);
    }

    setShowModal(false);
    setCategoryToEdit(null);
  };

  // Delete Category
  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://fastapi.phoneme.in/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Category deleted successfully!');
        fetchCategories();
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Blog Categories</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.addButton}
              onClick={() => {
                setCategoryToEdit(null);
                setShowModal(true);
              }}
            >
              <Plus className={styles.buttonIcon} />
              Add Category
            </button>
            <button
              className={styles.viewToggle}
              onClick={() => setIsGridView(!isGridView)}
              aria-label={isGridView ? 'Switch to list view' : 'Switch to grid view'}
            >
              {isGridView ? <List className={styles.buttonIcon} /> : <LayoutGrid className={styles.buttonIcon} />}
            </button>
          </div>
        </div>
      </header>

      {/* Modal Wrapper */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{categoryToEdit ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCategory
            onSave={handleSaveCategory}
            onClose={() => setShowModal(false)}
            categoryToEdit={categoryToEdit}
          />
        </Modal.Body>
      </Modal>

      <div className={`${styles.main}`}>
        <div className={isGridView ? styles.grid : styles.list}>
          {categories.map((category) => {
            const Icon = category.icon || BookOpen;
            return (
              <div key={category.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={category.image} alt={category.name} className={styles.image} />
                  <div className={styles.gradient} />
                </div>

                <div className={styles.iconContainer}>
                  <Icon className={styles.icon} />
                </div>

                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <h2 className={styles.title}>{category.name}</h2>
                    <span className={styles.count}>{category.count} posts</span>
                  </div>
                  <p className={styles.description}>{category.description}</p>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => {
                        setCategoryToEdit(category);
                        setShowModal(true);
                      }}
                    >
                      <Edit className={styles.actionIcon} />
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className={styles.actionIcon} />
                      Delete
                    </button>
                  </div>
                </div>

                <a
                  href={`/category/${category.id}`}
                  className={styles.link}
                  aria-label={`View ${category.name} category`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesList;
