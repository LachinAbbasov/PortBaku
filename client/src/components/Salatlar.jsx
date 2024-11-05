import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const salatlarProducts = [
  { id: 1, name: 'Paytaxt salatı', price: '3.5₼', img: '/images/paytaxt-salat.jpg' },
  { id: 2, name: 'Nar salatı', price: '4₼', img: '/images/nar-salat.jpg' },
  // ... digər məhsullar ...
];

const Salatlar = () => (
  <div style={{ padding: '20px' }}>
    <h3>Salatlar</h3>
    <Row gutter={[16, 16]}>
      {salatlarProducts.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
          <Card
            hoverable
            cover={<img alt={product.name} src={product.img} />}
            style={{ borderRadius: '10px', overflow: 'hidden' }}
          >
            <Card.Meta title={product.name} description={<Text strong>{product.price}</Text>} />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Salatlar;
