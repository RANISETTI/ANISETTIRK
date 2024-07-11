import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/layout/Layout';
import Categories from '../../components/procurements/Categories';

export default function CategoriesPage() {
  return (
    <Layout>
      <Container>
        <Categories />
      </Container>
    </Layout>
  );
}
