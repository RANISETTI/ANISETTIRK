import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import {
  Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import { updateOrderStatusService } from '../../../services/dashboard/orders';
import { Context } from './CheckoutContext';

function FinalStep() {
  const contextData = useContext(Context);
  const router = useRouter(Context);
  const [deliveryInstructions, setDeliveryInstructions] = useState();
  const [purchaseOrderNo, setPurchaseOrderNo] = useState();
  const [referenceNo, setReferenceNo] = useState();
  const [termsAndConditions, setTAndConditions] = useState();
  const [comment, setComment] = useState();
  const user = useSelector((state) => state.user);
  const headers = getHeaders(user?.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const placeOrder = () => {
    setIsLoading(true);
    Axios.patch(
      Api.patchOrderDetails(contextData?.orderId),
      {
        delivery_instructions: deliveryInstructions,
        purchase_order_no: purchaseOrderNo,
        reference_no: referenceNo,
        terms_and_conditions: termsAndConditions,
      },
      { headers },
    ).then(({ data }) => {
      updateOrderStatusService(user.accessToken, contextData?.orderId, { comment, status: '', file: null,sent_amount : null, received_amount : null}).then(({ data }) => {
        router.push({
          pathname: `/dashboard/procurement/new/checkout/${contextData?.orderId}`,
          query: { step: 'thankYou' ,monthly_limit_exceeded : data && data.monthly_limit_exceeded ?  data.monthly_limit_exceeded : false},
        });
      });
    }).catch((err) => console.log(err, 'hello err'));
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <h2 className="your-cart">Checkout</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form-required">Delivery Instructions</Form.Label>
              <Form.Control value={deliveryInstructions} as="textarea" onChange={(e) => setDeliveryInstructions(e.target.value)} placeholder="Enter delivery instrctions" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Purchase Order Number*</Form.Label>
          <Form.Control value={purchaseOrderNo} onChange={(e) => setPurchaseOrderNo(e.target.value)} placeholder="Enter purchase order no" />
        </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form-required">Reference Number(Please enter Reference Number)</Form.Label>
              <Form.Control value={referenceNo} onChange={(e) => setReferenceNo(e.target.value)} placeholder="Enter reference no" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form-required">Terms &amp; Conditions</Form.Label>
              <Form.Control value={termsAndConditions} as="textarea" onChange={(e) => setTAndConditions(e.target.value)} placeholder="Enter terms and conditions" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Comments</Form.Label>
              <Form.Control value={comment} as="textarea" onChange={(e) => setComment(e.target.value)} placeholder="Enter Comments" />
            </Form.Group>
          </Form>
          <Row>
            <Col>
              <div className="marg-1rem">
                <Button disabled={(!referenceNo || !termsAndConditions || !deliveryInstructions)} onClick={() => placeOrder()} className="next-btn float-end">Place Order</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </div>
  );
}

export default FinalStep;
