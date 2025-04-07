import React, { useContext, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CreateBlog.module.css';
import { globalContext } from '../Context';
import { FlashMessage } from '../../FlashMessage';

const CreateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useContext(globalContext);

  const [categories, setCategories] = useState([]);
  const [flash, setFlash] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    body: '',
    image: null,
  });

  useEffect(() => {
    fetch('http://fastapi.phoneme.in/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setFlash({ message: "Failed to load categories", type: "error" });
      });

    if (id) {
      fetch(`http://fastapi.phoneme.in/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            category: data.category.id.toString(),
            title: data.title,
            body: data.post,
            image: null,
          });
        })
        .catch((error) => {
          console.error('Error fetching blog data:', error);
          setFlash({ message: "Failed to load blog data", type: "error" });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    if (typeof e === 'string') {
      setFormData((prev) => ({ ...prev, body: e }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.body) {
      setFlash({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    const data = new FormData();
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
      setFlash({ message: "Please upload an image", type: "error" });
      return;
    }

    try {
      const url = id ? `http://fastapi.phoneme.in/posts/${id}` : 'http://fastapi.phoneme.in/posts';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: data });

      if (!response.ok) {
        const errorData = await response.json();
        setFlash({ message: errorData.detail || "Failed to create/update blog", type: "error" });
      } else {
        setFlash({ message: id ? "Blog updated successfully!" : "Blog created successfully!", type: id ? "update" : "add" });
        setTimeout(() => navigate('/list'), 3000);
      }
    } catch (error) {
      setFlash({ message: "An error occurred. Please try again", type: "error" });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const response = await fetch(`http://fastapi.phoneme.in/posts/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        setFlash({ message: errorData.detail || "Failed to delete blog", type: "error" });
      } else {
        setFlash({ message: "Blog deleted successfully!", type: "delete" });
        setTimeout(() => navigate('/list'), 3000);
      }
    } catch (error) {
      setFlash({ message: "An error occurred while deleting", type: "error" });
    }
  };

  return (
    <div className={mode === 'light' ? "bg-light text-dark" : "bg-dark text-light"}>
      <div className={styles.container}>
        <FlashMessage message={flash.message} type={flash.type} onClose={() => setFlash({ message: "", type: "" })} />
        <h1 className={styles.heading}>{id ? 'Edit Blog' : 'Create a New Blog'}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={styles.input} placeholder="Enter Blog Title" required />

          <label className={styles.label}>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} className={styles.select} required>
            <option value="">Select Category</option>
            {categories.map((category) => (<option key={category.id} value={category.id}>{category.category_name}</option>))}
          </select>

          <label className={styles.label}>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />

          <label className={styles.label}>Content:</label>
          <Editor
  apiKey="udbl2vt3syyp9hwrtvtuuky6he9qixn2nqevk4vnqdzzlmbx"
  value={formData.body}
  onEditorChange={handleChange}
  init={{
    height: 400,
    menubar: true,
    skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
    content_css: mode === 'dark' ? 'dark' : 'default',
    toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
    content_style: `
      body {
        background-color: ${mode === 'dark' ? '#1e1e1e' : '#ffffff'};
        color: ${mode === 'dark' ? '#f5f5f5' : '#000000'};
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        padding: 15px;
      }
    `,
  }}
/>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>{id ? 'Update Blog' : 'Create Blog'}</button>
            {id && <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete Blog</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;




// import React, { useEffect, useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FlashMessage } from '../../FlashMessage';
// import styles from './CreateBlog.module.css';


// const CreateBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [flash, setFlash] = useState({ message: "", type: "" });
//   const [formData, setFormData] = useState({
//     category: '',
//     title: '',
//     body: '',
//     image: null,
//   });

//   useEffect(() => {
//     fetch('http://fastapi.phoneme.in/categories')
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//         setFlash({ message: "Failed to load categories", type: "error" });
//       });

//     if (id) {
//       fetch(`http://fastapi.phoneme.in/posts/${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setFormData({
//             category: data.category.id.toString(),
//             title: data.title,
//             body: data.post,
//             image: null,
//           });
//         })
//         .catch((error) => {
//           console.error('Error fetching blog data:', error);
//           setFlash({ message: "Failed to load blog data", type: "error" });
//         });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     if (typeof e === 'string') {
//       setFormData((prev) => ({ ...prev, body: e }));
//     } else {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, image: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.category || !formData.title || !formData.body) {
//       setFlash({ message: "Please fill in all required fields", type: "error" });
//       return;
//     }

//     const data = new FormData();

//     if (id) {
//       data.append('id', parseInt(id, 10));
//     }

//     data.append('category_id', parseInt(formData.category, 10));
//     data.append('title', formData.title);
//     data.append('post', formData.body);
//     data.append('created_by', 53);

//     if (formData.image) {
//       data.append('image', formData.image);
//     } else if (!id) {
//       setFlash({ message: "Please upload an image", type: "error" });
//       return;
//     }

//     try {
//       const url = id
//         ? `http://fastapi.phoneme.in/posts/${id}`
//         : 'http://fastapi.phoneme.in/posts';

//       const method = id ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error creating/updating blog:', errorData);
//         setFlash({ 
//           message: errorData.detail || "Failed to create/update blog", 
//           type: "error" 
//         });
//       } else {
//         if (id) {
//           setFlash({ message: "Blog updated successfully!", type: "update" });
//         } else {
//           setFlash({ message: "Blog created successfully!", type: "add" });
//         }

//         // Redirect after the flash message is shown
//         setTimeout(() => {
//           navigate('/list');
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setFlash({ 
//         message: "An error occurred. Please try again", 
//         type: "error" 
//       });
//     }
//   };

//   const handleDelete = async () => {
//     if (!id) return;

//     try {
//       const response = await fetch(`http://fastapi.phoneme.in/posts/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setFlash({ 
//           message: errorData.detail || "Failed to delete blog", 
//           type: "error" 
//         });
//       } else {
//         setFlash({ message: "Blog deleted successfully!", type: "delete" });
//         setTimeout(() => {
//           navigate('/list');
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       setFlash({ 
//         message: "An error occurred while deleting", 
//         type: "error" 
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <FlashMessage 
//         message={flash.message} 
//         type={flash.type} 
//         onClose={() => setFlash({ message: "", type: "" })} 
//       />

//       <h1 className={styles.heading}>{id ? 'Edit Blog' : 'Create a New Blog'}</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <label className={styles.label}>Title:</label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder="Enter Blog Title"
//           required
//         />

//         <label className={styles.label}>Category:</label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className={styles.select}
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.category_name}
//             </option>
//           ))}
//         </select>

//         <label className={styles.label}>Upload Image:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={styles.fileInput}
//         />

//         <label className={styles.label}>Content:</label>
//         <Editor
//           apiKey="udbl2vt3syyp9hwrtvtuuky6he9qixn2nqevk4vnqdzzlmbx"
//           value={formData.body}
//           onEditorChange={(content) => handleChange(content)}
//           init={{
//             height: 400,
//             menubar: true,
//             plugins: [
//               'advlist autolink lists link image charmap print preview anchor',
//               'searchreplace visualblocks code fullscreen',
//               'insertdatetime media table paste code help wordcount',
//             ],
//             toolbar: 'undo redo | formatselect | ' +
//                      'bold italic backcolor | alignleft aligncenter ' +
//                      'alignright alignjustify | bullist numlist outdent indent | ' +
//                      'removeformat | image | help',
//             image_upload_url: '/upload',
//           }}
//         />

//         <div className={styles.buttonGroup}>
//           <button type="submit" className={styles.submitButton}>
//             {id ? 'Update Blog' : 'Create Blog'}
//           </button>
//           {id && (
//             <button
//               type="button"
//               onClick={handleDelete}
//               className={styles.deleteButton}
//             >
//               Delete Blog
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;


