import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('twitter_token', token);
      navigate('/chat');
    } else {
      // Optional: Redirect if no token present
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Login Successful!</h2>
      <p>You are now logged in with Twitter.</p>
    </div>
  );
}
