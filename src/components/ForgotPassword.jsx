import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ims-backend-p5hr.onrender.com/admin/forgot-password', { email });
      alert(res.data.msg || 'Check response');
      if (res.data.resetURL) alert('Dev reset URL: ' + res.data.resetURL);
    } catch (err) {
      alert('Error');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a password reset link</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Reset Link</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: '0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#667eea',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

// Optional: Add hover effect
styles.button[':hover'] = {
  backgroundColor: '#5a67d8',
};
styles.input[':focus'] = {
  borderColor: '#667eea',
  boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)',
};
