import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductTable from './ProductTable'; // Cədvəl komponenti
import styles from '../Sass/BranchSales.module.scss';
import { setBranchName, setStartDate, setEndDate } from '../redux/productSlice';
import { selectBranchName, selectStartDate, selectEndDate } from '../redux/productSlice';

const BranchSales = () => {
  const dispatch = useDispatch();
  
  // Redux'dan durumları seçin
  const branchName = useSelector(selectBranchName);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);

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
    const selectedBranch = event.target.value;
    dispatch(setBranchName(selectedBranch)); // Redux state-i güncəllə
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    dispatch(setStartDate(selectedStartDate)); // Redux state-i güncəllə
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    dispatch(setEndDate(selectedEndDate)); // Redux state-i güncəllə
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

      <label htmlFor="startDate">Başlanğıc Tarixi Seçin:</label>
      <input 
        type="date" 
        id="startDate" 
        value={startDate} 
        onChange={handleStartDateChange} 
      />

      <label htmlFor="endDate">Bitiş Tarixi Seçin:</label>
      <input 
        type="date" 
        id="endDate" 
        value={endDate} 
        onChange={handleEndDateChange} 
      />

      {/* Only render ProductTable if a branch is selected */}
      {branchName && (
        <ProductTable branchName={branchName} startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default BranchSales;
