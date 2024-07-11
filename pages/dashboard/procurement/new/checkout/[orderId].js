import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';
import Checkout from '../../../../../components/cart/checkout/Checkout';

export default function CheckoutPage() {
  return (
    <Layout>
      <Container>
        <Checkout />
      </Container>
    </Layout>
  );
}
