import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:2000/admin/reset-password/' + token, { password });
      alert(res.data.msg || 'Password reset successful');
      nav('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Enter your new password to continue</p>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Reset Password</button>
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
    background: 'linear-gradient(to right, #667eea, #764ba2)', // Forgot password jaise
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

// Optional hover/focus effects
styles.button[':hover'] = {
  backgroundColor: '#5a67d8',
};
styles.input[':focus'] = {
  borderColor: '#667eea',
  boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)',
};
