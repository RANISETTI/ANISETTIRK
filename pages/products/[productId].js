import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/layout/Layout';
import ProductDetail from '../../components/products/ProductDetail';

function ProductInstance() {
  return (
    <Layout>
      <Container>
        <ProductDetail />
      </Container>
    </Layout>
  );
}

export default ProductInstance;
