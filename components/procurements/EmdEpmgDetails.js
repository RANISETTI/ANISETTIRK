import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button, Form, Alert, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';

function EmdEpmgDetails({ setSelectedStep }) {
  const [formDataLoading, setFormDataLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    is_emd_required: true,
    is_epmg_required: true,
    emd_amount: '',
    emd_percentage: '',
    epmg_amount: '',
    epmg_percentage: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState();
  const { uid } = useSelector((state) => state.quotation);
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { query: { categoryId } } = router;

  const formValuesHandler = (attribute, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };
  useEffect(() => {
    Axios.get(Api.quotationDetails(uid), { headers }).then(({ data }) => {
      // console.log(data);
      setFormValues(data);
      setFormDataLoading(false);
    })
      .catch((err) => {
        console.log(err);
        setFormDataLoading(false);
      });
  }, []);

  const saveDetails = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setFormLoading(true);
      const newFormValues = formValues;
      delete newFormValues.price_variation_document;
      Axios.patch(
        Api.quotationDetails(uid),
        newFormValues,
        { headers },
      )
        .then((res) => {
          setFormLoading(false);
          router.push({
            pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
            query: { step: 5 },
          });
        })
        .catch((err) => {
          console.log(err, 'hello quotation details');
          setFormErrors(err.response.data);
          if (err.response.data && err.response.data.non_field_errors) {
            setNonFieldErrors(err.response.data.non_field_errors);
          }
          setFormLoading(false);
        });
    }
    setValidated(true);
  };

  return (
    <div className="p-3 bg-white">
      <Form noValidate validated={validated} onSubmit={saveDetails}>
        <Col className="mb-3 d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => router.push({
              pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
              query: { step: 3 },
            })}
          >
            Back

          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            {
            formLoading ? (
              <Spinner animation="border" size="sm" style={{ zIndex: 0 }} />
            ) : 'Next'
          }
          </Button>
        </Col>
        {
        formDataLoading ? (

          <div style={{ height: '70vh' }}>
            <div className="cust-spinner h-100">
              <Spinner animation="border" />
            </div>
          </div>

        ) : (
          <div className="p-5">
            <div noValidate validated={validated} onSubmit={saveDetails}>
              {/* <div className="d-flex justify-content-between">
                <p>
                  Quantity:
                  {' '}
                  <strong> 1</strong>
                </p>
                <p>
                  Reference Price (In INR):
                  {' '}
                  <strong> 1,500,000.00/-</strong>
                </p>
                <p />
              </div> */}
              <div>
                <p className="lead border-bottom">EMD</p>
                <Row className="mb-3">
                  <Col lg={4} md={4} xs={12}><p>EMD Required</p></Col>
                  <Col lg={4} md={4} xs={12}>
                    <Form.Check type="checkbox" checked={formValues.is_emd_required} onClick={() => formValuesHandler('is_emd_required', !formValues.is_emd_required)} />
                    <p style={{ color: 'red' }}>{formErrors.is_emd_required}</p>
                  </Col>
                </Row>
                <strong>Note:</strong>
                <ol>
                  <li>EMD is allowed only for Bid Value greater than 5 lakhs.</li>
                  <li>
                    The role of Advisory Bank is to verify the SFMS of the EMD and ePBG during bid
                    verification of the seller. So, you are advised to select any bank and seller may
                    chose any bank account for ePBG and EMD
                  </li>
                  <li>
                    Department of Expenditure has issued instructions not to insist on EMD.
                    GeM Has enabled taking Bid Securing Declaration as per DoE OM.
                    Please ensure compliance of DoE OM 12.11.2020
                    {' '}
                    <a href="#">(View Order)</a>
                  </li>
                  <li>
                    The EMD % will be applicable for each schedule/group selected during bid creation.
                  </li>
                </ol>
                {
              formValues.is_emd_required && (
                <div>
                  <p className="bg-light py-3 px-2 border-start border-5 border-primary">
                    EMD Details
                  </p>
                  <Row className="mb-3">
                    <Col md={6} xs={12}>
                      <p>
                        EMD Percentage
                        {' '}
                        <strong>(%)</strong>
                        {' '}
                        <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Form.Control required value={formValues.emd_percentage} type="number" min={0} placeholder="EMD Percentage" onChange={(e) => formValuesHandler('emd_percentage', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter EMD Percentage.
                      </Form.Control.Feedback>
                      <p style={{ color: 'red' }}>{formErrors.emd_percentage}</p>
                    </Col>
                    <Col md={6} xs={12}>
                      <p>
                        Amount
                        {' '}
                        <strong>(in Lakhs)</strong>
                        {' '}
                        <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Form.Control required value={formValues.emd_amount} type="number" min={0} placeholder="Amount" onChange={(e) => formValuesHandler('emd_amount', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter Amount.
                      </Form.Control.Feedback>
                      <p style={{ color: 'red' }}>{formErrors.emd_amount}</p>
                    </Col>
                  </Row>

                  <strong>Beneficiary Details:</strong>
                  <p>
                    Test, Department of Agriculture Research and Education (DARE),
                    Indira Gandhi Agriculture University Raipur,
                    Ministry of Agriculture and Farmers Welfare (Argha Chakraborty)
                  </p>
                </div>
              )
            }

              </div>
              <div>
                <p className="lead border-bottom">ePBG</p>
                <Row className="mb-3">
                  <Col lg={4} md={4} xs={12}><p>ePBG Required</p></Col>
                  <Col lg={4} md={4} xs={12}>
                    <Form.Check type="checkbox" checked={formValues.is_epmg_required} onClick={() => formValuesHandler('is_epmg_required', !formValues.is_epmg_required)} />
                    <p style={{ color: 'red' }}>{formErrors.is_epmg_required}</p>
                  </Col>
                </Row>
                <strong>Note:</strong>
                <ol>
                  <li>ePMG is allowed only for Bid Value greater than 5 lakhs.</li>
                  <li>
                    The role of Advisory Bank is to verify the SFMS of the EMD and ePBG during bid
                    verification of the seller. So, you are advised to select any bank and seller may
                    chose any bank account for ePBG and EMD
                  </li>
                  <li>
                    Department of Expenditure has issued instructions to keep reduced performance
                    Security @3%.Please ensure compliance of DoE OM 12.11.2020.
                    {' '}
                    <a href="#">(View Order)</a>
                  </li>
                </ol>
                {
              formValues.is_epmg_required && (
                <div>
                  <p className="bg-light py-3 px-2 border-start border-5 border-primary">
                    ePBG Details
                  </p>
                  <Row className="mb-3">
                    <Col md={6} xs={12}>
                      <p>
                        ePBG Percentage
                        {' '}
                        <strong>(%)</strong>
                        {' '}
                        <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Form.Control required value={formValues.epmg_percentage} type="number" min={0} placeholder="ePBG Percentage" onChange={(e) => formValuesHandler('epmg_percentage', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter ePBG Percentage.
                      </Form.Control.Feedback>
                      <p style={{ color: 'red' }}>{formErrors.epmg_percentage}</p>
                    </Col>
                    <Col md={6} xs={12}>
                      <p>
                        Amount
                        {' '}
                        <strong>(in Lakhs)</strong>
                        {' '}
                        <span style={{ color: 'red' }}>*</span>
                      </p>
                      <Form.Control required value={formValues.epmg_amount} type="number" min={0} placeholder="Amount" onChange={(e) => formValuesHandler('epmg_amount', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter Amount.
                      </Form.Control.Feedback>
                      <p style={{ color: 'red' }}>{formErrors.epmg_amount}</p>
                    </Col>
                  </Row>

                  <strong>Beneficiary Details:</strong>
                  <p>
                    The ePBG will be applicable for the duration of 2 months after the completion
                    of the Warranty period. In case there is non warranty applicable for
                    the selected items then duration applies from the date of delivery
                  </p>
                </div>
              )
            }

              </div>
              {
            nonFieldErrors && (
              <div className="alert alert-danger" role="alert">
                {nonFieldErrors}
              </div>
            )
          }
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                >
                  {
                    formLoading ? (
                      <Spinner animation="border" size="sm" style={{ zIndex: 0 }} />
                    ) : 'Save'
                  }
                </Button>
              </div>
            </div>
          </div>

        )
      }
      </Form>
    </div>
  );
}

export default EmdEpmgDetails;
