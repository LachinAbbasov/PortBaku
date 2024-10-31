import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div>
        <h2>Welcome, User!</h2>
        <p>This is your dashboard. Here you can see a quick overview of your activities.</p>
        <div>
          <h3>Quick Stats</h3>
          <ul>
            <li>Total Users: 150</li>
            <li>Active Sessions: 5</li>
            <li>Pending Tasks: 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
