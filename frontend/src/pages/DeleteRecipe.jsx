import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        alert('Recipe deleted');
        navigate('/recipetable');
      })
      .catch(err => {
        console.error('Failed to delete recipe:', err);
        alert('Error deleting recipe');
        navigate('/recipetable');
      });
  }, [id, navigate]);

  return <p>Deleting recipe...</p>;
}
