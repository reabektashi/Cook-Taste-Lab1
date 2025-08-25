import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/Css/table.css";

export default function RecipeTable() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      fetch(`/api/recipes/${id}`, { method: 'DELETE' })
        .then(() => setRecipes(prev => prev.filter(r => r.id !== id)))
        .catch(err => console.error('Error deleting recipe:', err));
    }
  };

  return (
    <div className="table">
      <div className="box-add">
        <Link to="/insert-recipe">
          <br />
          <button className="button-add">ADD RECIPE</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Steps</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td>{recipe.description}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.steps}</td>
                <td>
                  {recipe.image ? (
                    <img
                      src={`http://localhost:5000/${recipe.image}`}
                      alt="recipe"
                      style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <Link to={`/update-recipe/${recipe.id}`} className="button-update">Update</Link>
                  <button onClick={() => handleDelete(recipe.id)} className="button-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
