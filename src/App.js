import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import SuccessScreen from './SuccessScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
      </Routes>
    </Router>
  );
}

export default App;


