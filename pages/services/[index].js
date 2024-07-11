import React from 'react';
import ContactUs from '../../components/home/blocks/ContactUs';
import Layout from '../../components/layout/Layout';
import ServiceTabs from '../../components/services/ServiceTabs';

export default function Services() {
  return (
    <Layout>
      <ServiceTabs />
      <ContactUs />
    </Layout>
  );
}
