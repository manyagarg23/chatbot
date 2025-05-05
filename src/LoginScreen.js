import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function LoginScreen() {
  const [message, setMessage] = useState('');

  const handleTwitterLogin = () => {
    window.location.href = 'http://localhost:4000/auth/twitter';
  };


  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <button onClick={handleTwitterLogin}>Login with Twitter</button>
      <p>{message}</p>
    </div>
  );
}
