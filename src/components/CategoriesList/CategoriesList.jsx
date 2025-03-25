import React, { useState } from 'react';
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

// Initial categories data
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

function CategoriesList() {
  const [categories, setCategories] = useState(initialCategories);
  const [isGridView, setIsGridView] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false); // Control AddCategory modal

  // Handle Add New Category
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowAddCategory(false); // Close modal after adding
  };

  // Handle Edit Category
  const handleEdit = (id) => {
    alert(`Edit category: ${id}`);
  };

  // Handle Delete Category
  const handleDelete = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
    alert(`Category deleted successfully!`);
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
                aria-label={isGridView ? 'Switch to list view' : 'Switch to grid view'}
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
        <AddCategory onAdd={handleAddCategory} onClose={() => setShowAddCategory(false)} />
      )}

      {/* Main Content Section */}
      <main className={styles.main}>
        <div className={isGridView ? styles.grid : styles.list}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className={styles.card}>
                <div className={styles.imageContainer}>
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
                      onClick={() => handleEdit(category.id)}
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
      </main>
    </div>
  );
}

export default CategoriesList;
