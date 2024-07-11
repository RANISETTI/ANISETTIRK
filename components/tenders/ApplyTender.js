import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import applyJobService, { applyTenders } from '../../services/ApplyJobService';
import generateCaptcha from '../../services/common/captcha';

export default function ApplyTender(props) {
  const [name, setName] = useState('');
  const [nameErrors, setNameErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErrors, setPhoneNumberErrors] = useState([]);
  const [technicalProposal, setTechnicalProposal] = useState('');
  const [technicalProposalErrors, setTechnicalProposalErrors] = useState([]);
  const [commercialProposal, setCommercialProposal] = useState('');
  const [commercialProposalErrors, setCommercialProposalErrors] = useState([]);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaErrors, setCaptchaErrors] = useState([]);
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);

  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const {
    setIsloding, onClose,
  } = props;

  const onSubmit = () => {
    setIsloding(true);
    const formData = new FormData();
    formData.append('company_name', name);
    formData.append('email', email);
    formData.append('mobile_number', phoneNumber);
    formData.append('technical_proposal', technicalProposal);
    formData.append('commercial_proposal', commercialProposal);
    formData.append('captcha', `${captchaKey}:${captchaValue}`);
    console.log('file: ApplyTender.js ~ line 46 ~ onSubmit ~ formData', formData);

    applyTenders(formData)
      .then(({ data, errors }) => {
        if (errors) {
          const {
            captcha, company_name,
            email, mobile_number,
            non_field_errors,
            technical_proposal,
            commercial_proposal,
          } = errors;
          console.log('errors', errors);
          setNameErrors(company_name);
          setEmailErrors(email);
          setPhoneNumberErrors(mobile_number);
          setCaptchaErrors(captcha);
          setNonFieldErrors(non_field_errors);
          setTechnicalProposalErrors(technical_proposal);
          setCommercialProposalErrors(commercial_proposal);
          setRefreshCaptcha(true);
          setIsloding(false);
          console.log('file: ApplyTender.js ~ line 50 ~ .then ~ data', data);
        } else {
          onClose();
          setIsloding(false);
        }
      });
  };

  useEffect(() => {
    generateCaptcha()
      .then(({ data, errors: captchaErrors }) => {
        if (captchaErrors && Object.keys(captchaErrors).length) {
          console.log('Captcha Generation Errors', captchaErrors);
        } else {
          const { key, url } = data;
          setCaptchaKey(key);
          setCaptchaUrl(url);
        }
      });
  }, [refreshCaptcha]);

  if (isLoading) {
    return (
      <Modal>
        <div className="tender-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Apply for Concurrent/ Internal Auditor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-3'>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className='mb-2'>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  placeholder="Name"
                  onChange={(e) => { setName(e.target.value); setNameErrors([]); }}
                  isInvalid={!!(nameErrors && nameErrors.length && nameErrors)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {nameErrors}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  onChange={(e) => { setEmail(e.target.value); setEmailErrors([]); }}
                  isInvalid={!!(emailErrors && emailErrors.length && emailErrors)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {emailErrors}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="off"
                  placeholder="Phone Number"
                  onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberErrors([]); }}
                  isInvalid={!!(phoneNumberErrors && phoneNumberErrors.length && phoneNumberErrors)}
                  required
                  min="0"
                />
                <Form.Control.Feedback type="invalid">
                  {phoneNumberErrors}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-2'>

            <Col xs={12} md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Technical proposal</Form.Label>
                <Form.Control
                  type="file"
                  name="technicalProposal"
                  onChange={(e) => {
                    setTechnicalProposal(e.target.files[0]);
                    setTechnicalProposalErrors([]);
                  }}
                  isInvalid={!!(technicalProposalErrors
                    && technicalProposalErrors.length
                    && technicalProposalErrors)}
                />
                <Form.Control.Feedback type="invalid">
                  {technicalProposalErrors}
                </Form.Control.Feedback>
                <p>Note: .docx,.pdf,.doc Files Formats allowed</p>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Commercial proposal</Form.Label>
                <Form.Control
                  type="file"
                  name="commercialProposal"
                  onChange={(e) => {
                    setCommercialProposal(e.target.files[0]);
                    setCommercialProposalErrors([]);
                  }}
                  isInvalid={!!(commercialProposalErrors
                    && commercialProposalErrors.length
                    && commercialProposalErrors)}
                />
                <Form.Control.Feedback type="invalid">
                  {commercialProposalErrors}
                </Form.Control.Feedback>
                <p>Note: .xlsx,.xls,Files Formats allowed</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col xs={12} md={6}>
              {captchaUrl && (
                <img
                  src={captchaUrl}
                  alt="captcha"
                  
                />
              )}
              <FontAwesomeIcon icon={faRotate} size="2x" onClick={() => { setRefreshCaptcha(!refreshCaptcha); }} className='mx-1' />
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="my-3" controlId="formCaptcha">
                <Form.Label>Captcha</Form.Label>
                <Form.Control
                  type="text"
                  id="captchaValue"
                  name="captchaValue"
                  placeholder="Enter Captcha"
                  autoComplete="off"
                  onChange={(e) => { setCaptchaValue(e.target.value); setCaptchaErrors([]); }}
                  isInvalid={!!(captchaValue.length > 6
                    ? 'Captcha should be six characters'
                    : (captchaErrors && captchaErrors.length && captchaErrors))}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {captchaValue.length > 6
                    ? 'Captcha should be six characters'
                    : (captchaErrors && captchaErrors.length && captchaErrors)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {nonFieldErrors && nonFieldErrors.length ? (
            <Alert variant="danger">
              {nonFieldErrors}
            </Alert>
          ) : ''}
          <Button variant="" type="submit" className="float-end btn-sm btn-success px-3">
            Submit Application
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
