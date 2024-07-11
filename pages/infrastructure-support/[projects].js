import React from 'react';
import InfrastructureProjectsTabs from '../../components/infrastructureProjects/InfrastructureProjectsTabs';
import InfrastructureProjects from '../../components/infrastructureProjects/InfrastructureProjects';
import ContactUs from '../../components/home/blocks/ContactUs';
import Layout from '../../components/layout/Layout';

export default function Projects() {
  return (
    <Layout>
      < InfrastructureProjectsTabs />
      {/* <InfrastructureProjects /> */}
       <ContactUs /> 
    </Layout>
  );
}
