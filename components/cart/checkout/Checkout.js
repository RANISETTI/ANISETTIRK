import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import RequestApproval from '../RequestApproval';
import FinalStep from './FinalStep';
import AddressStep from './AddressStep';
import ThankYou from '../ThankYou';
import { Context } from './CheckoutContext';

function Checkout() {
  const router = useRouter();
  const { query: { orderId, step } } = router;
  const contextData = useMemo(() => ({
    orderId,
    step,
  }), [orderId, step]);

  
  const returnCartSteps = () => {
    switch (contextData.step) {
      case 'request-approval':
        return <RequestApproval />;
      case 'addressStep':
        return <AddressStep />;
      case 'finalStep':
        return <FinalStep />;
      case 'thankYou':
        return <ThankYou />;
      default:
        return <AddressStep />;
    }
  };

  return (
    <Context.Provider value={contextData}>
      <div className="">
        {returnCartSteps()}
      </div>
    </Context.Provider>
  );
}

export default Checkout;
