import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, FacebookOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import '../Sass/Footer.scss';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical">
            <Text strong>Əlaqə</Text>
            <Text>
              <MailOutlined /> <Link href="tu7n8gcpt@code.edu.az">tu7n8gcpt@code.edu.az</Link>
            </Text>
            <Text>
              <PhoneOutlined /> +994 777505155 
            </Text>
          </Space>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical">
            <Text strong>Sosial Media</Text>
            <Space>
              <Link href="https://www.facebook.com/lacin.abbasov.33" target="_blank"><FacebookOutlined /></Link>
              <Link href="https://www.linkedin.com/in/lajhin-abbasov-3600a8309/" target="_blank"><LinkedinOutlined/></Link>
              <Link href="https://www.instagram.com/lacinabbasov0?utm_source=qr" target="_blank"><InstagramOutlined /></Link>
            </Space>
          </Space>
        </Col>
        
        <Col xs={24} sm={24} md={8}>
          <Text strong>Developer LachIn Abbasov - </Text>

          <Text>
           Sayt
          Özümə Məxsusdur - 2024. Bütün hüquqlar qorunur!!!
          
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
