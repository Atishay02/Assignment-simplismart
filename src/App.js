import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ModelSpacePage from './components/ModelSpacePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model-spaces/:id" element={<ModelSpacePage />} />
      </Routes>
    </Router>
  );
};

export default App;
