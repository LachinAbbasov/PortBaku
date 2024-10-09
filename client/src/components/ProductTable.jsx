import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div>
      <h2>Məhsul Cədvəli</h2>
      <table>
        <thead>
          <tr>
            <th>Məhsulun Adı</th>
            <th>Satış Miqdarı</th>
            <th>Hazırlanan Miqdar</th>
            <th>Yararsız</th>
            <th>Tarix Bitmiş</th>
            <th>Qalan Miqdar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            // Kalan miktarı hesaplayın
            const totalSoldAndUnfit = item.soldQuantity + item.unfitQuantity + item.expiredQuantity;
            const remainingQuantity = item.preparedQuantity - totalSoldAndUnfit;

            return (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.soldQuantity}</td>
                <td>{item.preparedQuantity}</td>
                <td>{item.unfitQuantity}</td>
                <td>{item.expiredQuantity}</td>
                <td>{remainingQuantity >= 0 ? remainingQuantity : 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;