import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const yemeklerProducts = [
  { id: 1, name: 'Toyuq file', price: '5₼', img: '/images/toyuq-file.jpg' },
  { id: 2, name: 'Fajitos', price: '6₼', img: '/images/fajitos.jpg' },
  // ... digər məhsullar ...
];

const Yemekler = () => (
  <div style={{ padding: '20px' }}>
    <h3>Yeməklər</h3>
    <Row gutter={[16, 16]}>
      {yemeklerProducts.map((product) => (
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

export default Yemekler;
