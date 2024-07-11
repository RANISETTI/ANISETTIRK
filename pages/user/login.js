import React from 'react';
import Login from '../../components/auth/Login';
import Layout from '../../components/layout/Layout';

export default function Projects() {
  return (
    <Layout>
      <div style={{ background: 'linear-gradient(0deg, rgba(222, 242, 255,1) 0%, rgba(255,255,255,1) 100%)' }}>
        <Login />
      </div>
    </Layout>
  );
}
