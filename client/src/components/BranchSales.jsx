import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { setSalesData } from '../redux/salesSlice';
import 'react-datepicker/dist/react-datepicker.css';

const BranchSales = () => {
  const dispatch = useDispatch();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesDataLocal] = useState([]);

  const branches = ['Şube 1', 'Şube 2', 'Şube 3'];

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
  };

  const handleDateRangeSubmit = async () => {
    if (!startDate || !endDate || !selectedBranch) {
      alert('Lütfen bir şube ve tarih aralığı seçin.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        branch: selectedBranch,
        startDate,
        endDate,
      }),
    });

    const data = await response.json();
    setSalesDataLocal(data);
    dispatch(setSalesData(data));
  };

  return (
    <div>
      <h1>Şubelerimiz</h1>
      <ul>
        {branches.map((branch, index) => (
          <li key={index} onClick={() => handleBranchClick(branch)}>
            {branch}
          </li>
        ))}
      </ul>

      {selectedBranch && (
        <div>
          <h2>{selectedBranch} için Tarih Aralığı Seçin</h2>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Başlangıç Tarihi"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="Bitiş Tarihi"
              minDate={startDate}
            />
          </div>
          <button onClick={handleDateRangeSubmit}>Verileri Getir</button>
        </div>
      )}

      {salesData.length > 0 && (
        <div>
          <h2>Satış Verileri</h2>
          <table>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Satılan Miktar</th>
                <th>Hazırlanan Miktar</th>
                <th>Kullanım Tarihi Geçmiş</th>
                <th>Kalan Miktar</th>
                <th>Elverişli Olmayan Miktar</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.soldQuantity}</td>
                  <td>{item.preparedQuantity}</td>
                  <td>{item.expiredQuantity}</td>
                  <td>{item.remainingQuantity}</td>
                  <td>{item.unfitQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BranchSales;
