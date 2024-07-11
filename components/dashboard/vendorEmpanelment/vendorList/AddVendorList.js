import {
  faCheck, faChevronLeft, faRotate, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, InputGroup, Row, Spinner, Stack
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import generateCaptcha from '../../../../services/common/captcha';
import getServices from '../../../../services/dashboard/conference';
import {
  addPublicVendorService,
  addVendorService, addVendorTurnOverService, editProfileVendor, editVendorTurnOverServiceByVendor, getVendorTurnOverServiceForVendor
} from '../../../../services/dashboard/vendorempannelment/vendor';
import Page404 from '../../../common/customerrorpages/Page404';

const publicOrganizationArray = [
  { key: 'PRIVATE_LIMITED', value: 'PRIVATE_LIMITED', text: 'Private Limited' },
  { key: 'PUBLIC_LIMITED', value: 'PUBLIC_LIMITED', text: 'Public Limited' },
  { key: 'PARTNERSHIPS', value: 'PARTNERSHIPS', text: 'Partnerships' },
  { key: 'LLP', value: 'LLP', text: 'Limited Liability Partnership' },
  { key: 'OPS', value: 'OPS', text: 'One Person Company' },
  { key: 'SP', value: 'SP', text: 'Sole Proprietorship' }];

export default function AddVendor({ isPublic , isEdit }) {
  const { accessToken, userDetails : {organization, type} } = useSelector((state) => state.user);

  const router = useRouter();

  const { query: { id: vendorId,application_rejected } } = router;

  const [errors, setErrors] = useState('');
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [gstLink, setGstLink] = useState();
  const [panLink, setPanLink] = useState();
  const [registerDocument, setRegisterDocument] = useState();
  const [vendor, setVendor] = useState({
    name: '',
    is_verified: false,
    phone_number: '',
    email: '',
    description: '',
    address_1: '',
    address_2: '',
    city: '',
    postcode: '',
    pan: '',
    pan_proof: null,
    gst: '',
    gst_proof: null,
    type: null,
    registered_address: '',
    correspondence_address: '',
    ap_branch_address: '',
    contact_person: '',
    contact_person_designation: '',
    contact_person_landline: '',
    contact_person_mobile: '',
    contact_person_fax: '',
    contact_person_email: '',
    hod: '',
    hod_designation: '',
    hod_landline: '',
    hod_mobile: '',
    hod_fax: '',
    hod_email: '',
    website: '',
    business_start_year: null,
    tax_registration_number: '',
    account_number: '',
    bank_name: '',
    ifsc_code: '',
    branch: '',
    procurement_user_id: '',
    registration_details: '',
    registration_number: '',
    registration_date: null,
    registration_document:null,
    state: '',
  });

  const [turnover, setTurnover] = useState([]);
  const [defaultBusinessYear, setDefaultBusinessYear] = useState();
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [isApplicationAdded, setIsApplicationIsAdded] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState('');

  const [turnovers, setTurnovers] = useState({
    from_year_one: '',
    to_year_one: '',
    amount_one: '',
    from_year_two: '',
    to_year_two: '',
    amount_two: '',
    from_year_three: '',
    to_year_three: '',
    amount_three: '',
  });
  const [turnoverErrors, setTurnoverErrors] = useState([]);
  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    if (!isPublic) {
      getServices(accessToken, '/admin/vendor-types/').then(({ data, results }) => {
        if (data) {
          setOrganizationTypes(data);
          setIsLoading(false);
        }
      });
    }
    if (isEdit) {
      // setIsLoading(true);
      getServices(accessToken, `/vendors/${organization?.id}/edit`).then(({ data, errors }) => {
        if (data) {
          setVendor(data);
          if(data.website);
          setVendor({...data, website:data.website.split('https://')[1]})
          if (data.business_start_year) {
            setDefaultBusinessYear(data.business_start_year);
          }
          setPanLink(data.pan_proof);
          setGstLink(data.gst_proof);
          setRegisterDocument(data.registerDocument);
          setIsLoading(false);
        }
      });
      getVendorTurnOverServiceForVendor(accessToken, organization?.id).then(({ data }) => {
        if (data) {
          setTurnovers({
            from_year_one:data[0].year.split('-')[0],
            from_year_two:data[1].year.split('-')[0],
            from_year_three:data[2].year.split('-')[0],
            to_year_one:data[0].year.split('-')[1],
            to_year_two:data[1].year.split('-')[1],
            to_year_three:data[2].year.split('-')[1],
            amount_one:data[0].amount,
            amount_two:data[1].amount,
            amount_three:data[2].amount,
            id1:data[0].id,
            id2:data[1].id,
            id3:data[2].id,
          })
        }
      });
    }
  }, []);

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


  const addTurnovers = (id) => {
    const Promises = [];
    ['one', 'two', 'three'].map((item) => {
      const formData = new FormData();
      Object.keys(turnovers).forEach((eachItem) => {
        if (eachItem.includes(item)) {
          formData.append('year', `${turnovers[`from_year_${item}`]}-${turnovers[`to_year_${item}`]}`);
          formData.append('amount', turnovers[`amount_${item}`]);
        }
      });

      if(isEdit){
          Promises.push(editVendorTurnOverServiceByVendor(accessToken, id,turnovers.id1,{year : `${turnovers.from_year_one}-${turnovers.to_year_one}`,amount:turnovers.amount_one}));
          Promises.push(editVendorTurnOverServiceByVendor(accessToken, id,turnovers.id2,{year : `${turnovers.from_year_two}-${turnovers.to_year_two}`,amount:turnovers.amount_two}));
          Promises.push(editVendorTurnOverServiceByVendor(accessToken, id,turnovers.id3,{year : `${turnovers.from_year_three}-${turnovers.to_year_three}`,amount:turnovers.amount_three}));
      } else {
        Promises.push(addVendorTurnOverService(accessToken, id, formData));
      }
    });
    Promise.all(Promises)
      .then((res) => {
        if (res.filter((mapItem) => mapItem.errors).length) {
          setTurnoverErrors(
            res.map((item, index) => {
              if (item.errors) {
                return item.errors;
              }
            }),
          );
          setIsLoading(false);
        } else if (res.filter((mapItem) => mapItem.data).length !== 0
                  && res.filter((mapItem) => mapItem.errors).length === 0) {
                    if(isEdit){
                      router.push('/dashboard/my-profile');
                    }else {
                      router.push('/dashboard/vendor-empanelment/vendorlist');
                    }
        }
      });
  };

  const onSubmit = async () => {
    setNonFieldErrors('');
    const Promises = [];
    const newVendors = vendor;
    setIsLoading(true);

    if (typeof newVendors.pan_proof === 'string') {
      delete newVendors.pan_proof;
    }
    if (typeof newVendors.gst_proof === 'string') {
      delete newVendors.gst_proof;
    }
    if ((isEdit && defaultBusinessYear)) {
      delete newVendors.business_start_year;
    }
    if (isEdit) {
      delete newVendors.state;
    }
    const formData = new FormData();
    if (isPublic) {
      formData.append('captcha', `${captchaKey}:${captchaValue}`);
      formData.append('year_1', (turnovers.from_year_one || turnovers.to_year_one) && `${turnovers.from_year_one}-${turnovers.to_year_one}`);
      formData.append('amount_1', turnovers.amount_one);
      formData.append('year_2', `${turnovers.from_year_two}-${turnovers.to_year_two}`);
      formData.append('amount_2', turnovers.amount_two);
      formData.append('year_3', `${turnovers.from_year_three}-${turnovers.to_year_three}`);
      formData.append('amount_3', turnovers.amount_three);
    }

    Object.keys(newVendors).forEach((eachItem) => {
      formData.append(eachItem, newVendors[eachItem]);
      if (eachItem === 'registration_date') {
        formData.append('registration_date', moment(newVendors.registration_date).format('YYYY-MM-DD'));
      }
      if (eachItem === 'website') {
        formData.append('website', `${'https://'}${newVendors.website}`);
      }
    });
    if (isEdit) {
      console.log('type: ', type);
      const id = type === 'VENDOR' ? organization.id : vendorId;
      await editProfileVendor(accessToken, id, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            const turnoverErrorsArray = ['year_1', 'amount_1', 'year_2', 'amount_2', 'year_3', 'amount_3'];
            const newTurnoverErrors = {};
            const newApplicationErrors = {};
            if (applyErrors.non_field_errors) {
              setNonFieldErrors(applyErrors.non_field_errors);
            }
            Object.keys(applyErrors).map((item) => {
              if (turnoverErrorsArray.includes(item)) {
                newTurnoverErrors[item] = applyErrors[item];
              } else if (item !== 'non_field_errors') {
                newApplicationErrors[item] = applyErrors[item];
              }
            });
            setApplicationErrors(newApplicationErrors);
            setTurnoverErrors(newTurnoverErrors);
            setIsLoading(false);
          } else if (data) {
            addTurnovers(data.id)
            }
        }).finally(() => setIsLoading(false));
    } else {
      await (isPublic ? addPublicVendorService(formData)
        : addVendorService(accessToken, formData)).then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          const turnoverErrorsArray = ['year_1', 'amount_1', 'year_2', 'amount_2', 'year_3', 'amount_3'];
          const newTurnoverErrors = {};
          const newApplicationErrors = {};
          if (applyErrors.non_field_errors) {
            setNonFieldErrors(applyErrors.non_field_errors);
          }
          Object.keys(applyErrors).map((item) => {
            if (turnoverErrorsArray.includes(item)) {
              newTurnoverErrors[item] = applyErrors[item];
            } else if (item !== 'non_field_errors') {
              newApplicationErrors[item] = applyErrors[item];
            }
          });
          setApplicationErrors(newApplicationErrors);
          setTurnoverErrors(newTurnoverErrors);
          setIsLoading(false);
        } else if (data) {
          if (isPublic) {
            setIsApplicationIsAdded(true);
            setVendor({});
          }
          // else if (!turnover.length) {
          //   router.push('/dashboard/vendor-empanelment/vendorlist');
          // }
          else {
            addTurnovers(data.id);
          }
        }
      }).finally(() => setIsLoading(false));
    }
  };

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="tender-loading">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

  const onChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
    setApplicationErrors({ ...applicationErrors, [e.target.name]: '' });
  };

  const statusOptions = [
    {
      id: 1,
      value: 'APPROVED',
      name: 'Approved',
    },
    {
      id: 2,
      value: 'PENDING',
      name: 'Scrutiny Pending',
    },
    {
      id: 3,
      value: 'REJECTED',
      name: 'Rejected',
    },
  ];


  const renderTurnoversForm = () => (
    <Card className="mx-3">
      <Card.Header className="vender-text bg-transparent"> Turnover during last three financial years </Card.Header>
      {/* <Card.Body className="px-4 pb-4">
                {turnover && turnover.map((turn, index) => (
                  <Row className="my-4">
                    <Form.Group as={Col} xs={12} md={4} className="mb-3">
                      <DatePicker
                        showYearPicker
                        placeholderText="Year Form"
                        dateFormat="yyyy"
                        disabled={vendorId}
                        className="date-picker-input"
                        selected={turn.year
                          ? new Date(turn.year.split('-')[0]) : null}
                        value={turn.fromyear}
                        onChange={(e) => {
                          console.log(e, 'e');
                          setTurnover(turnover.map((item, i) => (
                            i === index ? {
                              ...item,
                              fromyear: moment(e).format('YYYY'),
                              toYear: '',
                              errors: { ...item.errors, fromyear: '' },
                            } : item
                          )));
                        }}
                        isInvalid={turn.errors && !!turn.errors.year}
                      />
                      <Form.Control.Feedback type="invalid">
                        {turn.errors && !!turn.errors.year}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={4} className="mb-3">
                      <DatePicker
                        showYearPicker
                        disabled={vendorId}
                        placeholderText="Year To"
                        dateFormat="yyyy"
                        className="date-picker-input"
                        selected={turn.year
                          ? new Date(turn.year.split('-')[1]) : null}
                        value={turn.toYear}
                        onChange={(e) => setTurnover(turnover.map((item, i) => (
                          i === index ? { ...item, toYear: moment(e).format('YYYY'), errors: { ...
                            item.errors, toYear: '' } } : item
                        )))}
                        isInvalid={turn.errors && !!turn.errors.year}
                      />
                      <Form.Control.Feedback type="invalid">
                        {turn.errors && !!turn.errors.year}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={4}>
                      <Form.Control
                        name="quantity"
                        id="quantity"
                        placeholder="Enter Amount"
                        value={turn.amount}
                        onChange={(e) => setTurnover(turnover.map((item, i) => (
                          (i === index)
                            ? {
                              ...item,
                              amount: e.target.value,
                              errors: { ...item.errors, toYear: '' },
                            } : item
                        )))}
                        isInvalid={turn.errors && !!turn.errors.amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        {turn.errors && !!turn.errors.amount}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                ))}

                <Button
                  variant="success"
                  disabled={turnover.length === 3}
                  className="float-end px-4"
                  onClick={() => setTurnover((prevState) => [...prevState, {
                    fromyear: '',
                    toYear: '',
                    amount: '',
                  }])}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add
                </Button>
              </Card.Body> */}
      <Card.Body className="px-4 pb-4">
        <Row className="my-4">
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              placeholderText="Year Form"
              dateFormat="yyyy"
              maxDate={new Date()}
              // disabled={vendorId}
              className="date-picker-input"
              selected={turnovers.from_year_one
                ? new Date(turnovers.from_year_one.split('-')[0]) : null}
              value={turnovers.from_year_one}
              onChange={(e) => {
                setTurnovers({
                  ...turnovers,
                  from_year_one: moment(e).format('YYYY'),
                });
                if (Number(moment(e).format('YYYY')) === Number(turnovers.to_year_one)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_one: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_one: '', year_1: '' });
                }
              }}
              isInvalid={turnoverErrors.year_1}
            />
            <p className="text-danger">
              {turnoverErrors.year_1}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              maxDate={new Date()}
              minDate={new Date(turnovers.from_year_one)}
              // disabled={vendorId}
              placeholderText="Year To"
              dateFormat="yyyy"
              className="date-picker-input"
              selected={turnovers.to_year_one
                ? new Date(turnovers.to_year_one.split('-')[0]) : null}
              value={turnovers.to_year_one}
              onChange={(e) => {
                setTurnovers({
                  ...turnovers,
                  to_year_one: moment(e).format('YYYY'),
                });
                if (Number(moment(e).format('YYYY')) === Number(turnovers.from_year_one)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_one: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_one: '' });
                }
              }}
            />
            <p className="text-danger">
              {turnoverErrors.year_error_one}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4}>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">&#8377;</InputGroup.Text>
              <Form.Control
                name="amount_one"
                id="amount_one"
                placeholder="Enter Amount"
                value={turnovers.amount_one}
                onChange={(e) => {
                  setTurnoverErrors({ ...turnoverErrors, amount_1: '' });
                  setTurnovers({
                    ...turnovers,
                    amount_one: e.target.value,
                  });
                }}
                isInvalid={turnoverErrors.amount_1}
              />

              <Form.Control.Feedback type="invalid">
                {turnoverErrors.amount_1}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="my-4">
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              maxDate={new Date()}
              placeholderText="Year Form"
              dateFormat="yyyy"
              minDate={new Date(turnovers.to_year_one)}
              // disabled={vendorId}
              className="date-picker-input"
              selected={turnovers.from_year_two
                ? new Date(turnovers.from_year_two.split('-')[0]) : null}
              value={turnovers.from_year_two}
              onChange={(e) => {
                if (Number(moment(e).format('YYYY')) === Number(turnovers.to_year_two)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_two: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_two: '', year_1: '' });
                }
                setTurnovers({
                  ...turnovers,
                  from_year_two: moment(e).format('YYYY'),
                });
              }}
              isInvalid={((turnoverErrors.year_2 && !!turnoverErrors.year_2) || turnoverErrors.year_error_two)}
            />
            <p className="text-danger">
              {turnoverErrors.year_2}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              // disabled={vendorId}
              placeholderText="Year To"
              maxDate={new Date()}
              minDate={new Date(turnovers.from_year_two)}
              dateFormat="yyyy"
              className="date-picker-input"
              selected={turnovers.to_year_two
                ? new Date(turnovers.to_year_two.split('-')[0]) : null}
              value={turnovers.to_year_two}
              onChange={(e) => {
                setTurnovers({
                  ...turnovers,
                  to_year_two: moment(e).format('YYYY'),
                });
                if (Number(moment(e).format('YYYY')) === Number(turnovers.from_year_two)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_two: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_two: '' });
                }
              }}
              isInvalid={(turnoverErrors.year_2 && !!turnoverErrors.year_2) || turnoverErrors.year_error_two}
            />
            <p className="text-danger">
              {turnoverErrors.year_2}
              {turnoverErrors.year_error_two && turnoverErrors.year_error_two}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">&#8377;</InputGroup.Text>
              <Form.Control
                name="amount_two"
                id="amount_two"
                placeholder="Enter Amount"
                value={turnovers.amount_two}
                onChange={(e) => {
                  setTurnovers({
                    ...turnovers,
                    amount_two: e.target.value,
                  }); setTurnoverErrors({ ...turnoverErrors, amount_2: '' });
                }}
                isInvalid={turnoverErrors.amount_2 && !!turnoverErrors.amount_2}
              />

            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {turnoverErrors.amount_2 && !!turnoverErrors.amount_2}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="my-4">
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              placeholderText="Year Form"
              dateFormat="yyyy"
              maxDate={new Date()}
              minDate={new Date(turnovers.to_year_two)}

              // disabled={vendorId}
              className="date-picker-input"
              selected={turnovers.from_year_three
                ? new Date(turnovers.from_year_three.split('-')[0]) : null}
              value={turnovers.from_year_three}
              onChange={(e) => {
                setTurnovers({
                  ...turnovers,
                  from_year_three: moment(e).format('YYYY'),
                });
                if (Number(moment(e).format('YYYY')) === Number(turnovers.to_year_three)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_three: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_three: '', year_3: '' });
                }
              }}
              isInvalid={turnoverErrors.year_3 && !!turnoverErrors.year_3}
            />
            <p className="text-danger">
              {turnoverErrors.year_3}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} className="mb-3">
            <DatePicker
              showYearPicker
              // disabled={vendorId}
              placeholderText="Year To"
              dateFormat="yyyy"
              maxDate={new Date()}
              minDate={new Date(turnovers.from_year_two)}

              className="date-picker-input"
              selected={turnovers.to_year_three
                ? new Date(turnovers.to_year_three.split('-')[0]) : null}
              value={turnovers.to_year_three}
              onChange={(e) => {
                setTurnovers({
                  ...turnovers,
                  to_year_three: moment(e).format('YYYY'),
                });
                if (Number(moment(e).format('YYYY')) === Number(turnovers.from_year_three)) {
                  setTurnoverErrors({ ...turnoverErrors, year_error_three: 'from date and to date should not be same' });
                } else {
                  setTurnoverErrors({ ...turnoverErrors, year_error_three: '' });
                }
              }}
              isInvalid={turnoverErrors.year_3 && !!turnoverErrors.year_3}
            />
            <p className="text-danger">
              {turnoverErrors.year_3}
              {turnoverErrors.year_error_three}
            </p>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4}>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">&#8377;</InputGroup.Text>

              <Form.Control
                name="amount_three"
                id="amount_three"
                placeholder="Enter Amount"
                value={turnovers.amount_three}
                onChange={(e) => {
                  setTurnovers({
                    ...turnovers,
                    amount_three: e.target.value,
                  });
                  setTurnoverErrors({ ...turnoverErrors, amount_3: '' });
                }}
                isInvalid={turnoverErrors.amount_3 && !!turnoverErrors.amount_3}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {turnoverErrors.amount_3 && !!turnoverErrors.amount_3}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Card.Body>
    </Card>
  );

  function renderFileTypes(fileType) {
    if (fileType === 'pdf') {
      return true;
    }
    return false;
  }

  function isUrlValid(userInput) {
    const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null) return false;
    return true;
  }

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className={application_rejected ? 'd-none' :" float-end"} onClick={() => router.push(isPublic ? '/services/empanelment' : '/dashboard/vendor-empanelment/vendorlist')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {application_rejected ? 'Profile details' :isEdit  ? 'Edit Profile' : vendorId ? 'Edit Vendor' : 'Apply for Vendor' }
            {' '}

          </h3>
        </div>
      </Card.Header>
      <Card.Body className="p-0 mt-3">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent">
                Organization Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">

                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Name Of the Organization</Form.Label>
                    <span>(enclose Registration  copy)</span>
                    <Form.Control
                      name="name"
                      id="name"
                      placeholder="Enter Organization Name"
                      onChange={onChange}
                      required
                      value={vendor.name}
                      isInvalid={!!applicationErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Type Of Organization</Form.Label>
                    <Form.Select
                      name="type"
                      id="type"
                      value={vendor.type}
                      onChange={onChange}
                      isInvalid={!!applicationErrors.type}
                      required
                    >
                      <option value="">Select a type</option>
                      {(isPublic ? publicOrganizationArray : organizationTypes).map((option) => (
                        <option value={option.value}>
                          {' '}
                          {option.text}
                          {' '}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.type}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Col className="mb-2" xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="form-required my-2">Address 1</Form.Label>
                      <Form.Control
                        as="textArea"
                        name="address1"
                        id="address1"
                        placeholder="Enter Address line 1"
                        onChange={onChange}
                        required
                        value={vendor.address_1}
                        isInvalid={!!applicationErrors.address_1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.address_1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="form-required my-2">Address 2</Form.Label>
                      <Form.Control
                        as="textArea"
                        name="address_2"
                        id="address_2"
                        placeholder="Enter Address line 2"
                        onChange={onChange}
                        required
                        value={vendor.address_2}
                        isInvalid={!!applicationErrors.address_2}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.address_2}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col> */}
                  <Col className="mb-2" xs={12} md={4}>
                    <Form.Group>
                      <Form.Label className="form-required my-2">Address of the Registered Office</Form.Label>
                      <Form.Control
                        name="registered_address"
                        id="registered_address"
                        placeholder="Enter Address of the Registered Office"
                        onChange={onChange}
                        required
                        value={vendor.registered_address}
                        isInvalid={!!applicationErrors.registered_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.registered_address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={4}>
                    <Form.Group>
                      <Form.Label className="form-required my-2">Address for Correspondence Office</Form.Label>
                      <Form.Control
                        name="correspondence_address"
                        id="correspondence_address"
                        placeholder="Enter Correspondence Address"
                        onChange={onChange}
                        required
                        value={vendor.correspondence_address}
                        isInvalid={!!applicationErrors.correspondence_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.correspondence_address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={4}>
                    <Form.Group>
                      <Form.Label className="form my-2">Address of the Branch in AP</Form.Label>
                      <Form.Control
                        name="ap_branch_address"
                        id="ap_branch_address"
                        placeholder="Enter Address of the Branch"
                        onChange={onChange}
                        required
                        value={vendor.ap_branch_address}
                        isInvalid={!!applicationErrors.ap_branch_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.ap_branch_address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Website</Form.Label>
                    <span>(if any)</span>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">https://</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter Website"
                        name="website"
                        id="website"
                        value={vendor.website}
                        onChange={(e) => {
                          setVendor({ ...vendor, website: e.target.value });
                          if (isUrlValid(`${'https://'}${e.target.value}`)) {
                            console.log(': ssss');
                            setApplicationErrors({ ...applicationErrors, website: '' });
                          } else {
                            setApplicationErrors({ ...applicationErrors, website: 'Please enter a valid website' });
                          }
                        }}
                        required
                        isInvalid={!!applicationErrors.website}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.website}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Year Of Commencement of Business</Form.Label>
                    {/* <Form.Control
                      type="text"
                      placeholder="Enter the Year Of Commencement of Business"
                      name="business_start_year"
                      id="business_start_year"
                      value={vendor.business_start_year}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.business_start_year}
                    /> */}
                    <DatePicker
                      showYearPicker
                      placeholderText="Year Form"
                      dateFormat="yyyy"
                      className="date-picker-input"
                      selected={vendor.business_start_year ? new Date(`${vendor.business_start_year}`) : null}
                      value={vendor.business_start_year}
                      onChange={(e) => {
                        setVendor({
                          ...vendor,
                          business_start_year: moment(e).format('YYYY'),
                        });
                        setDefaultBusinessYear(null);
                        setApplicationErrors((prevState) => ({ ...prevState, business_start_year: '' }));
                      }}
                      isInvalid={!!applicationErrors.business_start_year}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.business_start_year}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">AP GST No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter AP GST No"
                      name="gst"
                      id="gst"
                      value={vendor.gst}
                      onChange={(e) => {
                        setVendor({ ...vendor, gst: e.target.value });
                        if (/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ][0-9a-zA-Z]{1}$/.test(e.target.value)) {
                          setApplicationErrors({ ...applicationErrors, gst: '' });
                        } else {
                          setApplicationErrors({ ...applicationErrors, gst: 'Please enter a valid GST number' });
                        }
                      }}
                      required
                      isInvalid={!!applicationErrors.gst}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.gst}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Service Tax Registration No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Service Tax Registration No"
                      name="registration_number"
                      id="registration_number"
                      value={vendor.registration_number}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.registration_number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.registration_number}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">PAN No of Organization</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PAN No of Organization"
                      name="pan"
                      id="pan"
                      value={vendor.pan}
                      onChange={(e) => {
                        setVendor({ ...vendor, pan: e.target.value.toUpperCase() });
                        if (/[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/.test(e.target.value)) {
                          setApplicationErrors({ ...applicationErrors, pan: '' });
                        } else {
                          setApplicationErrors({ ...applicationErrors, pan: 'Please enter a valid PAN number' });
                        }
                      }}
                      required
                      isInvalid={!!applicationErrors.pan}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.pan}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      id="email"
                      value={vendor.email}
                      onChange={(e) => {
                        setVendor({ ...vendor, email: e.target.value });
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                          setApplicationErrors({ ...applicationErrors, email: '' });
                        } else {
                          setApplicationErrors({ ...applicationErrors, email: 'Please enter a valid email' });
                        }
                      }}
                      required
                      isInvalid={!!applicationErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mt-0" as={Col} xs={12} md={12}>
                    <Form.Label className="form-required my-2">e Procurement User Id </Form.Label>
                    <span>
                      (if not furnished,
                      limited tenders issued by APTS will not be received)

                    </span>
                    <Form.Control
                      type="text"
                      name="procurement_user_id"
                      id="procurement_user_id"
                      value={vendor.procurement_user_id}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.procurement_user_id}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.procurement_user_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent">
                {' '}
                Upload Documents
                {' '}
                <span className="text-dark" style={{ fontSize: '15px' }}>(pdf)</span>
                {' '}
              </Card.Header>
              <Card.Body>
                <Row>
                  {' '}
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">Upload PAN Card</Form.Label>
                      <span>
                        {panLink
                          && (
                            panLink.split('/').pop()
                          )}
                      </span>
                      <Form.Control
                        type="file"
                        name="file"
                        accept="application/pdf"

                        onChange={(e) => {
                          setVendor({ ...vendor, pan_proof: e.target.files[0] });
                          const fileType = e.target.files.length && e.target.files[0].name.split('.').pop();
                          if (renderFileTypes(fileType)) {
                            setApplicationErrors({ ...applicationErrors, pan_proof: '' });
                          } else {
                            setApplicationErrors({
                              ...applicationErrors,
                              pan_proof: ['Please select a Valid pdf File type'],
                            });
                          }
                        }}
                        isInvalid={!!applicationErrors.pan_proof}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.pan_proof}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">Upload GST</Form.Label>
                      <span>
                        {' '}

                        { gstLink && (gstLink.split('/').pop())}

                      </span>
                      <Form.Control
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          setVendor({ ...vendor, gst_proof: e.target.files[0] });
                          const fileType = e.target.files.length && e.target.files[0].name.split('.').pop();
                          if (renderFileTypes(fileType)) {
                            setApplicationErrors({ ...applicationErrors, gst_proof: '' });
                          } else {
                            setApplicationErrors({
                              ...applicationErrors,
                              gst_proof: ['Please select a Valid pdf File type'],
                            });
                          }
                        }}
                        isInvalid={!!applicationErrors.gst_proof}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.gst_proof}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent"> Contact Details </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Contact Person Name</Form.Label>
                    <Form.Control
                      name="contact_person"
                      id="contact_person"
                      placeholder="Enter Contact Person Name"
                      onChange={onChange}
                      required
                      value={vendor.contact_person}
                      isInvalid={!!applicationErrors.contact_person}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form my-2">Designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Designation"
                      name="contact_person_designation"
                      id="contact_person_designation"
                      value={vendor.contact_person_designation}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.contact_person_designation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person_designation}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form my-2">Land Line Phone No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Land Line Phone No"
                      name="contact_person_landline"
                      id="contact_person_landline"
                      value={vendor.contact_person_landline}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.contact_person_landline}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person_landline}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Mobile</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile No"
                        name="contact_person_mobile"
                        id="contact_person_mobile"
                        value={vendor.contact_person_mobile}
                        onChange={(e) => {
                          setVendor({ ...vendor, contact_person_mobile: e.target.value });
                          if (/[0-9]{10}/.test(e.target.value)) {
                            if (e.target.value && e.target.value.length === 10) {
                              setApplicationErrors({ ...applicationErrors, contact_person_mobile: '' });
                            } else {
                              setApplicationErrors({ ...applicationErrors, contact_person_mobile: 'Please enter a valid phone number' });
                            }
                          } else {
                            setApplicationErrors({ ...applicationErrors, contact_person_mobile: 'Please enter a valid phone number' });
                          }
                        }}
                        required
                        isInvalid={!!applicationErrors.contact_person_mobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.contact_person_mobile}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  {/* <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form my-2">Fax No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Fax No"
                      name="contact_person_fax"
                      id="contact_person_fax"
                      value={vendor.contact_person_fax}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.contact_person_fax}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person_fax}
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Contact Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      name="contact_person_email"
                      id="contact_person_email"
                      value={vendor.contact_person_email}
                      onChange={(e) => {
                        setVendor({ ...vendor, contact_person_email: e.target.value });
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                          setApplicationErrors({ ...applicationErrors, contact_person_email: '' });
                        } else {
                          setApplicationErrors({ ...applicationErrors, contact_person_email: 'Please enter a valid email' });
                        }
                      }}
                      required
                      isInvalid={!!applicationErrors.contact_person_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent"> Bank Details </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Bank Account No</Form.Label>
                    <Form.Control
                      name="account_number"
                      id="account_number"
                      placeholder="Enter Bank Account No"
                      onChange={onChange}
                      required
                      value={vendor.account_number}
                      isInvalid={!!applicationErrors.account_number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.account_number}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Name of the Bank</Form.Label>
                    <Form.Control
                      name="bank_name"
                      id="bank_name"
                      placeholder="Enter Name of the Bank"
                      onChange={onChange}
                      required
                      value={vendor.bank_name}
                      isInvalid={!!applicationErrors.bank_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.bank_name}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Name of the Branch</Form.Label>
                    <Form.Control
                      name="branch"
                      id="branch"
                      placeholder="Enter Name of the Branch"
                      onChange={onChange}
                      required
                      value={vendor.branch}
                      isInvalid={!!applicationErrors.branch}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.branch}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">IFSC Code</Form.Label>
                    <Form.Control
                      name="ifsc_code"
                      id="ifsc_code"
                      placeholder="Enter IFSC Code"
                      onChange={onChange}
                      required
                      value={vendor.ifsc_code}
                      isInvalid={!!applicationErrors.ifsc_code}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.ifsc_code}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent"> Proprietor/Partner/Directors Details </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Name of the Proprietor/Partner/Directors of the Organization</Form.Label>
                    <Form.Control
                      name="hod"
                      id="hod"
                      placeholder="Enter Organization Name"
                      onChange={onChange}
                      required
                      value={vendor.hod}
                      isInvalid={!!applicationErrors.hod}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.hod}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Designation</Form.Label>
                    <Form.Control
                      name="hod_designation"
                      id="hod_designation"
                      placeholder="Enter Designation"
                      onChange={onChange}
                      required
                      value={vendor.hod_designation}
                      isInvalid={!!applicationErrors.hod_designation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.hod_designation}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form my-2">Land Line No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Land Line No"
                      name="hod_landline"
                      id="hod_landline"
                      value={vendor.hod_landline}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.hod_landline}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.hod_landline}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Mobile</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                      <Form.Control
                        name="hod_mobile"
                        id="hod_mobile"
                        placeholder="Enter Mobile No"
                        onChange={(e) => {
                          setVendor({ ...vendor, hod_mobile: e.target.value });
                          if (/[0-9]{10}/.test(e.target.value)) {
                            if (e.target.value && e.target.value.length === 10) {
                              setApplicationErrors({ ...applicationErrors, hod_mobile: '' });
                            } else {
                              setApplicationErrors({ ...applicationErrors, hod_mobile: 'Please enter a valid phone number' });
                            }
                          } else {
                            setApplicationErrors({ ...applicationErrors, hod_mobile: 'Please enter a valid phone number' });
                          }
                        }}
                        required
                        value={vendor.hod_mobile}
                        isInvalid={!!applicationErrors.hod_mobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {' '}
                        {applicationErrors.hod_mobile}
                        {' '}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  {/* <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form my-2">FAX No</Form.Label>
                    <Form.Control
                      name="hod_fax"
                      id="hod_fax"
                      placeholder="Enter Fax no"
                      onChange={onChange}
                      required
                      value={vendor.hod_fax}
                      isInvalid={!!applicationErrors.hod_fax}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.hod_fax}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group> */}
                </Row>
              </Card.Body>

            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent"> Registration Details</Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Mail ID of the person authorized to make commitments to the APTS</Form.Label>
                    <Form.Control
                      name="hod_email"
                      id="hod_email"
                      placeholder="Enter Mail Id"
                      onChange={(e) => {
                        setVendor({ ...vendor, hod_email: e.target.value });
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                          setApplicationErrors({ ...applicationErrors, hod_email: '' });
                        } else {
                          setApplicationErrors({ ...applicationErrors, hod_email: 'Please enter a valid email' });
                        }
                      }}
                      required
                      value={vendor.hod_email}
                      isInvalid={!!applicationErrors.hod_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.hod_email}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Details of Registration</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Details of Registration"
                      name="registration_details"
                      id="registration_details"
                      value={vendor.registration_details}
                      onChange={onChange}
                      required
                      isInvalid={!!applicationErrors.registration_details}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.registration_details}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Registration No </Form.Label>
                    <Form.Control
                      name="tax_registration_number"
                      id="tax_registration_number"
                      placeholder="Enter Registration  No"
                      onChange={onChange}
                      required
                      value={vendor.tax_registration_number}
                      isInvalid={!!applicationErrors.tax_registration_number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.tax_registration_number}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Registration Date</Form.Label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select Registration Date"
                      selected={vendor.registration_date
                        ? new Date(vendor.registration_date) : null}
                      value={vendor.registration_date}
                      onChange={(date) => {
                        setVendor({ ...vendor, registration_date: date });
                        setApplicationErrors({ ...applicationErrors, registration_date: '' });
                      }}
                      className="date-picker-input"
                      isInvalid={!!applicationErrors.registration_date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.registration_date}
                      {' '}
                    </Form.Control.Feedback>
                    <p className="text-danger">
                      {applicationErrors && applicationErrors.registration_date}
                    </p>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4} controlId="formFile" className="mb-3">
                    <Form.Label className="form-required">Upload Registor Document</Form.Label>
                    <span>
                      {registerDocument
                          && (
                            registerDocument.split('/').pop()
                          )}
                    </span>
                    <Form.Control
                      type="file"
                      name="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        setVendor({ ...vendor, registration_document: e.target.files[0] });
                        const fileType = e.target.files.length && e.target.files[0].name.split('.').pop();
                        if (renderFileTypes(fileType)) {
                          setApplicationErrors({ ...applicationErrors, registration_document: '' });
                        } else {
                          setApplicationErrors({
                            ...applicationErrors,
                            registration_document: ['Please select a Valid pdf File type'],
                          });
                        }
                      }}
                      isInvalid={!!applicationErrors.registration_document}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.registration_document}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Label className="form-required my-2">Status</Form.Label>
                    <Form.Select
                      name="status"
                      id="status"
                      disabled={!vendorId}
                      value={vendor.status}
                      onChange={onChange}
                      isInvalid={!!applicationErrors.status}
                      required
                    >
                      <option value="">Select a status</option>
                      {statusOptions.map((option) => (
                        <option value={option.value}>
                          {' '}
                          {option.name}
                          {' '}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {' '}
                      {applicationErrors.status}
                      {' '}
                    </Form.Control.Feedback>
                  </Form.Group> */}
                </Row>
              </Card.Body>
            </Card>
            {renderTurnoversForm()}
            {isPublic && (
              <div className="mb-3 d-flex  mx-5 items-center">
                <div>
                  {captchaUrl && (
                  <img
                    src={captchaUrl}
                    alt="captcha"
                    className="mb-3"
                  />
                  )}
                  <FontAwesomeIcon icon={faRotate} size="2x" onClick={() => { setRefreshCaptcha(!refreshCaptcha); }} className="ms-5" />
                </div>
                <Form.Group as={Col} md={4} className="my-auto mx-5" controlId="formCaptcha">
                  <Form.Control
                    type="text"
                    id="captcha"
                    name="captcha"
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
                    required
                    isInvalid={applicationErrors.captcha}

                  />
                  <Form.Control.Feedback type="invalid">
                    {applicationErrors.captcha}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            )}
            {isApplicationAdded && (
            <Alert
              variant="success"
              className="text-end mx-3 my-5"
              onClose={() => {
                router.push('/services/empanelment');
                setIsApplicationIsAdded(false);
              }}
              dismissible
            >
              <p className="mt-2">Vendor Application Submitted Successfully </p>
            </Alert>
            )}
            <div className="pagenation-style px-3">
              <Button className="me-2  px-3" onClick={() => router.push(application_rejected ? '/dashboard' :isPublic ? '/services/empanelment' : '/dashboard/vendor-empanelment/vendorlist')} variant="danger">
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
              <Button
                variant="success"
                disabled={!(Object.values(applicationErrors).filter((item) => item === '').length === Object.keys(applicationErrors).length) || !(Object.values(turnoverErrors).filter((item) => item === '').length === Object.keys(turnoverErrors).length)}
                className="btn btn-success  "
                onClick={() => onSubmit()}
              >
                <div className="d-flex">
                  {
                  isLoading ? (
                    <div className="">
                      <Spinner style={{ width: '15px', height: '15px', margin: '0' }} animation="border" role="status" />
                    </div>
                  ) : (
                    <FontAwesomeIcon icon={faCheck} style={{ width: '15px', height: '15px', margin: '5px 0 0 0' }} />
                  )

                  }
                  <p style={{ margin: '0 0 0 10px' }}>Submit</p>

                </div>

              </Button>
            </div>
            {
              nonFieldErrors && (
              <p style={{ color: 'red', margin: '0 0 0 40px' }}>
                {nonFieldErrors}
              </p>
              )
            }
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}
