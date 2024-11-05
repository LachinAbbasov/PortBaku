import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DNavbar from './DashBoardNav';
import Mayali from './Mayali';
import Tort from './Tort';
import Paxlavalar from './Paxlavalar';
import QuruMallar from './QuruMallar';
import Kulinaria from './Kulinariya';
import Salatlar from './Salatlar';
import Yemekler from './Yemekler';
import '../Sass/DashBoard.scss';

const Dashboard = () => (
  <div className="dashboard">
    
    <DNavbar />
    <Routes>
<Route path="/mayalilarimg" element={<Mayali />} />
<Route path="/tortimg" element={<Tort />} />
<Route path="/paxlavalarimg" element={<Paxlavalar />} />
<Route path="/qurumallarimg" element={<QuruMallar />} />
<Route path="/kulinariaimg" element={<Kulinaria />} />
<Route path="/salatlarimg" element={<Salatlar />} />
<Route path="/yemeklerimg" element={<Yemekler />} />

    </Routes>
  
  </div>
);

export default Dashboard;
