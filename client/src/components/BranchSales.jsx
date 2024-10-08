import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { setSalesData } from '../redux/salesSlice';
import 'react-datepicker/dist/react-datepicker.css';
import ProductTable from './ProductTable'; // ProductTable bileşenini içe aktar

const BranchSales = () => {
  const dispatch = useDispatch();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesDataLocal] = useState([]);

  const branches = ['İnqilab', 'Mərdəkan', 'Şüvalan', 'Aquapark', 'Nargilə', 'Mum', 'Buzovna', 'Bayl'];

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
      <h1>Fliallarımız</h1>
      <ul>
        {branches.map((branch, index) => (
          <li key={index} onClick={() => handleBranchClick(branch)}>
            {branch}
          </li>
        ))}
      </ul>

      {selectedBranch && (
        <div>
          <h2>Zəhmət olmasa {selectedBranch} flialı üçün tarix aralığı seçin</h2>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="MM/DD/YYYY"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="MM/DD/YYYY"
              minDate={startDate}
            />
          </div>
          <button onClick={handleDateRangeSubmit}>Verileri Getir</button>
        </div>
      )}

      {salesData.length > 0 && (
        <ProductTable products={salesData} /> // ProductTable bileşenini kullan
      )}
    </div>
  );
};

export default BranchSales;
