import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../../components/layout/Layout';
import Products from '../../../components/products/Products';

function ProductsPage() {
  return (
    <Layout>
      <Container>
        <Products />
      </Container>
    </Layout>
  );
}

export default ProductsPage;
