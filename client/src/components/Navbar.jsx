import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Typography, Space } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
      <Title level={3} style={{ margin: 0 }}>TEST</Title>
      <Space>
        {/* Məhsullarımız butonu */}
        <Link to="/dashboard">
          <Button type="link">Məhsullarımız</Button>
        </Link>
        
        {/* Login butonu */}
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      </Space>
    </Header>
  );
};

export default Navbar;
