import React from 'react';
import ChangePassword from '../../components/dashboard/ChangePassword';
import Layout from '../../components/layout/Layout';

export default function ChangePasswordPage() {
  return (
    <Layout>
      <div style={{ background: 'linear-gradient(0deg, rgba(239,237,255,1) 0%, rgba(255,255,255,1) 100%)' }}>
        <ChangePassword />
      </div>
    </Layout>
  );
}
