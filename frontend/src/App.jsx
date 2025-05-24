import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Jobs from './pages/Jobs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*" element={<Navigate to="/jobs" />} />
      </Routes>
    </Router>
  );
};

export default App;