import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/layout/Layout';
import Procurements from '../../components/procurements/Procurements';

function ProcurementsPage() {
  return (
    <Layout>
      <Container>
        <Procurements />
      </Container>
    </Layout>
  );
}

export default ProcurementsPage;
