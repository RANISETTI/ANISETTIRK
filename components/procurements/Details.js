import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Row, Col, Button, Form, Alert, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import getHeaders from '../../libs/utils/getHeaders';
import Api from '../../config/Api';

function Details({ setSelectedStep }) {
  const [formDataLoading, setFormDataLoading] = useState(true);
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);
  const { uid: quotId } = useSelector((state) => state.quotation);
  const router = useRouter();
  const { query: { categoryId } } = router;
  const [validated, setValidated] = useState(false);

  const [detailFormValues, setDetailFormValues] = useState({
    bid_duration: '',
    bid_start_date: '',
    bid_end_date: '',
    bid_opening_date: '',
    bid_life_cycle: '',
    bid_offer_validity: '',
    is_ra: false,
    bid_clarifications_duration: '',
    bid_estimated_value: '',
    bidder_annual_turn_over: '',
    past_exp_required: '',
    oem_avg_annual_turn_over: '',
    past_performance: '',
    is_documents_required_from_seller: false,
    exemption_to_mse: true,
    exemption_to_startup: true,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState();

  const formValuesHandler = (attribute, value) => {
    setDetailFormValues((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
    if (formErrors[attribute]) {
      delete formErrors[attribute];
    }
  };

  useEffect(() => {
    Axios.get(Api.quotationDetails(quotId), { headers }).then(({ data }) => {
      // console.log(data);
      setDetailFormValues(data);
      setFormDataLoading(false);
    })
      .catch((err) => {
        console.log(err);
        setFormDataLoading(false);
      });
    setFormErrors({});
    setNonFieldErrors();
  }, []);
  const saveDetails = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const newFormValues = detailFormValues;
      setFormLoading(true);
      setFormErrors({});
      setNonFieldErrors();
      const formValues = new FormData();
      newFormValues.bid_start_date = newFormValues.bid_start_date && moment(newFormValues.bid_start_date).format('YYYY-MM-DDThh:mm');
      newFormValues.bid_end_date = newFormValues.bid_end_date && moment(newFormValues.bid_end_date).format('YYYY-MM-DDThh:mm');
      newFormValues.bid_opening_date = newFormValues.bid_opening_date && moment(newFormValues.bid_opening_date).format('YYYY-MM-DDThh:mm');

      if (typeof newFormValues.price_variation_document === 'string') {
        delete newFormValues.price_variation_document;
      }
      const newValues = {};
      Object.keys(newFormValues).forEach((eachItem) => {
        if (newFormValues[eachItem] !== null) {
          newValues[eachItem] = newFormValues[eachItem];
        }
      });
      Object.keys(newValues).forEach((eachItem) => {
        formValues.append(eachItem, newValues[eachItem]);
      });
      console.log('newValues', newFormValues);
      console.log('newValues', newValues);
      Axios.patch(
        Api.quotationDetails(quotId),
        formValues,
        { headers },
      )
        .then((res) => {
          setFormLoading(false);
          setFormErrors({});
          setNonFieldErrors();
          router.push({
            pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
            query: { step: 4 },
          });
        })
        .catch((err) => {
          setFormLoading(false);
          console.log(err, 'hello quotation details');
          setFormErrors(err.response.data);
          if (err.response.data && err.response.data.non_field_errors) {
            setNonFieldErrors(err.response.data.non_field_errors);
          }
        });
    }
    setValidated(true);
  };

  return (
    <Row className="p-3 bg-white">
      <Form noValidate validated={validated} onSubmit={saveDetails}>
        <Col className="mb-3 d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => router.push({
              pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
              query: { step: 2 },
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
          <div className=" p-2 rounded ">
            <div style={{ background: '#F2F4F8', padding: '20px' }}>
              <Row className="mb-3 ">
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Bid Start Date / Time
                      {' '}
                      <span style={{ color: 'red' }}>*</span>
                    </p>
                  </div>
                  <DatePicker
                    selected={detailFormValues.bid_start_date ? new Date(detailFormValues.bid_start_date) : null}
                    customInput={(
                      <div>
                        <Form.Control required value={detailFormValues.bid_start_date && moment(detailFormValues.bid_start_date).format('LLL')} type="input" placeholder="Bid Start Date / Time" />
                        <Form.Control.Feedback type="invalid">
                          Please select Bid Start Date / Time.
                        </Form.Control.Feedback>
                      </div>
                    )}
                    onChange={(date) => formValuesHandler('bid_start_date', date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                  />
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_start_date}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Bid Duration
                      {' '}
                      <span className="mb-0" style={{ fontSize: '13px' }}>(Number Of Days)</span>
                      {' '}
                      <span style={{ color: 'red' }}>*</span>

                    </p>
                  </div>
                  <Form.Control required value={detailFormValues.bid_duration} type="number" min={0} placeholder="Bid Duration" onChange={(e) => formValuesHandler('bid_duration', e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please enter Bid Duration.
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_duration}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Bid End Date / Time
                      {' '}
                      <span className="mb-0" style={{ fontSize: '13px' }}>(Select Duration Between 09:00 To 21:00)</span>
                      <span style={{ color: 'red' }}>*</span>

                    </p>

                  </div>
                  <DatePicker
                    selected={detailFormValues.bid_end_date ? new Date(detailFormValues.bid_end_date) : null}
                    onChange={(date) => formValuesHandler('bid_end_date', date)}
                    customInput={(
                      <div>
                        <Form.Control required value={detailFormValues.bid_end_date && moment(detailFormValues.bid_end_date).format('LLL')} type="input" placeholder="Bid End Date / Time" />
                        <Form.Control.Feedback type="invalid">
                          Please Select Bid End Date / Time.
                        </Form.Control.Feedback>
                      </div>
                    )}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    required
                  />
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_end_date}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">Bid Opening Date / Time</p>
                  </div>
                  <DatePicker
                    selected={detailFormValues.bid_opening_date ? new Date(detailFormValues.bid_opening_date) : null}
                    onChange={(date) => { formValuesHandler('bid_opening_date', date); formValuesHandler('bid_opening_date', date); }}
                    customInput={(
                      <div>
                        <Form.Control required value={detailFormValues.bid_opening_date && moment(detailFormValues.bid_opening_date).format('LLL')} type="input" placeholder="Bid Opening Date / Time" />
                        <Form.Control.Feedback type="invalid">
                          Please select Bid Opening Date / Time.
                        </Form.Control.Feedback>
                      </div>
                    )}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    required
                  />
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_opening_date}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Bid Life Cycle Days
                      {' '}
                      <span className="mb-0" style={{ fontSize: '13px' }}>(From Published Date)</span>
                      {' '}
                      <span style={{ color: 'red' }}>*</span>

                    </p>
                  </div>
                  <div className="relative d-flex align-items-center">
                    <div className=" relative w-100">
                      <Form.Control type="number" required min={0} placeholder="Bid life Cycle" value={detailFormValues.bid_life_cycle} onChange={(e) => formValuesHandler('bid_life_cycle', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter Bid life Cycle.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_life_cycle}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Bid Offer Validity Days
                      {' '}
                      <span className="mb-0" style={{ fontSize: '13px' }}>(From End Date)</span>
                      {' '}
                      <span style={{ color: 'red' }}>*</span>

                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className=" relative w-100">

                      <Form.Control required type="number" placeholder="Bid Offer Validity Days" min={0} value={detailFormValues.bid_offer_validity} onChange={(e) => formValuesHandler('bid_offer_validity', e.target.value)} />
                      <Form.Control.Feedback type="invalid">
                        Please enter Bid life Cycle.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_offer_validity}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12} className=" my-auto">
                  <div className="d-flex align-items-center">
                    <p className="mb-0">
                      Do You Want To Take This Bid To RA  Post Technical Evaluation?
                      {' '}
                      <span style={{ color: 'red' }}>*</span>

                    </p>
                    <Form.Check className="mx-3" type="checkbox" checked={detailFormValues.is_ra} onClick={() => formValuesHandler('is_ra', !detailFormValues.is_ra)} />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.is_ra}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div>
                    <p className="mb-0">
                      Time To Be Allowed To The Seller For
                      Technical Clarifications During Technical Evaluation In Days
                      {' '}
                      <span style={{ color: 'red' }}>*</span>
                    </p>
                  </div>
                  <div className="">
                    <Form.Select required aria-label="Default select example" value={detailFormValues.bid_clarifications_duration} onChange={(e) => formValuesHandler('bid_clarifications_duration', e.target.value)}>
                      <option>Select one Option</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please enter Bid life Cycle.
                    </Form.Control.Feedback>
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_clarifications_duration}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12} className=" my-auto">
                  <div className="d-flex align-items-center">
                    <p className="mb-0">Whether Price Variation Applicable?</p>
                    <Form.Check className="mx-3" type="checkbox" checked={detailFormValues.is_price_variation} onClick={() => formValuesHandler('is_price_variation', !detailFormValues.is_price_variation)} />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.is_price_variation}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className="">
                    <p className="mb-0">
                      Bid Estimated Value
                      {' '}
                      <strong>(in Lakhs)</strong>

                    </p>
                    <Form.Control value={detailFormValues.bid_estimated_value} type="number" min={0} placeholder="Bid Estimated Value" onChange={(e) => formValuesHandler('bid_estimated_value', e.target.value)} />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bid_estimated_value}</p>
                </Col>
              </Row>
              {
                detailFormValues.is_price_variation && (
                  <Row className="mb-3">
                    <Col lg={6} md={6} xs={12}>
                      <div className="">
                        <p className="mb-0">
                          Price Variation Clause
                          {' '}
                          <span style={{ color: 'red' }}>*</span>

                        </p>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Price Variation Clause"
                          value={detailFormValues.price_variation_clause}
                          onChange={(e) => formValuesHandler('price_variation_clause', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter Price Variation Clause.
                        </Form.Control.Feedback>
                      </div>
                      <p style={{ color: 'red' }}>{formErrors && formErrors.price_variation_clause}</p>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                      <div className="">
                        <p className="mb-0">
                          Upload Price Variation Clause Document
                          {' '}
                          <span style={{ color: 'red' }}>*</span>

                        </p>
                        <Form.Control
                          required={!typeof detailFormValues.price_variation_document === 'string'}
                          type="file"
                          onChange={(e) => {
                            console.log(e);
                            setDetailFormValues((prevState) => ({
                              ...prevState,
                              price_variation_document: e.target.files[0],
                            }));
                            if (formErrors && formErrors.price_variation_document) {
                              delete formErrors.price_variation_document;
                            }
                          }}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please Upload Price Variation Clause Document.
                        </Form.Control.Feedback>
                      </div>
                      {
                    typeof detailFormValues.price_variation_document === 'string' && <a href={detailFormValues.price_variation_document} target="_blank" rel="noreferrer">View Previous document</a>
                  }
                      <p style={{ color: 'red' }}>{formErrors && formErrors.price_variation_document}</p>
                    </Col>
                  </Row>

                )
              }
              <div className="alert alert-primary" role="alert">
                <div className="text-primary">
                  <strong className="text-primary">Note: </strong>
                  {' '}
                  {' '}
                  Order with Price Variation Clause applicability can only be created by Others/offline payment method
                </div>
              </div>
              <div className="alert alert-primary" role="alert">
                <div className="text-primary">
                  <strong className="text-primary">Advisory: </strong>
                  {' '}
                  {' '}
                  The submitted values shall be considered for EMD and Bid eligibility criteria as published in the Bid document
                </div>
              </div>
              <p>
                <strong>Terms Of Delivery:</strong>
                {' '}
                Free Delivery At Site (At Consignee/Reporting Officer's Place)
              </p>
              <p className="bg-light py-3 px-2 border-start border-5 border-primary">
                Participant Eligibility Criterion
                (To be verified by the buyer at the time of technical evaluation)
              </p>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12}>
                  <p>
                    Bidder Annual Turn Over
                    {' '}
                    <strong>(in Lakhs)</strong>

                  </p>
                  <Form.Control required value={detailFormValues.bidder_annual_turn_over} type="number" min={0} placeholder="Bidder Annual Turn Over" onChange={(e) => formValuesHandler('bidder_annual_turn_over', e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please enter Bidder Annual Turn Over.
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.bidder_annual_turn_over}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <p>Years Of Past Experience Required</p>
                  <Form.Select required aria-label="Default select example" value={detailFormValues.past_performance} onChange={(e) => formValuesHandler('past_performance', e.target.value)}>
                    <option>Select one Option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select required Years Of Past Experience .
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.past_performance}</p>
                </Col>
              </Row>
              <p className="bg-light py-3 px-2 border-start border-5 border-primary">
                Additional Criterion
                (To be verified by the buyer at the time of technical evaluation)
              </p>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12}>
                  <p>
                    Average Annual Turn Over Of OEM
                    {' '}
                    <strong>(in Lakhs)</strong>
                  </p>
                  <Form.Control required value={detailFormValues.oem_avg_annual_turn_over} type="number" min={0} placeholder="Average Annual Turn Over Of OEM" onChange={(e) => formValuesHandler('oem_avg_annual_turn_over', e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please enter Average Annual Turn Over Of OEM.
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.oem_avg_annual_turn_over}</p>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <p>
                    Past Performance
                    {' '}
                    <strong>(in Percentage)</strong>
                  </p>
                  <Form.Select aria-label="Default select example" value={detailFormValues.past_exp_required} onChange={(e) => formValuesHandler('past_exp_required', e.target.value)}>
                    <option>Select one Option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.past_exp_required}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={6} xs={12} className=" my-auto">
                  <div className="d-flex align-items-center">
                    <p className="mb-0">Document Required From Seller</p>
                    <Form.Check className="mx-5" type="checkbox" checked={detailFormValues.is_documents_required_from_seller} onClick={() => formValuesHandler('is_documents_required_from_seller', !detailFormValues.is_documents_required_from_seller)} />
                  </div>
                  <p style={{ color: 'red' }}>{formErrors && formErrors.is_documents_required_from_seller}</p>
                </Col>
                {
                  detailFormValues.is_documents_required_from_seller && (
                  <Col lg={6} md={6} xs={12}>
                    <div>
                      <p className="mb-0">
                        Experience Criteria, Past Performance
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Select aria-label="Default select example" value={detailFormValues.required_documents} onChange={(e) => formValuesHandler('required_documents', e.target.value)}>
                        <option>Select one Option</option>
                        <option value="1">Additional Doc 3 (Requested in ATC)</option>
                        <option value="2">Additional Doc 4 (Requested in ATC)</option>
                        <option value="3">Compliance of BoQ specification and supporting document</option>
                      </Form.Select>
                    </div>
                    <p style={{ color: 'red' }}>{formErrors && formErrors.bid_offer_validity}</p>
                  </Col>
                  )
                }

              </Row>
              <Row className="mb-3">
                <Col lg={4} md={4} xs={12}><p>Do You Want To Give Exemption To Verified MSE?</p></Col>
                <Col>
                  <Form.Check type="checkbox" checked={detailFormValues.exemption_to_mse} onClick={() => formValuesHandler('exemption_to_mse', !detailFormValues.exemption_to_mse)} />
                  <p style={{ color: 'red' }}>{formErrors && formErrors.exemption_to_mse}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={4} md={4} xs={12}><p>Do You Want To Give Exemption To Verified Startups?</p></Col>
                <Col>
                  <Form.Check type="checkbox" checked={detailFormValues.exemption_to_startup} onClick={() => formValuesHandler('exemption_to_startup', !detailFormValues.exemption_to_startup)} />
                  <p style={{ color: 'red' }}>{formErrors && formErrors.exemption_to_startup}</p>
                </Col>
              </Row>
              <p>
                Please ensure Compliance of DoE OM dated 25.07.2016 in this regard.
                {' '}
                <a href="#">(View Order)</a>
              </p>

              <strong>
                For encrypting and decrypting this Bid, we use secure key pairs linked to you account
              </strong>
              <p>
                Your Account already has a key pair associated with it. Please click on Save to proceed.
              </p>
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
    </Row>
  );
}

export default Details;
