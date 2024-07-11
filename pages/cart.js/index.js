import React from 'react';
import { Container } from 'react-bootstrap';
import Cart from '../../components/cart/Cart';
import Layout from '../../components/layout/Layout';

function CartPage() {
  return (
    <Layout>
      <Container>
        <Cart />
      </Container>
    </Layout>
  );
}

export default CartPage;
