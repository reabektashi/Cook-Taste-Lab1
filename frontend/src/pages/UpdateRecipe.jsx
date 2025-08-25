import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/Css/form.css";

export default function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    ingredients: '',
    steps: '',
    image: ''
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  // Fetch existing recipe data
  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch recipe");
        return res.json();
      })
      .then(data => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          ingredients: data.ingredients || '',
          steps: data.steps || '',
          image: data.image || ''
        });
      })
      .catch(() => setError('Failed to fetch recipe'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setFile(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('ingredients', form.ingredients);
    formData.append('steps', form.steps);
    if (file) {
      formData.append('image', file);
    }

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
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
        throw new Error(data.message || 'Something went wrong');
      }

      alert('Recipe updated successfully');
      navigate('/recipetable');
    } catch (err) {
      console.error("Update failed:", err.message);
      setError('Failed to update recipe: ' + err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Update Recipe</h1>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

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
                rows="4"
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
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleChange}
              />
              {form.image && (
                <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>
                  Current image: {form.image}
                </div>
              )}
            </div>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn" style={{ backgroundColor: '#ff9800', color: 'white' }}>
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate('/recipetable')}
              className="btn"
              style={{ backgroundColor: '#ff9800', color: 'white' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
