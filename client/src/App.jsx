import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BranchSales from './components/Branchsales';
import AddPage from './components/AddPage';
import Navbar from './components/NavBar'; // Navbar bileşenini içe aktar

const App = () => (
  <Router>
    <Navbar /> {/* Navbar'ı burada ekleyin */}
    <Routes>
      <Route path="/" element={<BranchSales />} />
      <Route path="/add" element={<AddPage />} />
      {/* Diğer rotalar */}
    </Routes>
  </Router>
);

export default App;
