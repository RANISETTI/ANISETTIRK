import React from 'react';
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';
import CustomizedProductPDF from '../../../../../components/procurements/pdf/CustomizedProductPDF';
import ThankYouCustomizedProduct from '../../../../../components/procurements/ThankYouCustomizedProduct';

function Thankyou() {
  return (
    <Dashboard>
      {/* <CustomizedProductPDF /> */}
      <ThankYouCustomizedProduct />
    </Dashboard>
  );
}

export default Thankyou;
