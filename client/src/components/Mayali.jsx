import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const mayaliProducts = [
  { id: 1, name: 'Sadə bulka', price: '1₼', img: '/images/sade-bulka.jpg' },
  { id: 2, name: 'Kişmişli', price: '1.2₼', img: '/images/kishmishli.jpg' },
  { id: 3, name: 'Qarabağ kətəsi', price: '1.5₼', img: '/images/qarabag-ketesi.jpg' },
  { id: 4, name: 'Simit', price: '1₼', img: '/images/simit.jpg' },
  // ... digər məhsullar ...
];

const Mayali = () => (
  <div style={{ padding: '20px' }}>
    <h3>Mayalı Məhsullar</h3>
    <Row gutter={[16, 16]}>
      {mayaliProducts.map((product) => (
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

export default Mayali;
