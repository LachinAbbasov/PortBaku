import React, { useState } from 'react';
import ProductTable from './ProductTable'; // Cədvəl komponenti
import styles from '../Sass/BranchSales.module.scss';

const BranchSales = () => {
  const [branchName, setBranchName] = useState('');
  const [date, setDate] = useState('');

  // Filial adlarının massivini yaradın
  const branchNames = [
    'İnqilab',
    'Mərdəkan',
    'Şüvalan',
    'Aquapark',
    'Nargilə',
    'Mum',
    'Buzovna',
    'Bayl'
  ];

  const handleBranchChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Filial Satışları</h1>
      <label htmlFor="branch">Filial Seçin:</label>
      <select id="branch" value={branchName} onChange={handleBranchChange}>
        <option value="">Seçin</option>
        {branchNames.map((branch, index) => (
          <option key={index} value={branch}>{branch}</option>
        ))}
      </select>

      <label htmlFor="date">Tarixi Seçin:</label>
      <input 
        type="date" 
        id="date" 
        value={date} 
        onChange={handleDateChange} 
      />

      {/* ProductTable komponentinə filial adı və tarixi verin */}
      <ProductTable branchName={branchName} date={date} />
    </div>
  );
};

export default BranchSales;
