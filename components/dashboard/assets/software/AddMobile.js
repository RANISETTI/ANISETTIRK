import {
  faCheck, faChevronLeft, faPlus, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row, Spinner, Stack,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import AddApplicationService, { EditSoftwareService } from '../../../../services/dashboard/assets/software';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import Page404 from '../../../../components/common/customerrorpages/Page404';

const sslStatusTypeOptions = [
  {
    id: 1,
    name: 'Yes',
    value: 'true',
  },
  {
    id: 2,
    name: 'No',
    value: 'false',
  },
];

export default function CreateMobileApplication(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails,
  } = useSelector((state) => state.user);

  const [hodDepartment, setHodDepartment] = useState(type === 'DEPARTMENT' ? userDetails.department : '');
  const [departmentType, setDepartmentType] = useState(type === 'DEPARTMENT' ? userDetails.department.parent : '');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [mobileApplicationName, setMobileApplicationName] = useState('');
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [sslStatusType, setSSLStatusType] = useState('');
  const [operatorLocation, setOperatorLocation] = useState();
  const [operatorLocationOptions, setOperatorLocationOptions] = useState([]);
  const [operatingSystem, setOperatingSystem] = useState('');
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([]);
  const [appAvailability, setAppAvailability] = useState();
  const [appAvailabilityOptions, setAppAvailabilityOptions] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [singlePointOfContactName, setSinglePointOfContactName] = useState('');
  const [singlePointOfContactEmail, setSinglePointOfContactEmail] = useState('');
  const [singlePointOfContactMobile, setSinglePointOfContactMobile] = useState('');
  const [inChargeName, setInChargeName] = useState('');
  const [inChargeEmail, setInChargeEmail] = useState('');
  const [inChargeMobile, setInChargeMobile] = useState('');
  const [errors, setErrros] = useState('');

  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [applicationId, setApplicationId] = useState('');

  const headers = getHeaders(accessToken);

  const router = useRouter();

  const { action } = props;

  const getDepartments = (searchText) => {
    getSecretariatDepartments(searchText, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDepartmentOptions(data.results);
        } else {
          setDepartmentOptions([]);
        }
      });
  };

  const getHodDepartments = (parentId, searchText) => {
    getHODDepartments(searchText, parentId, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDepartmentTypeOptions(data.results);
        } else {
          setDepartmentTypeOptions([]);
        }
      });
  };

  useEffect(() => {
    getDepartments('');
    getHodDepartments('');
    if (action) {
      const id = router.asPath.split('/')[5];
      genericGetService(`/admin/software-assets/${id}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            setErrros(errors);
          }
          if (data) {
            const {
              id, applicationUrl, isSecurityEnabled, department,
              appAvailability,
              developedBy,
              name,
              developmentLocation, pocName, pocEmail, pocMobile, spocName, spocEmail, spocMobile,
              inchargeName, inchargeEmail, inchargeMobile,
            } = data;
            setApplicationId(id);
            setDepartmentType(department.parent);
            setHodDepartment(department);
            setMobileApplicationName(name);
            setAppStoreUrl(applicationUrl);
            setSSLStatusType(isSecurityEnabled);
            setOperatingSystem(data.os && data.os.id);
            setAppAvailability(appAvailability);
            setCompanyName(developedBy);
            setOperatorLocation(developmentLocation);
            setContactName(pocName);
            setContactEmail(pocEmail);
            setContactMobile(pocMobile);
            setSinglePointOfContactName(spocName);
            setSinglePointOfContactEmail(spocEmail);
            setSinglePointOfContactMobile(spocMobile);
            setInChargeName(inchargeName);
            setInChargeEmail(inchargeEmail);
            setInChargeMobile(inchargeMobile);
          }
        });
    }
    genericGetService('/admin/development-types/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setOperatorLocationOptions(data);
        } else {
          setOperatorLocationOptions([]);
        }
      }).finally(() => setIsLoading(false));
    genericGetService('/admin/app-availabilities/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setAppAvailabilityOptions(data);
        } else {
          setAppAvailabilityOptions([]);
        }
      });
    genericGetService('/admin/operating-systems/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setOperatingSystemOptions(data);
        } else {
          setOperatingSystemOptions([]);
        }
      });
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    // formData.append('code', 'A');
    formData.append('type', 'm');
    formData.append('department', hodDepartment.id);
    formData.append('name', mobileApplicationName);
    formData.append('os', operatingSystem);
    formData.append('is_security_enabled', sslStatusType);
    formData.append('app_availability', appAvailability);
    formData.append('application_url', appStoreUrl);
    formData.append('development_location', operatorLocation);
    formData.append('developed_by', companyName);
    formData.append('poc_name', contactName);
    formData.append('poc_email', contactEmail);
    formData.append('poc_mobile', contactMobile);
    formData.append('spoc_name', singlePointOfContactName);
    formData.append('spoc_email', singlePointOfContactEmail);
    formData.append('spoc_mobile', singlePointOfContactMobile);
    formData.append('incharge_name', inChargeName);
    formData.append('incharge_email', inChargeEmail);
    formData.append('incharge_mobile', inChargeMobile);

    if (action) {
      EditSoftwareService(headers, applicationId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setApplicationErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/assets/software');
          }
        }).finally(() => setIsLoading(false));
    } else {
      AddApplicationService(formData, headers).then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          setApplicationErrors(applyErrors);
        } else if (data) {
          router.push('/dashboard/assets/software');
        }
      }).finally(() => setIsLoading(false));
    }
  };

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
  }

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (

    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className=" float-end" onClick={() => router.push('/dashboard/assets/software')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {action ? 'Edit' : 'Add'}
            {' '}
            Mobile Application
          </h3>
        </div>
      </Card.Header>
      <Card.Body className='p-0'>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <Card className="m-3">
            <Card.Header className="vender-text bg-transparent">
            Department Details
              </Card.Header>
              <Card.Body className="">
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Secretariat Department
                      </Form.Label>
                      <Select
                        name="department"
                        value={departmentType}
                        isDisabled={type === 'DEPARTMENT'}
                        options={departmentOptions}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue },
                        ) => {
                          switch (action) {
                            case 'set-value':
                              return prevInputValue;
                            case 'input-change':
                              if (inputValue) {
                                getDepartments(inputValue);
                              } else {
                                getDepartments('');
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        isSearchable
                        isClearable
                        closeMenuOnSelect
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (action === 'select-option' || action === 'remove-value') {
                            setDepartmentType(newValue);
                            setHodDepartment('');
                            getHodDepartments(newValue && newValue.id);
                          } else if (action === 'clear') {
                            getDepartments('');
                            setHodDepartment('');
                            setDepartmentType('');
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-required">Head of Department</Form.Label>
                      <Select
                        name="hodDepartment"
                        isClearable
                        value={hodDepartment}
                        options={departmentTypeOptions}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        isDisabled={type === 'DEPARTMENT' || !departmentType}
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue },
                        ) => {
                          switch (action) {
                            case 'set-value':
                              return prevInputValue;
                            case 'input-change':
                              if (inputValue) {
                                getHodDepartments(departmentType && departmentType.id, inputValue);
                              } else {
                                getHodDepartments(departmentType && departmentType.id, '');
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        isSearchable
                        closeMenuOnSelect
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (action === 'select-option' || action === 'remove-value') {
                            setHodDepartment(newValue);
                          } else if (action === 'clear') {
                            setHodDepartment('');
                            getHodDepartments(departmentType && departmentType.id, '');
                          }
                        }}
                      />
                    </Form.Group>
                    {
                      applicationErrors.department && (
                        <p style={{ color: '#dc3545', fontSize: '14px' }}>
                          {applicationErrors.department}
                        </p>
                      )
                    }
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                General Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Mobile Application Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileApplicationName"
                      id="mobileApplicationName"
                      onChange={(e) => {
                        setMobileApplicationName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, name: '' });
                      }}
                      required
                      value={mobileApplicationName}
                      isInvalid={!!applicationErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Mobile Application OS</Form.Label>
                    <Form.Select
                      name="operatingSystem"
                      id="operatingSystem"
                      onChange={(e) => {
                        setOperatingSystem(e.target.value);
                        setApplicationErrors({ ...applicationErrors, os: '' });
                      }}
                      value={operatingSystem}
                      isInvalid={!!applicationErrors.os}
                    >
                      <option value="">Select a type</option>
                      {operatingSystemOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.os}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Security Certificate Installed</Form.Label>
                    <Form.Select
                      name="sslStatusType"
                      id="sslStatusType"
                      onChange={(e) => {
                        setSSLStatusType(e.target.value);
                        setApplicationErrors({ ...applicationErrors, is_security_enabled: '' });
                      }}
                      value={sslStatusType}
                      isInvalid={!!applicationErrors.is_security_enabled}
                    >
                      <option value="">Select a type</option>
                      {sslStatusTypeOptions.map((option) => (
                        <option value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.is_security_enabled}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">App Availability</Form.Label>
                    <Form.Select
                      name="appAvailability"
                      id="appAvailability"
                      onChange={(e) => {
                        setAppAvailability(e.target.value);
                        setApplicationErrors({ ...applicationErrors, app_availability: '' });
                      }}
                      value={appAvailability}
                      isInvalid={!!applicationErrors.app_availability}
                    >
                      <option value="">Select a type</option>
                      {appAvailabilityOptions.map((option) => (
                        <option value={option.key}>
                          {option.text}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.app_availability}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">APP Store Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="appStoreUrl"
                      id="appStoreUrl"
                      onChange={(e) => {
                        setAppStoreUrl(e.target.value);
                        setApplicationErrors({ ...applicationErrors, application_url: '' });
                      }}
                      required
                      value={appStoreUrl}
                      isInvalid={!!applicationErrors.application_url}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.application_url}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                Mobile Application Developer Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Mobile Application Development Location</Form.Label>
                    <Form.Select
                      name="operatorLocation"
                      id="operatorLocation"
                      onChange={(e) => {
                        setOperatorLocation(e.target.value);
                        setApplicationErrors({ ...applicationErrors, development_location: '' });
                      }}
                      value={operatorLocation}
                      isInvalid={!!applicationErrors.development_location}
                    >
                      <option value="">Select a type</option>
                      {operatorLocationOptions.map((option) => (
                        <option value={option.key}>
                          {option.text}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.development_location}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Mobile Application Developer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      id="companyName"
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, developed_by: '' });
                      }}
                      required
                      value={companyName}
                      isInvalid={!!applicationErrors.developed_by}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.developed_by}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Point of Contact Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactName"
                      id="contactName"
                      onChange={(e) => {
                        setContactName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_name: '' });
                      }}
                      required
                      value={contactName}
                      isInvalid={!!applicationErrors.poc_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Point of Contact Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactEmail"
                      id="contactEmail"
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_email: '' });
                      }}
                      required
                      value={contactEmail}
                      isInvalid={!!applicationErrors.poc_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Point of Contact Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      name="contactMobile"
                      id="contactMobile"
                      onChange={(e) => {
                        setContactMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_mobile: '' });
                      }}
                      required
                      value={contactMobile}
                      isInvalid={!!applicationErrors.poc_mobile}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                Department Single Point of Contact Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Single Point of Contact Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="singlePointOfContactName"
                      id="singlePointOfContactName"
                      onChange={(e) => {
                        setSinglePointOfContactName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, spoc_name: '' });
                      }}
                      required
                      value={singlePointOfContactName}
                      isInvalid={!!applicationErrors.spoc_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.spoc_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Single Point of Contact Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="singlePointOfContactEmail"
                      id="singlePointOfContactEmail"
                      onChange={(e) => {
                        setSinglePointOfContactEmail(e.target.value);
                        setApplicationErrors({ ...applicationErrors, spoc_email: '' });
                      }}
                      required
                      value={singlePointOfContactEmail}
                      isInvalid={!!applicationErrors.spoc_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.spoc_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Single Point of Contact Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      name="singlePointOfContactMobile"
                      id="singlePointOfContactMobile"
                      onChange={(e) => {
                        setSinglePointOfContactMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, spoc_mobile: '' });
                      }}
                      required
                      value={singlePointOfContactMobile}
                      isInvalid={!!applicationErrors.spoc_mobile}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.spoc_mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">In Charge Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="inChargeName"
                      id="inChargeName"
                      onChange={(e) => {
                        setInChargeName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, incharge_name: '' });
                      }}
                      required
                      value={inChargeName}
                      isInvalid={!!applicationErrors.incharge_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.incharge_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">In Charge Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="inChargeEmail"
                      id="inChargeEmail"
                      onChange={(e) => {
                        setInChargeEmail(e.target.value);
                        setApplicationErrors({ ...applicationErrors, incharge_email: '' });
                      }}
                      required
                      value={inChargeEmail}
                      isInvalid={!!applicationErrors.incharge_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.incharge_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">In Charge Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      name="inChargeMobile"
                      id="inChargeMobile"
                      onChange={(e) => {
                        setInChargeMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, incharge_mobile: '' });
                      }}
                      required
                      value={inChargeMobile}
                      isInvalid={!!applicationErrors.incharge_mobile}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.incharge_mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {
                  applicationErrors.non_field_errors && (
                    <Alert variant="danger">
                      {applicationErrors.non_field_errors}
                    </Alert>
                  )
                }
              </Card.Body>
            </Card>
            <div className="pagenation-style px-3">
              <Button className="me-2  px-3" onClick={() => router.push('/dashboard/assets/software')} variant="danger">
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
              <Button variant="success" type="submit" className="btn btn-success  px-3">
                <FontAwesomeIcon icon={faCheck} />
                {' '}
                Submit
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {applicationErrors.nonfield_errors}
            </Form.Control.Feedback>
          </Stack>
        </Form>
      </Card.Body>
    </Card>

  );
}
