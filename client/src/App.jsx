import React from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CreateProduct from './components/CreateProduct';
import ProductTable from './components/ProductTable';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}>
          Product Management System
        </Header>
        
        <Content style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <CreateProduct />
          </div>
          <ProductTable />
        </Content>
        
        <Footer style={{ textAlign: 'center' }}>
          © 2024 Product Management System
        </Footer>
      </Layout>
    </Provider>
  );
};

export default App;
