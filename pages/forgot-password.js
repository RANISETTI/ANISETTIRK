import React from 'react';
import ForgotPassword from '../components/auth/ForgotPassword';
import Layout from '../components/layout/Layout';

export default function Projects() {
  return (
    <Layout>
      <div style={{background: "linear-gradient(0deg, rgba(239,237,255,1) 0%, rgba(255,255,255,1) 100%)"}}>
      <ForgotPassword />
      </div>
    </Layout>
  );
}
