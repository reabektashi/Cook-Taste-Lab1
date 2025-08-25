import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        alert('User deleted');
        navigate('/usertable');
      })
      .catch(err => {
        console.error('Failed to delete user:', err);
        alert('Error deleting user');
        navigate('/usertable');
      });
  }, [id, navigate]);

  return <p>Deleting user...</p>;
}
