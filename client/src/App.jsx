import React from 'react';
import  ProductManagement  from './components/ProductManagement';
import ErrorBoundary from './error/errorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
      <ProductManagement />
      </ErrorBoundary>
      
   
    </div>
  );
}

export default App;
