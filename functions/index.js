const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const { generateChallenge } = require('pkce-challenge');

const app = express();

// CORS for frontend hosted on Firebase Hosting
app.use(cors({
  origin: 'https://chatbot-1440a.web.app',
  credentials: true,
}));

app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
}));

// Use Firebase functions config for secrets
const CLIENT_ID = functions.config().twitter.client_id;
const CLIENT_SECRET = functions.config().twitter.client_secret;
const REDIRECT_URI = functions.config().twitter.redirect_uri;

app.get('/auth/twitter', (req, res) => {
  const { code_challenge, code_verifier } = generateChallenge();
  req.session.code_verifier = code_verifier;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'tweet.read users.read offline.access',
    state: 'state',
    code_challenge,
    code_challenge_method: 'S256',
  });

  res.redirect(`https://twitter.com/i/oauth2/authorize?${params.toString()}`);
});

app.get('/auth/twitter/callback', async (req, res) => {
  const { code } = req.query;
  const code_verifier = req.session.code_verifier;

  try {
    const tokenResponse = await axios.post('https://api.twitter.com/2/oauth2/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        },
      });

    const { access_token } = tokenResponse.data;
    res.redirect(`https://chatbot-1440a.web.app/success?token=${access_token}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Login failed');
  }
});

// Export it as a Firebase Function
exports.api = functions.https.onRequest(app);
