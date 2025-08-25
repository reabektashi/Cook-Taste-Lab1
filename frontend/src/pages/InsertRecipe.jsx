import { useState } from 'react';
import "../assets/Css/form.css";

export default function InsertRecipe() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    ingredients: '',
    steps: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.image) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("ingredients", form.ingredients);
    formData.append("steps", form.steps);
    formData.append("image", form.image);

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });

      const contentType = res.headers.get("content-type") || "";
      let data = {};

      if (contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Recipe added successfully!");
      setForm({
        name: '',
        description: '',
        ingredients: '',
        steps: '',
        image: null
      });

      document.querySelector('input[type="file"]').value = "";

    } catch (err) {
      setError("Failed to insert recipe: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Add a Recipe</h1>

          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}

          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients (comma-separated)"
                value={form.ingredients}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="steps"
                placeholder="Steps"
                value={form.steps}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn" style={{ backgroundColor: '#ff9800', color: 'white' }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
