import React, { useState } from 'react';
import './dashboard.css'
const SignInForm = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and sign-in logic here.
    onSignIn(formData);
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className='row'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt3'>
          <label className='label-m'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mt3'>
          <label className='label-m'>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='mt3'>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
