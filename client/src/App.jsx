import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BranchSales from './components/Branchsales';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BranchSales />} />
      {/* Diğer rotalar */}
    </Routes>
  </Router>
);

export default App;
