import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Css/register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phoneNumber: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{8,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone must be 8-15 digits';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Registration successful:', formData);
      navigate('/login');
    }
  };

  return (
    <div className="register-page" style={{
      minHeight: '100vh',
      background: '#f6f6f6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="form-box" style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
            { label: "Birth Date", name: "birthDate", type: "date" },
            { label: "Phone Number", name: "phoneNumber" }
          ].map(({ label, name, type = "text" }, index) => (
            <div className="form-group" key={index} style={{ marginBottom: '15px' }}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}
              />
              <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors[name]}</div>
            </div>
          ))}

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
            <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>{errors.terms}</div>
          </div>

          <button type="submit" className="btn" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f8a41e',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>Register</button>

          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Already have an account? <Link to="/login" style={{ color: '#f8a41e' }}>Go back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
