import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Row, Col, Button, Form, Alert, Modal,
} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import Axios from 'axios';
import GeneratedDocument from './GeneratedDocument';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';

function MyVerticallyCenteredModal(props) {
  const [minutes, setMinutes] = useState('02');
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mobile OTP Verification
          {' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please enter the OTP that has sent to your registered mobile number.
        </p>
        <div className="form-group">
          <label htmlFor="otpInput">Enter OTP</label>
          <input type="number" className="form-control" id="otpInput" />
          <small id="otpInputHelp" className="form-text text-muted">
            Please click on Resend  in
            { minutes === 0 && seconds === 0
              ? null
              : (
                <>
                  {' '}
                  {minutes}
                  :
                  {seconds < 10 ? `0${seconds}` : seconds}
                </>
              )}
            .

          </small>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function OtpVerify({ setSelectedStep }) {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const { uid } = useSelector((state) => state.quotation);
  const { accessToken } = useSelector((state) => state.user);
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState();

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { query: { categoryId } } = router;

  const onClickPrint = () => {
    window.frames.printf.focus();
    window.frames.printf.print();
  };

  const finalSubmission = () => {
    setFormLoading(true);
    Axios.put(
      Api.quotationDetails(uid),
      { status: 'COMPLETED' },
      { headers },
    )
      .then((res) => {
        console.log('res', res);
        setFormLoading(false);
        router.push('/dashboard/procurement/new/customized-product/thankyou');
        // setSelectedStep(5);
      })
      .catch((err) => {
        console.log(err, 'hello quotation details');
        setFormErrors(err.response.data);
        if (err.response.data && err.response.data.non_field_errors) {
          setNonFieldErrors(err.response.data.non_field_errors);
        }
        setFormLoading(false);
      });
  };
  return (
    <div className="p-3 bg-white">
      <Col className="mb-3 d-flex justify-content-between">
        <Button
          variant="primary"
          onClick={() => router.push({
            pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
            query: { step: 5 },
          })}
        >
          Back

        </Button>
      </Col>
      <div className="px-4 pb-6">
        {' '}
        <p>Please validate all the data before proceeding </p>

        <div className="alert alert-light border-4 border-primary  border-end-0 border-top-0 border-bottom-0 " role="alert">
          {' '}
          <div className="d-inline-flex  ">
            <Form.Check type="checkbox" checked={validated} onClick={() => { setValidated(!validated); }} />
            <p className="px-2 m-0">
              I agree to
              {' '}
              <span className="text-info"> terms & conditions</span>
              {' '}
              of APTS.
            </p>

          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button disabled={!validated} onClick={() => finalSubmission()}>Submit</Button>
        </div>
        {/* <div>
           <GeneratedDocument />
          <div className="d-flex flex-column">
            <button
              type="button"
              className="bg-dark  text-white text-right p-1 my-2 mx-auto border-0 w-25"
              onClick={() => onClickPrint()}
            >

              Print
            </button>
            <div className=" mx-auto">
              <iframe title="customized-product-pdf" src={`http://localhost:3000/generate-pdf/customized-product/${uid}/`} id="printf" name="printf" width="700px" height="500px">
                hii
              </iframe>

            </div>
          </div>
        </div> */}
        <MyVerticallyCenteredModal
          show={showModal}
          onHide={() => { setShowModal(false); setisEMPGReequired(false); }}
        />

      </div>

    </div>
  );
}

export default OtpVerify;
