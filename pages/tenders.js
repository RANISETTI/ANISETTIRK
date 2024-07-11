import React from 'react';
import Tenders from '../components/tenders/Tenders';
import ContactUs from '../components/home/blocks/ContactUs';
import Layout from '../components/layout/Layout';

export default function Projects() {
  return (
    <Layout title="Tenders | APTS ">
      <div className='services-bg'>
        <Tenders />
      </div>
      <ContactUs />
    </Layout>
  );
}
