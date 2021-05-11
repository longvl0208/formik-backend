import React from 'react';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

// eslint-disable-next-line no-unused-vars
import ProfilePage from './pages/profile';

const {
  Header, Footer, Sider, Content,
} = Layout;

function App() {
  return (
    <div className="root">
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
