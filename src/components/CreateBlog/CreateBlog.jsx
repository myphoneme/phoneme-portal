import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import styles from './CreateBlog.module.css';

const CreateBlog = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormdata] = useState({
    category: '',
    title: '',
    body: '',
    image: null, 
  });

  const handleChange = (e) => {
    if (typeof e === 'string') {
      setFormdata((prev) => ({ ...prev, body: e }));
    } else {
      const { name, value } = e.target;
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormdata((prev) => ({ ...prev, image: file }));
  };

  useEffect(() => {
    fetch('http://fastapi.phoneme.in/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log('formdata:', formData);

    data.append('category_id', parseInt(formData.category, 10));
    data.append('title', formData.title);
    data.append('post', formData.body);
    data.append('created_by', 1);

    if (formData.image) {
      data.append('image', formData.image);
    }

    console.log('Sending FormData:', [...data.entries()]);

    try {
      const response = await fetch('http://fastapi.phoneme.in/posts', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating blog:', errorData);
      } else {
        console.log('Blog created successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a New Blog</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Title:</label>
        <input
          type="text"
          name='title'
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter Blog Title"
          required
        />

        <label className={styles.label}>Category:</label>
        <select
          name='category'
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.category_name}</option>
          ))}
        </select>

        <label className={styles.label}>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />

        <label className={styles.label}>Content:</label>
        <Editor
          apiKey="udbl2vt3syyp9hwrtvtuuky6he9qixn2nqevk4vnqdzzlmbx"
          value={formData.body}
          onEditorChange={(content) => handleChange(content)}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar: 'undo redo | formatselect | ' +
                     'bold italic backcolor | alignleft aligncenter ' +
                     'alignright alignjustify | bullist numlist outdent indent | ' +
                     'removeformat | image | help',
            image_upload_url: '/upload',
          }}
        />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
