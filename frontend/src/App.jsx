import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Jobs from './pages/Jobs';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/jobs/edit/:id" element={<EditJob />} />
        <Route path="*" element={<Navigate to="/jobs" />} />
      </Routes>
    </Router>
  );
};

export default App;