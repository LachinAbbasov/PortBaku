import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const quruMallarProducts = [
  { id: 1, name: 'Şəkərbura', price: '2₼', img: '/images/shekerbura.jpg' },
  { id: 2, name: 'Mutaki', price: '2.5₼', img: '/images/mutaki.jpg' },
  // ... digər məhsullar ...
];

const QuruMallar = () => (
  <div style={{ padding: '20px' }}>
    <h3>Quru Mallar</h3>
    <Row gutter={[16, 16]}>
      {quruMallarProducts.map((product) => (
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

export default QuruMallar
