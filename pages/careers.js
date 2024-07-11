import React from 'react';
import Careers from '../components/careers/Careers'
import ContactUs from '../components/home/blocks/ContactUs';
import Layout from '../components/layout/Layout';

export default function Projects() {
  return (
    <Layout>
      <div style={{ background: "linear-gradient(0deg, rgba(239,237,255,1) 0%, rgba(255,255,255,1) 100%)"}}>
      <Careers />
      </div>
      <ContactUs />
    </Layout>
  );
}