import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDays, subDays } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, CloseButton, Col, Form, InputGroup, Modal, Row, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import applyJobService from '../../services/ApplyJobService';
import generateCaptcha from '../../services/common/captcha';
import { genericGetService } from '../../services/GenericService';

export default function ApplyJob(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedQualifications, setSelectedQualifications] = useState();
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [yearOfPassing, setYearOfPassing] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [applyErrors, setApplyErrors] = useState({});
  const [submitLoader, setSubmitLoader] = useState(false);

  const { handleSubmit } = useForm();

  const {
    selectedJobId, selectedJobName, onClose, onHide,
  } = props;

  const getQualifications = () => {
    genericGetService(`/qualifications/?job_id=${selectedJobId}`, {})
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors: ', errors);
        }
        if (data) {
          setQualificationOptions(data);
        }
      });
  };

  useEffect(() => {
    if (selectedJobId) {
      getQualifications();
    }
  }, [selectedJobId]);

  function GenerateCaptcha() {
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
  }

  const onSubmit = () => {
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('resume', resume);
    formData.append('message', message);
    formData.append('captcha', `${captchaKey}:${captchaValue}`);
    formData.append('qualification', selectedQualifications && selectedQualifications.id);
    formData.append('year_of_pass', yearOfPassing ? moment(yearOfPassing).format('YYYY') : '');
    applyJobService(selectedJobId, formData)
      .then(({ data, errors: applyErrors }) => {
        if (applyErrors) {
          setApplyErrors(applyErrors);
          setRefreshCaptcha(true);
          GenerateCaptcha();
        } else {
          setSelectedQualifications('');
          setYearOfPassing();
          onClose();
        }
      }).finally(() => setSubmitLoader(false));
  };

  useEffect(() => {
    GenerateCaptcha();
  }, [refreshCaptcha]);

  function renderFileTypes(fileType) {
    if (fileType === 'pdf') {
      return true;
    }
    return false;
  }

  console.log('applyErrors: ', applyErrors, Object.keys(applyErrors).length);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedJobName}
        </Modal.Title>
        <CloseButton onClick={() => {
          setRefreshCaptcha(true);
          onHide();
          setName('');
          setEmail('');
          setPhoneNumber('');
          setSelectedQualifications();
          setYearOfPassing();
          setResume('');
          setMessage('');
          setApplyErrors({});
          setCaptchaValue('');
        }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-required">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setApplyErrors({ ...applyErrors, name: '', non_field_errors: '' });
                  }}
                  isInvalid={applyErrors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {applyErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-required">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                      setApplyErrors({ ...applyErrors, email: '', non_field_errors: '' });
                    } else {
                      setApplyErrors({ ...applyErrors, email: 'Please enter a valid email' });
                    }
                  }}
                  isInvalid={applyErrors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {applyErrors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label className="form-required">Phone Number</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                  <Form.Control
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="off"
                    placeholder="Phone Number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (/[0-9]{10}/.test(e.target.value)) {
                        if (e.target.value && e.target.value.length === 10) {
                          setApplyErrors({ ...applyErrors, phone_number: '', non_field_errors: '' });
                        } else {
                          setApplyErrors({ ...applyErrors, phone_number: 'Please enter a valid phone number' });
                        }
                      } else {
                        setApplyErrors({ ...applyErrors, phone_number: 'Please enter a valid phone number' });
                      }
                    }}
                    isInvalid={applyErrors.phone_number}
                    required
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    {applyErrors.phone_number}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="form-required">
                  Educational Qualifications
                </Form.Label>
                <Select
                  name="qualifications"
                  value={selectedQualifications}
                  options={qualificationOptions}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  isSearchable
                  isClearable
                  closeMenuOnSelect
                  onChange={(newValue, actionMeta) => {
                    const { action } = actionMeta;
                    if (action === 'select-option' || action === 'remove-value') {
                      setSelectedQualifications(newValue);
                    } else if (action === 'clear') {
                      getQualifications();
                      setSelectedQualifications('');
                    }
                    setApplyErrors({ ...applyErrors, qualification: '', non_field_errors: '' });
                  }}
                />
                <span style={{ color: 'red' }}>
                  {applyErrors.qualification}
                </span>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="form-required">Year of Passing</Form.Label>
                <DatePicker
                  selected={yearOfPassing}
                  onChange={(e) => { setYearOfPassing(e); setApplyErrors({ ...applyErrors, year_of_pass: '', non_field_errors: '' }); }}
                  minDate={subDays(new Date(), 14600)}
                  maxDate={addDays(new Date(), 5)}
                  placeholderText="Year of Passing"
                  showYearPicker
                  dateFormat="yyyy"
                  className="date-picker-input"
                />
                <span style={{ color: 'red' }}>
                  {applyErrors.year_of_pass}
                </span>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="form-required">Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                    const fileType = e.target.files[0].name.split('.').pop();
                    if (renderFileTypes(fileType)) {
                      setApplyErrors({ ...applyErrors, resume: '', non_field_errors: '' });
                    } else {
                      setApplyErrors({ ...applyErrors, resume: 'Please select a valid pdf file type' });
                    }
                  }}
                  isInvalid={applyErrors.resume}
                />
                <Form.Control.Feedback type="invalid">
                  {applyErrors.resume}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="form-required">Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="message"
              name="message"
              autoComplete="off"
              placeholder="Message"
              onChange={(e) => {
                setMessage(e.target.value);
                setApplyErrors({ ...applyErrors, message: '', non_field_errors: '' });
              }}
              isInvalid={applyErrors.message}
              required
            />
            <Form.Control.Feedback type="invalid">
              {applyErrors.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col style={{ margin: 'auto' }}>
              {captchaUrl && (
                <img
                  src={captchaUrl}
                  alt="captcha"
                  className="captcha-img me-3"
                />
              )}
              <FontAwesomeIcon icon={faRotate} size="2x" onClick={() => { setRefreshCaptcha(!refreshCaptcha); }} />
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCaptcha">
                <Form.Label className="form-required">Captcha</Form.Label>
                <Form.Control
                  type="text"
                  id="captchaValue"
                  name="captchaValue"
                  placeholder="Enter Captcha"
                  autoComplete="off"
                  onChange={(e) => {
                    setCaptchaValue(e.target.value);
                    if (/^[A-Z]{6}$/.test(e.target.value)) {
                      setApplyErrors({ ...applyErrors, captcha: '', non_field_errors: '' });
                    } else {
                      setApplyErrors({ ...applyErrors, captcha: 'Captcha should be six characters long with all uppercase' });
                    }
                  }}
                  isInvalid={applyErrors.captcha}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {applyErrors.captcha}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {applyErrors.non_field_errors ? (
            <Alert variant="danger">
              {applyErrors.non_field_errors}
            </Alert>
          ) : ''}
          <Button variant="" type="submit" className="float-end btn-sm btn-success px-3 py-2" disabled={!(Object.values(applyErrors).filter((item) => item === '').length === Object.keys(applyErrors).length)}>
            {submitLoader && (
            <Spinner animation="border" role="status" size="sm" className="me-1" />
            )}
            Submit Application
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
