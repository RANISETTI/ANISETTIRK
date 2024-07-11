import {
  faCheck, faChevronLeft, faRotate, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subDays } from 'date-fns';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Card, Col, Form, InputGroup, Row, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import generateCaptcha from '../../services/common/captcha';
import axiosInstance from '../../services/config';
import getServices from '../../services/dashboard/conference';
import {
  approveVideoConferenceBooking, createAdminVideoConferenceBooking, createVideoConferenceBooking,
  editVideoConferenceBooking, restoreVideoConferenceBooking,
} from '../../services/home';

export default function VideoConferenceForm(props) {
  const [requestType, setRequestType] = useState('REGULAR');
  const [slotBookingLevel, setSlotBookingLevel] = useState('state');
  const [cmoLetterNo, setCmoLetterNo] = useState('');
  const [cmoLetterDate, setCmoLetterDate] = useState('');
  const [requestDate, setRequestDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [departmentOptions, setDepartmentOptions] = useState('');
  const [department, setDepartment] = useState();
  const [locationOptions, setLocationOptions] = useState('');
  const [location, setLocation] = useState();
  const [districtOptions, setDistrictOptions] = useState('');
  const [district, setDistrict] = useState('');
  const [requestionOfficer, setRequestionOfficer] = useState('');
  const [subjectOfConference, setSubjectOfConference] = useState('');
  const [listOfParticipants, setListOfParticipants] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fax, setFax] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAppointment, setIsAppointment] = useState('');

  const { handleSubmit } = useForm();

  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const { accessToken, isLoggedIn } = useSelector((state) => state.user);
  const router = useRouter();

  const { query: { id } } = router;

  const generateCaptchaValue = () => {
    generateCaptcha()
      .then(({ data, errors: captchaErrors }) => {
        if (captchaErrors && Object.keys(captchaErrors).length) {
          console.log('Captcha Generation Errors', captchaErrors);
        } else {
          const { key, url } = data;
          setCaptchaKey(key);
          setCaptchaUrl(url);
        }
        // setTimeout(() => generateCaptchaValue(), 20000);
      });
  };

  const getDepartments = () => {
    setIsLoading(true);
    getServices(accessToken, '/vc-departments/').then((res) => {
      setDepartmentOptions(res.data);
    }).finally(() => setIsLoading(false));
  };

  const getLocations = () => {
    setIsLoading(true);
    getServices(accessToken, '/vc-locations/').then((res) => {
      setLocationOptions(res.data);
    }).finally(() => setIsLoading(false));
  };

  const getDistricts = () => {
    setIsLoading(true);
    axiosInstance.get('/districts/')
      .then((res) => {
        setDistrictOptions(res);
      }).finally(() => setIsLoading(false));
  };

  const getAppointments = () => {
    const statelevel = slotBookingLevel === 'state';
    const districtlevel = slotBookingLevel === 'district';
    const date = moment(requestDate).format('YYYY-MM-DD');
    axiosInstance.get(`conferences/?state_level=${statelevel || ''}&district_level=${districtlevel || ''}&requested_date=${date}`).then((res) => {
      if (res.results && res.results) {
        setIsAppointment(res.results);
      } else {
        setIsAppointment([]);
      }
    });
  };

  useEffect(() => {
    if (slotBookingLevel && requestDate) {
      getAppointments();
    }
    if (startDate && endDate) {
      if (startDate > endDate) {
        setApplicationErrors({ ...applicationErrors, end_date: 'End time should be grater than start time' });
      }
    } else if (startDate && !endDate) {
      const currentDate = new Date();
      const startTime = moment(startDate).format('THH:mmZ');
      const currentTime = moment(new Date()).format('THH:mmZ');
      if ((moment(requestDate).format('DD-MM-YYYY') === moment(currentDate).format('DD-MM-YYYY'))) {
        if (currentTime > startTime) {
          setApplicationErrors({ ...applicationErrors, start_date: 'Start time should be grater than current time' });
        }
      }
    }
  }, [slotBookingLevel, requestDate, startDate, endDate]);

  useEffect(() => {
    generateCaptchaValue();
    getDepartments();
    getLocations();
    getDistricts();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getServices(accessToken, `/admin/conferences/${id}/`).then(({ data, errors }) => {
        if (data) {
          const {
            cmo_letter_date, cmo_letter_no, type, cmo_letter_scan_copy, department, district, email,
            start_date, end_date, fax, location, participants, phone_number, request_date,
            requisition_officer, subject, type_display_name, is_approved, is_deleted,
          } = data;
          setRequestType(type);
          if (cmo_letter_no) {
            setRequestType('SPECIAL');
          }
          setCmoLetterNo(cmo_letter_no);
          setCmoLetterDate(cmo_letter_date);
          setRequestDate(request_date);
          setStartDate(start_date);
          setEndDate(end_date);
          if (district && district.id) {
            setSlotBookingLevel('district');
          } else {
            setSlotBookingLevel('state');
          }
          setRequestionOfficer(requisition_officer);
          setSubjectOfConference(subject);
          setListOfParticipants(participants);
          setEmailId(email);
          setPhoneNumber(phone_number);
          setFax(fax);
          setDepartment(department.id);
          setLocation(location && location.id);
          setDistrict(district && district.id);
          setIsApproved(is_approved);
          setIsDeleted(is_deleted);
        } else {
          console.log(errors);
        }
      });
    }
  }, [id]);

  const onSubmit = () => {
    const formData = new FormData();
    const startTime = startDate ? moment(startDate).format('THH:mmZ') : '';
    const endTime = endDate ? moment(endDate).format('THH:mmZ') : '';
    setSubmitLoader(true);
    if (district) {
      formData.append('district', district);
    } else {
      formData.append('location', location);
    }
    formData.append('type', requestType);
    if (requestType === 'SPECIAL') {
      formData.append('cmo_letter_no', cmoLetterNo);
      formData.append('cmo_letter_date', moment(cmoLetterDate).format('YYYY-MM-DD'));
      formData.append('cmo_letter_scan_copy', '');
    } else {
      formData.append('cmo_letter_no', '');
      formData.append('cmo_letter_date', '');
      formData.append('cmo_letter_scan_copy', '');
    }
    formData.append('request_date', moment(requestDate).format('YYYY-MM-DD'));
    formData.append('start_date', requestDate ? `${moment(requestDate).format('YYYY-MM-DD')}${startTime}` : '');
    formData.append('end_date', requestDate ? `${moment(requestDate).format('YYYY-MM-DD')}${endTime}` : '');
    formData.append('requisition_officer', requestionOfficer);
    formData.append('subject', subjectOfConference);
    formData.append('participants', listOfParticipants);
    formData.append('email', emailId);
    formData.append('phone_number', phoneNumber);
    formData.append('fax', fax);
    formData.append('department', department);
    if (!id) {
      formData.append('captcha', `${captchaKey}:${captchaValue}`);
    }

    let apiPath;
    if (id && isDeleted) {
      apiPath = restoreVideoConferenceBooking(accessToken, id);
    } else if (id) {
      apiPath = editVideoConferenceBooking(accessToken, id, formData);
    } else if (isLoggedIn) {
      apiPath = createAdminVideoConferenceBooking(accessToken, formData);
    } else {
      apiPath = createVideoConferenceBooking(formData);
    }

    apiPath.then(({ data, errors }) => {
      if (errors && Object.keys(errors).length) {
        setApplicationErrors(errors);
        generateCaptchaValue();
      }
      if (data) {
        if (id) {
          approveVideoConferenceBooking(accessToken, id, { is_approved: isApproved })
            .then(({ data, errors }) => {
              if (errors) {
                console.log('errors: ', errors);
              }
              if (data) {
                console.log('data: ', data);
              }
            });
        }
        const { detail } = data;
        if (data && isLoggedIn) {
          router.push('/dashboard/conference/bookings?page=1');
        } else {
          setSuccessMessage(detail);
        }
        generateCaptchaValue();
        setRequestType('');
        setCmoLetterNo('');
        setCmoLetterDate('');
        setRequestDate('');
        setStartDate();
        setEndDate();
        setRequestionOfficer('');
        setSubjectOfConference('');
        setListOfParticipants('');
        setEmailId('');
        setPhoneNumber('');
        setFax('');
        setDepartment();
        setLocation();
        setLocation('');
        setDistrict('');
        setCaptchaValue('');
      }
    }).finally(() => setSubmitLoader(false));
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderSuccessMessage = () => (
    <Alert
      variant="success"
      onClose={() => {
        setSuccessMessage('');
        router.push('/infrastructure-support/vc-management');
      }}
      dismissible
    >
      <p>
        {successMessage}
      </p>
    </Alert>
  );

  const renderAppointmentDetails = () => (
    <Alert
      variant="info"
    >
      <div>
        <h5>
          We have found
          {' '}
          {isAppointment.length}
          {' '}
          bookings
          {' '}
        </h5>
        {
        isAppointment.map((appointment, index) => (
          <p>
            {index + 1}
            {' '}
            .

            {appointment.department.name}
            {' '}
            -
            {moment(appointment.request_date).format('DD-MM-YYYY dddd')}
            {' '}
            {moment(appointment.start_date).format('HH:mm A')}
          </p>
        ))
        }
      </div>
    </Alert>
  );

  return (
    <Card className="pb-4">
      <Card.Header className="pt-3 bg-transparent ">
        <div className="d-flex justify-content-between">
          {id ? (<h2 className="your-cart">Edit Video Conference Booking</h2>) : (
            <h2 className="your-cart">
              {isLoggedIn && 'Add'}
              {' '}
              Video Conference Booking
            </h2>
          )}
          {!isLoggedIn && (
            <Row>
              <Col className="d-flex justify-content-end">
                {' '}
                <Button className="px-3 mb-3 text-nowrap" onClick={() => router.back()}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {' '}
                  &nbsp;
                  Back
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} className="my-2">
              <Form.Label column sm={3} className="form-required">
                Slot Booking Level
              </Form.Label>
              <Col sm={9}>
                <div>
                  <Form.Check
                    inline
                    label="State Level"
                    name="slotBookingLevel"
                    type="radio"
                    id="state"
                    value={slotBookingLevel}
                    checked={slotBookingLevel === 'state'}
                    onChange={(e) => {
                      setSlotBookingLevel('state');
                      setApplicationErrors({ ...applicationErrors, non_field_errors: '' });
                    }}
                  />
                  <Form.Check
                    inline
                    label="District Level"
                    name="slotBookingLevel"
                    type="radio"
                    id="district"
                    value={slotBookingLevel}
                    checked={slotBookingLevel === 'district'}
                    onChange={(e) => {
                      setSlotBookingLevel('district');
                      setApplicationErrors({ ...applicationErrors, non_field_errors: '' });
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            {/* <Form.Group as={Row} className="my-2">
              <Form.Label column sm={3} className="form-required">
                Request Type
              </Form.Label>
              <Col sm={9}>
                <div>
                  <Form.Check
                    inline
                    value={requestType}
                    label="Regular"
                    name="requestType"
                    type="radio"
                    id="regular"
                    checked={requestType === 'REGULAR'}
                    onChange={(e) => {
                      setRequestType('REGULAR');
                      setApplicationErrors({ ...applicationErrors, request_type: '' });
                    }}
                  />
                  <Form.Check
                    inline
                    value={requestType}
                    label="Special (CMO/CSO Approval)"
                    name="requestType"
                    type="radio"
                    id="special"
                    checked={requestType === 'SPECIAL'}
                    onChange={(e) => {
                      setRequestType('SPECIAL');
                      setApplicationErrors({ ...applicationErrors, request_type: '' });
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {applicationErrors.type}
            </Form.Control.Feedback> */}
            {/* {requestType === 'SPECIAL' ? (
              <Row>
                <Form.Group as={Col} className="my-2" xs={12} md={4}>
                  <Form.Label sm={3} className="form-required">
                    CMO/CSO Letter No
                  </Form.Label>
                  <Form.Control
                    type="text"

                    name="cmoLetterNo"
                    id="cmoLetterNo"
                    onChange={(e) => {
                      setCmoLetterNo(e.target.value);
                      setApplicationErrors({ ...applicationErrors, cmo_letter_no: '' });
                    }}
                    required
                    value={cmoLetterNo}
                    isInvalid={!!applicationErrors.cmo_letter_no}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.cmo_letter_no}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="my-2" xs={12} md={4}>
                  <Form.Label sm={3} className="form-required">
                    CMO/CSO Letter Date
                  </Form.Label>
                  <DatePicker
                    selected={cmoLetterDate ? new Date(cmoLetterDate) : null}
                    onChange={(e) => {
                      setCmoLetterDate(e);
                      setApplicationErrors({ ...applicationErrors, cmo_letter_date: '' });
                    }}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="CMO LetterDate"
                    className="date-picker-input"
                  />
                  {applicationErrors.cmo_letter_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {applicationErrors.cmo_letter_date}
                    </p>
                  ) : ''}
                </Form.Group>
                <Form.Group as={Col} className="my-2" xs={12} md={4}>
                  <Form.Label sm={3} className="form">
                    Approved Scan Copy
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={(e) => {
                      setApprovedScanCopy(e.target.files[0]);
                      setApplicationErrors({ ...applicationErrors, cmo_letter_scan_copy: '' });
                    }}
                    isInvalid={!!applicationErrors.cmo_letter_scan_copy}
                  />
                  {approvedScanCopyLink && (
                    <Link href={approvedScanCopyLink}>
                      <a target="_blank">
                        { approvedScanCopyLink.split('/').pop()}
                      </a>
                    </Link>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.cmo_letter_scan_copy}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            ) : ''} */}
            <Row>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form-required">
                    Request Date
                  </Form.Label>
                  <DatePicker
                    onChange={(e) => {
                      setRequestDate(e);
                      setApplicationErrors({ ...applicationErrors, request_date: '', non_field_errors: '', start_date: '' });
                    }}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Request Date"
                    selected={requestDate ? new Date(requestDate) : null}
                    value={requestDate}
                    className="date-picker-input"
                    minDate={moment().toDate()}
                    isClearable
                  />
                  {applicationErrors.request_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {applicationErrors.request_date}
                    </p>
                  ) : ''}
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form form-required">
                    Start Time
                  </Form.Label>
                  <div className="mx-1">
                    <DatePicker
                      selected={startDate ? new Date(startDate) : null}
                      onChange={(e) => {
                        setStartDate(e);
                        setApplicationErrors({ ...applicationErrors, start_date: '', non_field_errors: '' });
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={10}
                      dateFormat="h:mm aa"
                      minTime={new Date(0, 0, 0, 9, 0)}
                      maxTime={new Date(0, 0, 0, 22, 0)}
                      placeholderText="Start time"
                      className="date-picker-input"
                      isClearable
                    />
                  </div>
                  {applicationErrors.start_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {applicationErrors.start_date}
                    </p>
                  ) : ''}
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form form-required">
                    End Time
                  </Form.Label>
                  <div>
                    <DatePicker
                      selected={endDate ? new Date(endDate) : null}
                      onChange={(e) => {
                        setEndDate(e);
                        setApplicationErrors({ ...applicationErrors, end_date: '', non_field_errors: '' });
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={10}
                      minTime={new Date(0, 0, 0, 9, 0)}
                      maxTime={new Date(0, 0, 0, 22, 0)}
                      dateFormat="h:mm aa"
                      placeholderText="End Time"
                      className="date-picker-input"
                      disabled={!(startDate && !isNaN(startDate))}
                      isClearable
                    />
                  </div>
                  {applicationErrors.end_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {applicationErrors.end_date}
                    </p>
                  ) : ''}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    Department
                  </Form.Label>
                  <Form.Select
                    name="department"
                    id="department"
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      setApplicationErrors({ ...applicationErrors, department: '', non_field_errors: '' });
                    }}
                    required
                    isInvalid={!!applicationErrors.department}
                  >
                    <option value="">Select a type</option>
                    {departmentOptions && departmentOptions.map((option) => (
                      <option value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.department}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {slotBookingLevel === 'district'
                ? (
                  <Col className="mb-3" xs={12} md={4}>
                    <Form.Group>
                      <Form.Label sm={3} className="form-required">
                        District
                      </Form.Label>
                      <Form.Select
                        name="district"
                        id="district"
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setApplicationErrors({ ...applicationErrors, district: '', non_field_errors: '' });
                        }}
                        required
                        isInvalid={!!applicationErrors.district}
                      >
                        <option value="">Select a district</option>
                        {districtOptions && districtOptions.map((option) => (
                          <option value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.district}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                ) : (
                  <Col className="mb-3" xs={12} md={4}>
                    <Form.Group>
                      <Form.Label sm={3} className="form-required">
                        Location
                      </Form.Label>
                      <Form.Select
                        name="location"
                        id="location"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          setApplicationErrors({ ...applicationErrors, location: '', non_field_errors: '' });
                        }}
                        required
                        isInvalid={!!applicationErrors.location}
                      >
                        <option value="">Select a location</option>
                        {locationOptions && locationOptions.map((option) => (
                          <option value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.location}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    Requestion Officer
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="requisition_officer"
                    id="requisition_officer"
                    onChange={(e) => {
                      setRequestionOfficer(e.target.value);
                      setApplicationErrors({ ...applicationErrors, requisition_officer: '', non_field_errors: '' });
                    }}
                    required
                    value={requestionOfficer}
                    isInvalid={!!applicationErrors.requisition_officer}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.requisition_officer}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3" xs={12} md={12}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    Subject of Conference
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subjectOfConference"
                    id="subjectOfConference"
                    onChange={(e) => {
                      setSubjectOfConference(e.target.value);
                      setApplicationErrors({ ...applicationErrors, subject: '', non_field_errors: '' });
                    }}
                    required
                    value={subjectOfConference}
                    isInvalid={!!applicationErrors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.subject}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3" xs={12} md={12}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    List of Participants
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="listOfParticipants"
                    id="listOfParticipants"
                    onChange={(e) => {
                      setListOfParticipants(e.target.value);
                      setApplicationErrors({ ...applicationErrors, participants: '', non_field_errors: '' });
                    }}
                    required
                    value={listOfParticipants}
                    isInvalid={!!applicationErrors.participants}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.participants}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3" xs={12} md={6}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    Email Id
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="emailId"
                    id="emailId"
                    onChange={(e) => {
                      setEmailId(e.target.value);
                      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                        setApplicationErrors({ ...applicationErrors, email: '', non_field_errors: '' });
                      } else {
                        setApplicationErrors({ ...applicationErrors, email: 'Please enter a valid email' });
                      }
                    }}
                    required
                    value={emailId}
                    isInvalid={!!applicationErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={6}>
                <Form.Group>
                  <Form.Label sm={3} className="form-required">
                    Phone Number
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (/[0-9]{10}/.test(e.target.value)) {
                          if (e.target.value && e.target.value.length === 10) {
                            setApplicationErrors({ ...applicationErrors, phone_number: '', non_field_errors: '' });
                          } else {
                            setApplicationErrors({ ...applicationErrors, phone_number: 'Please enter a valid phone number' });
                          }
                        } else {
                          setApplicationErrors({ ...applicationErrors, phone_number: 'Please enter a valid phone number' });
                        }
                      }}
                      required
                      value={phoneNumber}
                      isInvalid={!!applicationErrors.phone_number}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.phone_number}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              {/* <Form.Group as={Col} className="my-2" xs={12} md={4}>
                <Form.Label sm={3}>
                  Fax
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fax"
                  id="fax"
                  onChange={(e) => {
                    setFax(e.target.value);
                    setApplicationErrors({ ...applicationErrors, fax: '' });
                  }}
                  required
                  value={fax}
                  isInvalid={!!applicationErrors.fax}
                />
                <Form.Control.Feedback type="invalid">
                  {applicationErrors.fax}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Row>
            {id && (
              <Form.Group className="my-2">
                <Form.Check
                  type="checkbox"
                  id="isApproved"
                  label="Approve"
                  onChange={() => { setIsApproved(!isApproved); setApplicationErrors({ ...applicationErrors, non_field_errors: '' }); }}
                  checked={isApproved}
                />
              </Form.Group>
            )}
            {isLoggedIn ? (
              ''
            ) : (
              <Form.Group className="my-2">
                <Form.Label className="form-required">
                  Captcha
                </Form.Label>
                <Col>
                  <Row>
                    <Col sm={4}>
                      {captchaUrl && (
                        <img
                          src={captchaUrl}
                          alt="captcha"
                        />
                      )}
                      <FontAwesomeIcon icon={faRotate} size="2x" onClick={() => { generateCaptchaValue(); }} className="mar-L-30" />
                    </Col>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        id="captchaValue"
                        name="captchaValue"
                        placeholder="Enter Captcha"
                        autoComplete="off"
                        onChange={(e) => {
                          setCaptchaValue(e.target.value);
                          if (/^[A-Z]{6}$/.test(e.target.value)) {
                            setApplicationErrors({ ...applicationErrors, captcha: '', non_field_errors: '' });
                          } else {
                            setApplicationErrors({ ...applicationErrors, captcha: 'Captcha should be six characters long with all uppercase' });
                          }
                        }}
                        isInvalid={applicationErrors.captcha}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.captcha}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
            )}
            {(isAppointment.length && !id) ? renderAppointmentDetails() : ''}
            <div className="pagenation-style mt-2">
              {
                isLoggedIn ? (
                  <Button className="me-2 btn-md px-3" onClick={() => router.push('/dashboard/conference/bookings')} variant="danger">
                    <FontAwesomeIcon icon={faTimes} className="me-1" />
                    Cancel
                  </Button>
                ) : (
                  <Button className="me-2 btn-md px-3" onClick={() => router.reload()} variant="danger">
                    <FontAwesomeIcon icon={faRotate} className="me-1" />
                    Reset
                  </Button>
                )
              }
              { id && isDeleted ? (
                <Button variant="primary" type="submit" className="btn btn-success btn-md px-3">
                  <FontAwesomeIcon icon={faCheck} className="me-1" />
                  Restore
                </Button>
              ) : (
                <Button variant="success" type="submit" className="btn btn-success btn-md px-3" disabled={!(Object.values(applicationErrors).filter((item) => item === '').length === Object.keys(applicationErrors).length)}>
                  {submitLoader
                    ? <Spinner animation="border" role="status" size="sm" className="me-1" />
                    : <FontAwesomeIcon icon={faCheck} className="me-1" />}
                  {id ? 'Update' : 'Submit'}
                </Button>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              {applicationErrors.nonfield_errors}
            </Form.Control.Feedback>
          </Form>
        </div>
      </Card.Body>
      {successMessage ? renderSuccessMessage() : ''}
    </Card>

  );
}
