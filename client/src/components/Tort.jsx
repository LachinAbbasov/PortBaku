import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const tortProducts = [
  { id: 1, name: 'Yay tortu M', price: '12₼', img: '/images/yay-tortu.jpg' },
  { id: 2, name: 'Yay tortu S', price: '10₼', img: '/images/yay-tortu-s.jpg' },
  { id: 3, name: 'Birdmilk M', price: '15₼', img: '/images/birdmilk.jpg' },
  // ... digər məhsullar ...
];

const Tort = () => (
  <div style={{ padding: '20px' }}>
    <h3>Tortlar</h3>
    <Row gutter={[16, 16]}>
      {tortProducts.map((product) => (
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

export default Tort;
``
