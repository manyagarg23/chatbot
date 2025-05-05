// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import SuccessScreen from './SuccessScreen';
import ChatScreen from './ChatScreen'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/chat" element={<ChatScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;
