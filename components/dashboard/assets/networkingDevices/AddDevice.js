import { faChevronLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button, Card, Col, Form, Row, Spinner, Stack,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { AddNetworkingDeviceService, EditNetworkingDeviceService } from '../../../../services/dashboard/assets/networkingDevices';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import Page404 from '../../../common/customerrorpages/Page404';

export default function AddNetworkingDevice(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails,
  } = useSelector((state) => state.user);
  const [department, setDepartment] = useState();
  const [hodDepartment, setHodDepartment] = useState(type === 'DEPARTMENT' ? userDetails.department : '');
  const [departmentType, setDepartmentType] = useState(type === 'DEPARTMENT' ? userDetails.department.parent : '');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [deviceType, setDeviceType] = useState();
  const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [deviceMake, setDeviceMake] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [singlePointOfContactName, setSinglePointOfContactName] = useState('');
  const [singlePointOfContactEmail, setSinglePointOfContactEmail] = useState('');
  const [singlePointOfContactMobile, setSinglePointOfContactMobile] = useState('');
  const [maintainedBy, setMaintainedBy] = useState();
  const [maintainedByOptions, setMaintainedByOptions] = useState([]);
  const [serviceProviderName, setServiceProviderName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [serviceProviderMobile, setServiceProviderMobile] = useState('');
  const [serviceProviderEmail, setServiceProviderEmail] = useState('');
  const [errors, setErrors] = useState();
  const [applicationId, setApplicationId] = useState('');

  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const headers = getHeaders(accessToken);

  const { action } = props;

  const router = useRouter();
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
    setIsLoading(true);
    if (action) {
      const id = router.asPath.split('/')[5];
      genericGetService(`/admin/networking-assets/${id}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            setErrors(errors);
          }
          if (data) {
            const {
              id, department, type: { id: typeId }, quantity,
              otherDetails, make, model, maintainedBy, providerName, providerEmail,
              providerMobile, spocName, spocEmail, spocMobile, contactPersonName,
            } = data;
            setApplicationId(id);
            setDepartmentType(department.parent);
            setHodDepartment(department);
            setDeviceType(typeId);
            setQuantity(quantity);
            setDeviceMake(make);
            setDeviceModel(model);
            setOtherDetails(otherDetails);
            setMaintainedBy(maintainedBy);
            setContactPersonName(contactPersonName);
            setServiceProviderName(providerName);
            setServiceProviderEmail(providerEmail);
            setServiceProviderMobile(providerMobile);
            setSinglePointOfContactName(spocName);
            setSinglePointOfContactEmail(spocEmail);
            setSinglePointOfContactMobile(spocMobile);
          }
        });
    }
    genericGetService('/admin/server-maintenance/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setMaintainedByOptions(data);
        } else {
          setMaintainedByOptions([]);
        }
      });
    genericGetService('/networking-devices/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDeviceTypeOptions(data);
        } else {
          setDeviceTypeOptions([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('code', 'A');
    formData.append('quantity', quantity);
    formData.append('other_details', otherDetails);
    formData.append('model', deviceModel);
    formData.append('make', deviceMake);
    formData.append('maintained_by', maintainedBy);
    formData.append('contact_person_name', contactPersonName);
    formData.append('provider_name', serviceProviderName);
    formData.append('provider_email', serviceProviderEmail);
    formData.append('provider_mobile', serviceProviderMobile);
    formData.append('spoc_name', singlePointOfContactName);
    formData.append('spoc_email', singlePointOfContactEmail);
    formData.append('spoc_mobile', singlePointOfContactMobile);
    formData.append('department', hodDepartment.id);
    formData.append('type', deviceType);

    if (action) {
      EditNetworkingDeviceService(accessToken, applicationId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setApplicationErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/assets/networking-devices');
          }
        }).finally(() => setIsLoading(false));
    } else {
      AddNetworkingDeviceService(accessToken, formData).then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          setApplicationErrors(applyErrors);
        } else if (data) {
          router.push('/dashboard/assets/networking-devices');
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
          <Button className=" float-end" onClick={() => router.push('/dashboard/assets/networking-devices')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {action ? 'Edit' : 'Add'}
            {' '}
            Device
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
                        isDisabled={type === "DEPARTMENT"}
                        value={departmentType}
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
                            setDepartmentType('');
                            setHodDepartment('');
                            getHodDepartments('');
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
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Device Type</Form.Label>
                    <Form.Select
                      name="deviceType"
                      id="deviceType"
                      onChange={(e) => {
                        setDeviceType(e.target.value);
                        setApplicationErrors({ ...applicationErrors, type: '' });
                      }}
                      value={deviceType}
                      isInvalid={!!applicationErrors.type}
                    >
                      <option value="">Select a type</option>
                      {deviceTypeOptions && deviceTypeOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.type}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Quantity(No's)</Form.Label>
                    <Form.Control
                      type="text"
                      name="quantity"
                      id="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      value={quantity}
                      isInvalid={!!applicationErrors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Make</Form.Label>
                    <Form.Control
                      type="text"
                      name="deviceMake"
                      id="deviceMake"
                      onChange={(e) => setDeviceMake(e.target.value)}
                      required
                      value={deviceMake}
                      isInvalid={!!applicationErrors.make}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.make}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="my-2" xs={12} md={6}>
                    <Form.Label className="form-required">Model</Form.Label>
                    <Form.Control
                      type="text"
                      name="deviceModel"
                      id="deviceModel"
                      onChange={(e) => setDeviceModel(e.target.value)}
                      required
                      value={deviceModel}
                      isInvalid={!!applicationErrors.model}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.model}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={6}>
                    <Form.Label className="form-required">Other Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="otherDetails"
                      id="otherDetails"
                      onChange={(e) => setOtherDetails(e.target.value)}
                      required
                      value={otherDetails}
                      isInvalid={!!applicationErrors.other_details}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.other_details}
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
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Single Point of Contact Name</Form.Label>
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
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Single Point of Contact Email</Form.Label>
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
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Single Point of Contact Mobile</Form.Label>
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
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                Provider Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Server maintained by</Form.Label>
                    <Form.Select
                      name="maintainedBy"
                      id="maintainedBy"
                      onChange={(e) => {
                        setMaintainedBy(e.target.value);
                        setApplicationErrors({ ...applicationErrors, maintained_by: '' });
                      }}
                      value={maintainedBy}
                      isInvalid={!!applicationErrors.maintained_by}
                    >
                      <option value="">Select a type</option>
                      {maintainedByOptions && maintainedByOptions.map((option) => (
                        <option value={option.key}>
                          {option.text}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Service Provider name</Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceProviderName"
                      id="serviceProviderName"
                      onChange={(e) => {
                        setServiceProviderName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, provider_name: '' });
                      }}
                      required
                      value={serviceProviderName}
                      isInvalid={!!applicationErrors.provider_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.provider_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={4}>
                    <Form.Label className="form-required">Contact Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactPersonName"
                      id="contactPersonName"
                      onChange={(e) => {
                        setContactPersonName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, contact_person_name: '' });
                      }}
                      required
                      value={contactPersonName}
                      isInvalid={!!applicationErrors.contact_person_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.contact_person_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="my-2" xs={12} md={6}>
                    <Form.Label className="form-required">Service Provider Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      name="serviceProviderMobile"
                      id="serviceProviderMobile"
                      onChange={(e) => {
                        setServiceProviderMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, provider_mobile: '' });
                      }}
                      required
                      value={serviceProviderMobile}
                      isInvalid={!!applicationErrors.provider_mobile}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.provider_mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="my-2" xs={12} md={6}>
                    <Form.Label className="form-required">Service Provider Email</Form.Label>
                    <Form.Control
                      type="mail"
                      name="serviceProviderEmail"
                      id="serviceProviderEmail"
                      onChange={(e) => {
                        setServiceProviderEmail(e.target.value);
                        setApplicationErrors({ ...applicationErrors, provider_email: '' });
                      }}
                      required
                      value={serviceProviderEmail}
                      isInvalid={!!applicationErrors.provider_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.provider_email}
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
              <Button className="me-2  px-3" onClick={() => router.push('/dashboard/assets/networking-devices')} variant="danger">
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
