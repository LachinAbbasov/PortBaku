import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Stil dosyasını eklemeyi unutmayın

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Branch Sales</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;