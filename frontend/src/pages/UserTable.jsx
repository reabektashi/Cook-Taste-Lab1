import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/Css/table.css";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
    }
  };

  return (
    <>
      
      <div className="table">
        <div className="box-add">
          <Link to="/insert-user">
            <br />
            <button className="button-add">ADD USER</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone Number</th>
                <th>Birth Date</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.birthDate}</td>
                  <td>{user.role}</td>
                  <td>
                    <div>
                      <Link to={`/update-user/${user.id}`} className="button-update">Update</Link>
                      <button onClick={() => handleDelete(user.id)} className="button-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}