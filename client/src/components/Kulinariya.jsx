import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const kulinariaProducts = [
  { id: 1, name: 'Sendiviç', price: '3₼', img: '/images/sendvic.jpg' },
  { id: 2, name: 'Toyuq nuggets', price: '4₼', img: '/images/toyuq-nuggets.jpg' },
  // ... digər məhsullar ...
];

const Kulinaria = () => (
  <div style={{ padding: '20px' }}>
    <h3>Kulinariya</h3>
    <Row gutter={[16, 16]}>
      {kulinariaProducts.map((product) => (
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

export default Kulinaria;
