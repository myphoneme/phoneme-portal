import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { ImagePlus, Bold, Italic, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';
import styles from './CreateBlog.module.css';

const categories = [
  'Technology', 'Travel', 'Food', 'Lifestyle', 'Business',
  'Health', 'Education', 'Entertainment'
];

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: styles.image } }),
    ],
    content: '',
    editorProps: {
      attributes: { class: styles.editor },
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Blog Post</h1>
      <div className={styles.formGroup}>
        <div>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="Enter your blog title"
          />
        </div>

        <div>
          <label htmlFor="category" className={styles.label}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Toolbar */}
        <div>
           <label className={styles.toolbarButton}>
              <ImagePlus size={20} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
        <div className={styles.toolbar}>
          <div className={styles.toolbarButtons}>
            <button onClick={() => editor?.chain().focus().toggleBold().run()} className={styles.toolbarButton}><Bold size={20} /></button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={styles.toolbarButton}><Italic size={20} /></button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={styles.toolbarButton}><Heading1 size={20} /></button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={styles.toolbarButton}><Heading2 size={20} /></button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={styles.toolbarButton}><List size={20} /></button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={styles.toolbarButton}><ListOrdered size={20} /></button>
          </div>
          
           
        </div>

        {/* Editor Content */}
        <div className={styles.editorContainer}>
          {editor ? <EditorContent editor={editor} /> : <p>Loading editor...</p>}
        </div>

        {/* Submit Button */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.submitButton}
            onClick={() => console.log({ title, category, content: editor?.getHTML() })}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
