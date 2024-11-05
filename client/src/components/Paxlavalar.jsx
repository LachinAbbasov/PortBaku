import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const paxlavaProducts = [
  { id: 1, name: 'Qozlu paxlava', price: '6₼', img: '/images/qozlu-paxlava.jpg' },
  { id: 2, name: 'Fındıqlı paxlava', price: '6₼', img: '/images/findiqli-paxlava.jpg' },
  // ... digər məhsullar ...
];

const Paxlavalar = () => (
  <div style={{ padding: '20px' }}>
    <h3>Paxlavalar</h3>
    <Row gutter={[16, 16]}>
      {paxlavaProducts.map((product) => (
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

export default Paxlavalar;
