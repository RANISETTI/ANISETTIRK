import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProductSpecifications from './ProductSpecifications';
import Officer from './Officer';
import Details from './Details';
import EmdEpmgDetails from './EmdEpmgDetails';
import TAndC from './TAndC';
import OtpVerify from './OtpVerify';
import Splitting from './Splitting';

const stepper = ['Specifications', 'Consignees/Reporting Officer', 'Details', 'EMD/EPMG Details', 'T&C', 'Verify OTP/eSign & Publish'];

function Procurements() {
  const router = useRouter();
  const { query, query: { categoryId, step } } = router;

  const quotation = useSelector((state) => state.quotation);
  const [selectedStep, setSelectedStep] = useState(quotation && quotation.id && Number(step));
  useEffect(() => {
    if (quotation && quotation.id) {
      setSelectedStep(Number(step));
    } else if (categoryId === 'checkout') {
      router.push({
        pathname: '/dashboard/procurement/new/customized-product',
      });
    } else {
      router.push({
        pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
        query: { ...query, step: 1 },
      });
      setSelectedStep(1);
    }
  }, [step]);

  const renderStepper = () => (
    <div className="w-100 d-flex flex-row justify-content-between procurement-stepper-container mb-3 bg-white">
      {stepper.map((stepItem, index) => (
        <div className="w-100 stepper-item">
          <Badge pill bg={selectedStep - 1 === index ? 'primary' : selectedStep > index ? 'success' : 'secondary'} className="m-1">
            {index + 1}
          </Badge>
          <span className={selectedStep - 1 === index ? 'text-primary' : selectedStep > index ? 'text-success' : 'text-secondary'}>{stepItem}</span>
        </div>
      ))}
    </div>
  );

  // const renderSteps = () => {
  //   switch (selectedStep) {
  //     case 1:
  //       return (
  //         <ProductSpecifications setSelectedStep={() => setSelectedStep(2)} />
  //       );
  //     case 2:
  //       return <Officer setSelectedStep={() => setSelectedStep(3)} />;
  //     case 3:
  //       return <Details setSelectedStep={() => setSelectedStep(4)} />;
  //     case 4:
  //       return <EmdEpmgDetails setSelectedStep={() => setSelectedStep(5)} />;
  //     case 5:
  //       return <Splitting setSelectedStep={() => setSelectedStep(6)} />;
  //     case 6:
  //       return <TAndC setSelectedStep={() => setSelectedStep(7)} />;
  //     case 7:
  //       return <OtpVerify setSelectedStep={() => setSelectedStep(7)} />;
  //     default:
  //       return null;
  //   }
  // };
  const renderSteps = () => {
    switch (selectedStep) {
      case 1:
        return (
          <ProductSpecifications setSelectedStep={setSelectedStep} />
        );
      case 2:
        return <Officer setSelectedStep={setSelectedStep} />;
      case 3:
        return <Details setSelectedStep={setSelectedStep} />;
      case 4:
        return <EmdEpmgDetails setSelectedStep={setSelectedStep} />;
      case 5:
        return <TAndC setSelectedStep={setSelectedStep} />;
      case 6:
        return <OtpVerify setSelectedStep={setSelectedStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-3 pb-3">
      {renderStepper()}
      {renderSteps()}
    </div>
  );
}

export default Procurements;
