import { faChevronLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button, Card, Col, Form, Row, Spinner, Stack
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { addServerAssetsService, editServerAssetsService } from '../../../../services/dashboard/assets/hardware';
import { genericGetService } from '../../../../services/GenericService';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import Page404 from '../../../common/customerrorpages/Page404';

export default function AddServer(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails
  } = useSelector((state) => state.user);
  const [hodDepartment, setHodDepartment] = useState(type === 'DEPARTMENT' ? userDetails.department : '');
  const [departmentType, setDepartmentType] = useState(type === 'DEPARTMENT' ? userDetails.department.parent : '');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [serverType, setServerType] = useState();
  const [serverTypeOptions, setServerTypeOptions] = useState([]);
  const [serverMake, setServerMake] = useState();
  const [serverMakeOptions, setServerMakeOptions] = useState([]);
  const [serverModel, setServerModel] = useState('');
  const [operatingSystem, setOperatingSystem] = useState();
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([]);
  const [harddiskCapacity, setHarddiskCapacity] = useState('');
  const [ramCapacity, setRamCapacity] = useState('');
  const [hostLocation, setHostLocation] = useState();
  const [hostLocationOptions, setHostLocationOptions] = useState([]);
  const [maintainedBy, setMaintainedBy] = useState();
  const [maintainedByOptions, setMaintainedByOptions] = useState([]);
  const [serviceProviderName, setServiceProviderName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [serviceProviderMobile, setServiceProviderMobile] = useState('');
  const [serviceProviderEmail, setServiceProviderEmail] = useState('');
  const [singlePointOfContactName, setSinglePointOfContactName] = useState('');
  const [singlePointOfContactEmail, setSinglePointOfContactEmail] = useState('');
  const [singlePointOfContactMobile, setSinglePointOfContactMobile] = useState('');
  const [errors, setErrors] = useState();

  const [applicationId, setApplicationId] = useState('');

  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState([]);
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
      const id = router.asPath.split('/')[6];
      genericGetService(`/admin/server-assets/${id}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            console.log('errors', errors);
            setErrors(errors);
          }
          if (data) {
            const {
              id, os: { id: osId }, make: { id: makeId }, department,
              type: { id: typeId }, hostLocation: { id: hostLocationId }, model, ram,
              hardDisk, providerName, providerEmail, providerMobile, spocName, spocEmail,
              spocMobile, maintainedBy, contactPersonName,
            } = data;
            setApplicationId(id);
            setDepartmentType(department.parent);
            setHodDepartment(department);
            setOperatingSystem(osId);
            setServerMake(makeId);
            setServerType(typeId);
            setServerModel(model);
            setHarddiskCapacity(hardDisk);
            setRamCapacity(ram);
            setHostLocation(hostLocationId);
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
    genericGetService('/admin/data-centers/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setHostLocationOptions(data.results);
        } else {
          setHostLocationOptions([]);
        }
      });
    genericGetService('/server-makes/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setServerMakeOptions(data);
        } else {
          setServerMakeOptions([]);
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
    genericGetService('/server-types/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setServerTypeOptions(data);
        } else {
          setServerTypeOptions([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('code', 'A');
    formData.append('model', serverModel);
    formData.append('ram', ramCapacity);
    formData.append('hard_disk', harddiskCapacity);
    formData.append('maintained_by', maintainedBy);
    formData.append('contact_person_name', contactPersonName);
    formData.append('provider_name', serviceProviderName);
    formData.append('provider_email', serviceProviderEmail);
    formData.append('provider_mobile', serviceProviderMobile);
    formData.append('spoc_name', singlePointOfContactName);
    formData.append('spoc_email', singlePointOfContactEmail);
    formData.append('spoc_mobile', singlePointOfContactMobile);
    formData.append('department', hodDepartment.id);
    formData.append('type', serverType);
    formData.append('os', operatingSystem);
    formData.append('make', serverMake);
    formData.append('host_location', hostLocation);

    console.log(formData);

    if (action) {
      editServerAssetsService(applicationId, formData, headers)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setApplicationErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/assets/hardware');
          }
        }).finally(() => setIsLoading(false));
    } else {
      addServerAssetsService(formData, headers).then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          setApplicationErrors(applyErrors);
        } else if (data) {
          router.push('/dashboard/assets/hardware');
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
          <Button className=" float-end" onClick={() => router.push('/dashboard/assets/hardware')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {action ? 'Edit' : 'Add'}
            {' '}
            Server
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
                        isDisabled={type === "DEPARTMENT"}
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
                    <Form.Label className="form-required my-2">Server Type</Form.Label>
                    <Form.Select
                      name="serverType"
                      id="serverType"
                      onChange={(e) => {
                        setServerType(e.target.value);
                        setApplicationErrors({ ...applicationErrors, type: '' });
                      }}
                      value={serverType}
                      isInvalid={!!applicationErrors.type}
                    >
                      <option value="">Select a type</option>
                      {serverTypeOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.type}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Make</Form.Label>
                    <Form.Select
                      name="serverMake"
                      id="serverMake"
                      onChange={(e) => {
                        setServerMake(e.target.value);
                        setApplicationErrors({ ...applicationErrors, make: '' });
                      }}
                      value={serverMake}
                      isInvalid={!!applicationErrors.make}
                    >
                      <option value="">Select a type</option>
                      {serverMakeOptions && serverMakeOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.make}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Model</Form.Label>
                    <Form.Control
                      type="text"
                      name="serverModel"
                      id="serverModel"
                      onChange={(e) => {
                        setServerModel(e.target.value);
                        setApplicationErrors({ ...applicationErrors, model: '' });
                      }}
                      required
                      value={serverModel}
                      isInvalid={!!applicationErrors.model}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.model}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">OS</Form.Label>
                    <Form.Select
                      name="operatingSystem"
                      id="operatingSystem"
                      onChange={(e) => {
                        setOperatingSystem(e.target.value);
                        setApplicationErrors({ ...applicationErrors, os: '' });
                      }}
                      value={operatingSystem}
                    >
                      <option value="">Select a type</option>
                      {operatingSystemOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    {/* <Form.Control.Feedback type="invalid">
                        { applicationErrors.data_center }
                      </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Internal Harddisk(in GB)</Form.Label>
                    <Form.Control
                      type="text"
                      name="harddiskCapacity"
                      id="harddiskCapacity"
                      onChange={(e) => {
                        setHarddiskCapacity(e.target.value);
                        setApplicationErrors({ ...applicationErrors, hard_disk: '' });
                      }}
                      required
                      value={harddiskCapacity}
                      isInvalid={!!applicationErrors.hard_disk}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.hard_disk}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Ram(in GB)</Form.Label>
                    <Form.Control
                      type="text"
                      name="ramCapacity"
                      id="ramCapacity"
                      onChange={(e) => {
                        setRamCapacity(e.target.value);
                        setApplicationErrors({ ...applicationErrors, ram: '' });
                      }}
                      required
                      value={ramCapacity}
                      isInvalid={!!applicationErrors.ram}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.ram}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Host Location</Form.Label>
                    <Form.Select
                      name="hostLocation"
                      id="hostLocation"
                      onChange={(e) => {
                        setHostLocation(e.target.value);
                        setApplicationErrors({ ...applicationErrors, host_location: '' });
                      }}
                      value={hostLocation}
                      isInvalid={!!applicationErrors.host_location}
                    >
                      <option value="">Select a type</option>
                      {hostLocationOptions && hostLocationOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.host_location}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Server maintained by</Form.Label>
                    <Form.Select
                      name="maintainedBy"
                      id="maintainedBy"
                      onChange={(e) => setMaintainedBy(e.target.value)}
                      value={maintainedBy}
                    >
                      <option value="">Select a type</option>
                      {maintainedByOptions && maintainedByOptions.map((option) => (
                        <option value={option.key}>
                          {option.text}
                        </option>
                      ))}
                    </Form.Select>
                    {/* <Form.Control.Feedback type="invalid">
                        { applicationErrors.development_location }
                      </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Service Provider name</Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceProviderName"
                      id="serviceProviderName"
                      onChange={(e) => {
                        setServiceProviderName(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_name: '' });
                      }}
                      required
                      value={serviceProviderName}
                      isInvalid={!!applicationErrors.poc_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Contact Person Name</Form.Label>
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
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Service Provider Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      name="serviceProviderMobile"
                      id="serviceProviderMobile"
                      onChange={(e) => {
                        setServiceProviderMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_mobile: '' });
                      }}
                      required
                      value={serviceProviderMobile}
                      isInvalid={!!applicationErrors.poc_mobile}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Service Provider Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceProviderEmail"
                      id="serviceProviderEmail"
                      onChange={(e) => {
                        setServiceProviderEmail(e.target.value);
                        setApplicationErrors({ ...applicationErrors, poc_email: '' });
                      }}
                      required
                      value={serviceProviderEmail}
                      isInvalid={!!applicationErrors.poc_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.poc_email}
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
              <Button className="me-2  px-3" onClick={() => router.push('/dashboard/assets/hardware')} variant="danger">
                <FontAwesomeIcon icon={faTimes} />  Cancel
              </Button>
              <Button variant="success" type="submit" className="btn btn-success  px-3">
                <FontAwesomeIcon icon={faCheck} />  Submit
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
