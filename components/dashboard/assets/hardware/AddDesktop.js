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
import { addHardwareAssetsService, editHardwareAssetsService } from '../../../../services/dashboard/assets/hardware';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import Page404 from '../../../common/customerrorpages/Page404';

export default function AddDesktop(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails,
  } = useSelector((state) => state.user);
  const [hodDepartment, setHodDepartment] = useState(type === 'DEPARTMENT' ? userDetails.department : '');
  const [departmentType, setDepartmentType] = useState(type === 'DEPARTMENT' ? userDetails.department.parent : '');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [singlePointOfContactName, setSinglePointOfContactName] = useState('');
  const [singlePointOfContactEmail, setSinglePointOfContactEmail] = useState('');
  const [singlePointOfContactMobile, setSinglePointOfContactMobile] = useState('');
  const [operatingSystem, setOperatingSystem] = useState();
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([]);
  const [deviceType, setDeviceType] = useState();
  const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
  const [district, setDistrict] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [municipalities, setMunicipalities] = useState();
  const [mandalOptions, setMandalOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [otherDetails, setOtherDetails] = useState('');
  const [errors, setErrors] = useState();

  const [applicationId, setApplicationId] = useState('');

  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = getHeaders(accessToken);

  const { action } = props;

  const router = useRouter();

  const getMunicipalities = (value) => {
    genericGetService(`/municipalities/?type=MD&district=${value}`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setMunicipalityOptions(data.results);
        } else {
          setMunicipalityOptions([]);
        }
      });
    genericGetService(`/municipalities/?type=MA&district=${value}`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setMandalOptions(data.results);
        } else {
          setMandalOptions([]);
        }
      });
  };
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
      genericGetService(`/admin/hardware-assets/${id}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            setErrors(errors);
          }
          if (data) {
            const {
              id, department, district: { id: districtId },
              municipality: { id: municipalityId }, spocName, spocEmail,
              spocMobile, device: { id: deviceId }, os: { id: osId }, quantity,
              otherDetails,
            } = data;
            setApplicationId(id);
            setDepartmentType(department.parent);
            setHodDepartment(department);
            setDistrict(districtId);
            if (districtId) {
              getMunicipalities(districtId);
            }
            setMunicipalities(municipalityId);
            setDeviceType(deviceId);
            setQuantity(quantity);
            setOperatingSystem(osId);
            setOtherDetails(otherDetails);
            setSinglePointOfContactName(spocName);
            setSinglePointOfContactEmail(spocEmail);
            setSinglePointOfContactMobile(spocMobile);
          }
        });
    }
    genericGetService('/hardware-devices/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDeviceTypeOptions(data);
        } else {
          setDeviceTypeOptions([]);
        }
      });
    genericGetService('/districts/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDistrictOptions(data);
        } else {
          setDistrictOptions([]);
        }
      });
    getMunicipalities(1);
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
      }).finally(() => setIsLoading(false));
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('code', 'A');
    formData.append('quantity', quantity);
    formData.append('other_details', otherDetails);
    formData.append('spoc_name', singlePointOfContactName);
    formData.append('spoc_email', singlePointOfContactEmail);
    formData.append('spoc_mobile', singlePointOfContactMobile);
    formData.append('department', hodDepartment.id);
    formData.append('district', district);
    formData.append('municipality', municipalities);
    formData.append('device', deviceType);
    formData.append('os', operatingSystem);

    if (action) {
      editHardwareAssetsService(applicationId, formData, headers)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setApplicationErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/assets/hardware');
          }
        }).finally(() => setIsLoading(false));
    } else {
      addHardwareAssetsService(formData, headers).then(({ data, errors: applyErrors }) => {
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
            Desktop/Other Details
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
                        defaultValue={hodDepartment}
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
                                getHodDepartments(epartmentType && departmentType.id, '');
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
                    <Form.Label className="form-required my-2">Type of Device</Form.Label>
                    <Form.Select
                      name="deviceType"
                      id="deviceType"
                      value={deviceType}
                      onChange={(e) => {
                        setDeviceType(e.target.value);
                        setApplicationErrors({ ...applicationErrors, device: '' });
                      }}
                      isInvalid={!!applicationErrors.device}
                      required
                    >
                      <option value="">Select a type</option>
                      {deviceTypeOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.device}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      id="quantity"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setApplicationErrors({ ...applicationErrors, quantity: '' });
                      }}
                      required
                      value={quantity}
                      isInvalid={!!applicationErrors.quantity}
                      min="0"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Other Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="otherDetails"
                      id="otherDetails"
                      value={otherDetails}
                      onChange={(e) => {
                        setOtherDetails(e.target.value);
                        setApplicationErrors({ ...applicationErrors, other_details: '' });
                      }}
                      required
                      isInvalid={!!applicationErrors.other_details}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.other_details}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Operating System</Form.Label>
                    <Form.Select
                      name="operatingSystem"
                      id="operatingSystem"
                      value={operatingSystem}
                      onChange={(e) => {
                        setOperatingSystem(e.target.value);
                        setApplicationErrors({ ...applicationErrors, os: '' });
                      }}
                      isInvalid={!!applicationErrors.os}
                      required
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
                    <Form.Label className="form-required my-2">District</Form.Label>
                    <Form.Select
                      name="district"
                      id="district"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        getMunicipalities(e.target.value);
                        setApplicationErrors({ ...applicationErrors, district: '' });
                      }}
                      isInvalid={!!applicationErrors.district}
                      required
                    >
                      <option value="">Select a type</option>
                      {districtOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.district}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Municipalities/Mandals</Form.Label>
                    <Form.Select
                      name="municipalities"
                      id="municipalities"
                      value={municipalities}
                      onChange={(e) => {
                        setMunicipalities(e.target.value);
                        setApplicationErrors({ ...applicationErrors, municipality: '' });
                      }}
                      isInvalid={!!applicationErrors.municipality}
                      required
                    >
                      <option value="">Select a type</option>
                      <optgroup label="Municipalities">
                        {municipalityOptions.map((option) => (
                          <option value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Mandals">
                        {mandalOptions.map((option) => (
                          <option value={option.id}>
                            {option.name}
                          </option>
                        ))}

                      </optgroup>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.municipality}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="bg-transparent vender-text">
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
                      type="text"
                      name="singlePointOfContactMobile"
                      id="singlePointOfContactMobile"
                      onChange={(e) => {
                        setSinglePointOfContactMobile(e.target.value);
                        setApplicationErrors({ ...applicationErrors, spoc_mobile: '' });
                      }}
                      required
                      value={singlePointOfContactMobile}
                      isInvalid={!!applicationErrors.spoc_mobile}
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
