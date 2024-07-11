import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';
import CustomizedProductPDF from './pdf/CustomizedProductPDF';

export default function ThankYouCustomizedProduct() {
  const router = useRouter();

  return (
    <div className="mx-5 thank-you-style">
      <div className="p-5 bg-white all-center">
        <FontAwesomeIcon size="5x" icon={faCheckCircle} color="#36bd93" />
        <h1 className="mt-5 mb-3 thank-you-style2">
          Thanks For sending the request to APTS
        </h1>
        <h3 className="color-pink">
          You will receive an E-mail from us
        </h3>
        <h6 className="color-pink">
          You can download Digitally generated document once it's loaded.
        </h6>
        <div className="d-flex justify-content-center">
          <CustomizedProductPDF />
          <Button variant="primary" onClick={() => { router.push('/dashboard/procurement/new'); }} className="mx-1 my-3 p-2">
            Continue Shopping
            {' '}
            <FontAwesomeIcon className="mx-2" icon={faArrowRight} />
            {' '}
          </Button>
        </div>
      </div>
    </div>

  );
}
