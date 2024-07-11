import React from 'react';
import ContactUs from '../components/home/blocks/ContactUs';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import OurTeams from '../components/OurTeams';
import Footer from '../components/layout/Footer';

export default function OurTeamPage() {
  return (
    <Layout>
      <Header />
      <OurTeams />
      <ContactUs />
    </Layout>
  );
}
