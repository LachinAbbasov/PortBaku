import React from 'react';
import { Link } from 'react-router-dom';
import '../Sass/DNavbar.scss';

const DNavbar = () => (
  <nav className="navbar">
    <ul className="navbar__list">
    
      <li className="navbar__item"><Link to="/mayalilarimg">Mayalı Məhsullar</Link></li>
      <li className="navbar__item"><Link to="/tortimg">Tortlar</Link></li>
      <li className="navbar__item"><Link to="/paxlavalarimg">Paxlavalar</Link></li>
      <li className="navbar__item"><Link to="/qurumallarimg">Quru Mallar</Link></li>
      <li className="navbar__item"><Link to="/kulinariaimg">Kulinariya</Link></li>
      <li className="navbar__item"><Link to="/salatlarimg">Salatlar</Link></li>
      <li className="navbar__item"><Link to="/yemeklerimg">Yeməklər</Link></li>
    </ul>
  </nav>
);

export default DNavbar;
