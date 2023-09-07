import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Feedback from './Feedback';
import Recommendation from './Recommendation';
import { UserProvider } from './UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
