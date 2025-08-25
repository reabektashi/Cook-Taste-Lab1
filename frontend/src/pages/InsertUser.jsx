import { useState } from 'react';
import "../assets/Css/form.css";


export default function InsertUser() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phoneNumber: '', birthDate: '', role: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/.test(form.firstName)) newErrors.firstName = 'Invalid first name';
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/.test(form.lastName)) newErrors.lastName = 'Invalid last name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (form.password.length < 8 || form.password.length > 20) newErrors.password = 'Password must be between 8 and 20 characters';
    if (!/^\d{9}$/.test(form.phoneNumber)) newErrors.phoneNumber = 'Phone number must be exactly 9 digits';
    if (!form.birthDate) newErrors.birthDate = 'Birth date required';
    if (!form.role) newErrors.role = 'Role required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return setErrors(validationErrors);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) alert('User inserted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      
      <div className="container">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h1>Add a User</h1>
            <div className="input-group">
              <div className="input-group-left">
                <div className="input-field left">
                  <input type="text" placeholder="First Name" value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })} />
                  <div className="error-message">{errors.firstName}</div>
                </div>
                <div className="input-field left">
                  <input type="text" placeholder="Last Name" value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })} />
                  <div className="error-message">{errors.lastName}</div>
                </div>
                <div className="input-field left">
                  <input type="text" placeholder="Email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                  <div className="error-message">{errors.email}</div>
                </div>
                <div className="input-field left">
                  <input type="password" placeholder="Password" value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })} />
                  <div className="error-message">{errors.password}</div>
                </div>
              </div>

              <div className="input-group-right">
                <div className="input-field right">
                  <input type="text" placeholder="Phone Number" value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })} />
                  <div className="error-message">{errors.phoneNumber}</div>
                </div>
                <div className="input-field right">
                  <input type="date" placeholder="Birth Date" value={form.birthDate}
                    onChange={e => setForm({ ...form, birthDate: e.target.value })} />
                  <div className="error-message">{errors.birthDate}</div>
                </div>
                <div className="input-field right">
                  <input type="text" placeholder="Role" value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })} />
                  <div className="error-message">{errors.role}</div>
                </div>
              </div>
            </div>
            <div className="btn-group">
              <button type="submit" className="btn" style={{ backgroundColor: '#ff9800', color: 'white' }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
