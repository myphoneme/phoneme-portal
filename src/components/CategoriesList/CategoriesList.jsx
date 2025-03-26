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
import AddCategory from './AddCategory'; // Import AddCategory
import styles from './Categories.module.css';

// API base URL
const API_URL = 'http://fastapi.phoneme.in/categories';

// Initial categories data (displayed immediately)
const initialCategories = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Latest in tech, programming, and digital innovations',
    count: 42,
    icon: Code,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'literature',
    name: 'Literature',
    description: 'Book reviews, literary analysis, and writing tips',
    count: 28,
    icon: BookOpen,
    image:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Photography techniques, gear reviews, and stunning shots',
    count: 35,
    icon: Camera,
    image:
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Music reviews, artist spotlights, and industry news',
    count: 31,
    icon: Music,
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'art',
    name: 'Art & Design',
    description: 'Visual arts, design trends, and creative inspiration',
    count: 24,
    icon: Palette,
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    description: 'Recipes, cooking tips, and culinary adventures',
    count: 38,
    icon: Utensils,
    image:
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1600',
  },
];

// Icon mapping for dynamic assignment
const iconMapping = {
  technology: Code,
  literature: BookOpen,
  photography: Camera,
  music: Music,
  art: Palette,
  food: Utensils,
};

function CategoriesList() {
  const [categories, setCategories] = useState(initialCategories); // Initial categories load immediately
  const [isGridView, setIsGridView] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Fetch categories from FastAPI
  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch categories');

      const data = await response.json();

      // Only replace initialCategories if API returns valid data
      if (data && data.length > 0) {
        const formattedData = data.map((cat) => ({
          ...cat,
          icon: iconMapping[cat.id] || BookOpen, // Default icon fallback
        }));
        setCategories(formattedData);
      } else {
        console.warn('API returned empty or invalid categories. Keeping initial categories.');
      }
    } catch (error) {
      console.error('Error fetching categories, using initial categories:', error);
      // Keep initialCategories in case of error
    }
  };

  // Load categories from API after initial render
  useEffect(() => {
    fetchCategories(); // Fetch categories from API after initial categories load
  }, []);

  // Handle Add New Category
  const handleAddCategory = async (newCategory) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) throw new Error('Failed to add category');
      await fetchCategories(); // Refresh categories after adding
      setShowAddCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Handle Edit Category
  const handleEdit = async (id, updatedCategory) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      });
      if (!response.ok) throw new Error('Failed to update category');
      await fetchCategories(); // Refresh after edit
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  // Handle Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete category');
      await fetchCategories(); // Refresh after delete
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerRow}>
            <h1 className={styles.headerTitle}>Blog Categories</h1>
            <div className={styles.headerActions}>
              <button
                className={styles.addButton}
                onClick={() => setShowAddCategory(true)}
              >
                <Plus className={styles.buttonIcon} />
                Add Category
              </button>
              <button
                className={styles.viewToggle}
                onClick={() => setIsGridView(!isGridView)}
                aria-label={
                  isGridView ? 'Switch to list view' : 'Switch to grid view'
                }
              >
                {isGridView ? (
                  <List className={styles.buttonIcon} />
                ) : (
                  <LayoutGrid className={styles.buttonIcon} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AddCategory
              onAdd={handleAddCategory}
              onClose={() => setShowAddCategory(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className={`${styles.main} ${showAddCategory ? styles.modalBlur : ''}`}>
        <div className={isGridView ? styles.grid : styles.list}>
          {initialCategories.map((category) => {
            const Icon = category.icon || BookOpen;
            console.log(category.image);
            return (
              <div key={category.id} className={styles.card}>
                <div className={styles.imageContainer}>
                {/* src="http://fastapi.phoneme.in/static/images/07.jpg" */}
                  <img
                    src={category.image}  
                    alt={category.name}
                    className={styles.image}
                  />
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
                      onClick={() =>
                        handleEdit(category.id, {
                          name: category.name,
                          description: category.description,
                          count: category.count,
                        })
                      }
                      className={styles.actionButton}
                      aria-label={`Edit ${category.name}`}
                    >
                      <Edit className={styles.actionIcon} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      aria-label={`Delete ${category.name}`}
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
