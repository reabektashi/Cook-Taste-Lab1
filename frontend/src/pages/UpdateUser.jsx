import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/Css/form.css";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phoneNumber: '', birthDate: '', role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user by ID
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(data => setForm(data))
      .catch(() => setError('Failed to fetch user'));
  }, [id]);

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Corrected handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
      }

      setSuccess('User updated successfully');
      navigate('/usertable');
    } catch (err) {
      console.error(err.message);
      setError('Failed to update user: ' + err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1>Update User</h1>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}

          <div className="input-group">
            <div className="input-group-left">
              <div className="input-field left">
                <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="input-field left">
                <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
              </div>
              <div className="input-field left">
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="input-field left">
                <input type="password" name="password" placeholder="Password (leave blank to keep current)" value={form.password} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group-right">
              <div className="input-field right">
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
              </div>
              <div className="input-field right">
                <input type="date" name="birthDate" placeholder="Birth Date" value={form.birthDate} onChange={handleChange} />
              </div>
              <div className="input-field right">
                <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn" style={{ backgroundColor: '#ff9800', color: 'white' }}>
              Update
            </button>
            <button type="button" onClick={() => navigate('/usertable')} className="btn" style={{ backgroundColor: '#ff9800', color: 'white' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
