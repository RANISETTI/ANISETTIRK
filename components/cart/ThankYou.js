import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import Page404 from '../common/customerrorpages/Page404';

export default function ThankYou({ cartTotal }) {
  const router = useRouter();

  const { query: { orderId, monthly_limit_exceeded } } = router;
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);
  const [orderDetails, setOrderDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    Axios.get(Api.patchOrderDetails(orderId), { headers }).then(({ data }) => {
      setOrderDetails(data);
      setIsLoading(false);
    }).catch((err) => {
      const { response: { statusText } } = err;
      setErrors(statusText);
      setIsLoading(false);
    });
  }, []);

  if (errors) {
    return (<Page404 errors={errors} />);
  }

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const details = () => {
    if (orderDetails.status === 'PENDING_PI') {
      if (monthly_limit_exceeded) {
        return (
          <div>
            <h3>
              Your total orders price for this month is greater than 10 lakhs. Your request will be
              forwarded for further processing
            </h3>
          </div>
        );
      }
      return (
        <div>
          <h3>
            Your request will be forwarded for further processing
          </h3>
        </div>
      );
    }
    return (
      <div>
        <h3>
          Purchase Order No :
          {' '}
          {orderDetails.purchase_order_no}
        </h3>
        <h4 className="color-green">Your order has been placed</h4>
        <p className="thank-you-style1"> You will receive an order confirmation email with details of your order</p>
        <p className="thank-you-style1">Your PO got generated and forwarded to the Vendor</p>
      </div>
    );
  };

  return (
    <div className="mx-5 thank-you-style">
      <div className="p-5 bg-white all-center">
        <FontAwesomeIcon size="5x" icon={faCheckCircle} color="#36bd93" />
        <h1 className="mt-5 mb-3 thank-you-style2">
          { orderDetails.status === 'PENDING_PI' ? ' Thanks For sending the request to APTS ' : 'Thanks For Placing the Order'}
          {' '}
        </h1>
        <h3 className="color-pink">
          Your order is :
          {' '}
          {orderDetails.uid}
          {' '}
        </h3>
        {details()}
        <Button onClick={() => { router.push(`/dashboard/procurement/orders/order-detail/${orderDetails.uid}`); }} className="mx-1 my-3 p-2 bg-primary">
          View Order details
          {' '}
          <FontAwesomeIcon className="mx-2" icon={faArrowRight} />
          {' '}
        </Button>
      </div>
    </div>

  );
}
