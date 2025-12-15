import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const nav = useNavigate();
  const [btnHover, setBtnHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://ims-backend-p5hr.onrender.com/admin/reset-password/' + token,
        { password }
      );
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
          style={{
            ...styles.input,
            borderColor: inputFocus ? '#667eea' : '#ccc',
            boxShadow: inputFocus ? '0 0 5px rgba(102, 126, 234, 0.5)' : 'none'
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: btnHover ? '#5a67d8' : '#667eea'
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px', // responsive padding for small screens
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: 'border-box'
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
    fontSize: 'clamp(20px, 4vw, 28px)', // responsive font
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: 'clamp(12px, 2.5vw, 16px)',
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
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
};
