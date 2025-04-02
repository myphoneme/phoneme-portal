import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateBlog.module.css';

const CreateBlog = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormdata] = useState({
    category: '',
    title: '',
    body: '',
    image: null, 
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://fastapi.phoneme.in/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
     
      if (id) {
        fetch(`http://fastapi.phoneme.in/posts/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setFormdata({
              category: data.category.id.toString(),
              title: data.title,
              body: data.post,
              image: null,
            });
          })
          .catch((error) => console.error('Error fetching blog data:', error));
      }
  }, [id]);


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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.body) {
      alert('Please fill in all required fields.');
      return;
    }

    const data = new FormData();
    console.log('formdata:', formData);

    if (id) {
      data.append('id', parseInt(id, 10));
    }

    data.append('category_id', parseInt(formData.category, 10));
    data.append('title', formData.title);
    data.append('post', formData.body);
    data.append('created_by', 53);

    if (formData.image) {
      data.append('image', formData.image);
    } else if (!id) {
      alert('Please upload an image.');
      return;
    }

    console.log('Sending FormData:', [...data.entries()]);

    try {
      const url = id
        ? `http://fastapi.phoneme.in/posts/${id}`
        : 'http://fastapi.phoneme.in/posts';

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating/updating blog:', errorData);
        alert(errorData.detail || 'Failed to create/update blog');
      } else {
        console.log('Blog submitted successfully!');
        alert('Blog submitted successfully!');
        navigate('/list');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.heading}>Create a New Blog</h1> */}
      <h1 className={styles.heading}>{id ? 'Edit Blog' : 'Create a New Blog'}</h1>
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

        <button type="submit" className={styles.submitButton}>
          {id ? 'Update Blog' : 'Submit'}
        </button>

      </form>
    </div>
  );
};

export default CreateBlog;
