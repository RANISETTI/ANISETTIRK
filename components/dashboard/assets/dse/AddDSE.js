import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Row, Spinner, Stack
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { addHardwareAssetsService, editHardwareAssetsService } from '../../../../services/dashboard/assets/hardware';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import Page404 from '../../../common/customerrorpages/Page404';

export default function AddDSE(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails,
  } = useSelector((state) => state.user);

  const [isNext, setIsNext] = useState(false);
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
  const [quantity, setQuantity] = useState();
  const [otherDetails, setOtherDetails] = useState('');
  const [errors, setErrors] = useState();
  const [securityAuditErrors, setSecurityAuditErrors] = useState();

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
            DSE
          </h3>
        </div>
      </Card.Header>
      {!isNext ? (
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Organization Details
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Form.Group as={Col} xs={12} md={12}>
                    <Form.Label className="form-required my-2">Organization Type</Form.Label>
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
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">GSTIN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter GSTIN"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Check
                          type="checkbox"
                          label="Organization doesn't have a GSTIN"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Organization PAN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter PAN No"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Check
                          type="checkbox"
                          label="Organization doesn't have a PAN"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Authorised Signatory PAN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Organization Name"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Organization Name</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Organization Name"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group as={Col} xs={12}>
                    <Form.Label className="form-required my-2">Oragnization Adderss </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
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
                  <Row>
                    <Form.Group as={Col} xs={12} md={4}>
                      <Form.Label className="form-required my-2">Country</Form.Label>
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
                      <Form.Label className="form-required my-2">State</Form.Label>
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
                      <Form.Label className="form-required my-2">City</Form.Label>
                      <Form.Control
                        name="quantity"
                        id="quantity"
                        placeholder="Enter Organization Name"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          setApplicationErrors({ ...applicationErrors, quantity: '' });
                        }}
                        required
                        value={quantity}
                        isInvalid={!!applicationErrors.quantity}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.quantity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Card.Body>
                <Card.Header className="vender-text bg-transparent">
                  Upload Documents For Organization KYC
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Applicant ID Card</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Applicant PAN</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Applicant Person ID Card</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Resolution/Authority letter</Form.Label>
                        <span>(in case of non company)</span>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Header className="vender-text bg-transparent">
                  Declaration
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Form.Group className="mt-2">
                    <Form.Check
                      type="checkbox"
                      label="By choosing to continue and create this eKYC/eSign account, the applicant/subscriber agrees to the terms & conditions mentioned in the VSign CA eKYC subscriber agreement which will be signed during account creation."
                    />
                  </Form.Group>
                  <p className="mt-5">
                    Note: Section 71 of IT Act stipulates that if anyone makes a misrepresentation or suppresses any material fact from the CCA or CA for obtaining any DSC such person shall be punishable with imprisonment up to 2 years or with fine up to one lakh rupees or with both.
                  </p>

                  <p>Verasys Technologies Pvt. Ltd. is a Certifying Authority Licenced by CCA, Govt. of India</p>
                </Card.Body>
              </Card>
              <div className="pagenation-style">
                <Button className="me-2  px-3" onClick={() => router.push('/dashboard/assets/hardware')} variant="danger">
                  <FontAwesomeIcon icon={faTimes} />
                  {' '}
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsNext(true)} className="btn btn-success  px-3">
                  <FontAwesomeIcon icon={faCheck} />
                  {' '}
                  Next
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {applicationErrors.nonfield_errors}
              </Form.Control.Feedback>
            </Stack>
          </Form>
        </Card.Body>
      ) : (
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Authorized Signatory Details
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">PAN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter PAN"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Organization PAN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter PAN No"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Mobile</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Mobile"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="d-flex mt-5">
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Verify Later"
                          />
                        </Form.Group>
                        <Button className="mx-5" size="sm">
                          Send OTP
                        </Button>
                      </div>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Email</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Email"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                      <div className="d-flex mt-5">
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Verify Later"
                          />
                        </Form.Group>
                        <Button className="mx-5" size="sm">
                          Send OTP
                        </Button>
                      </div>
                      </Col>
                      <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Date of Birth</Form.Label>
                        <DatePicker
              dateFormat="dd-MM-yyyy"
              placeholderText="Date of birth"
              // selected={product.start_date ? new Date(product.start_date) : null}
              // value={product.start_date}
              className="date-picker-input"
              // onChange={(e) => {
              //   setProduct({ ...product, start_date: e });
              //   setProductErrors({ ...productErrors, start_date: '' });
              // }}
              // minDate={moment().toDate()}
            />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                      <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Gender</Form.Label>
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
                      {/* {deviceTypeOptions.map((option) => (
                        <option value={option.id}>
                          {option.name}
                        </option>
                      ))} */}
                        </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.device}
                    </Form.Control.Feedback>
                      </Form.Group>
                      <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Set KYC Account PIN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter PAN No"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                      </Col>
                      <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Confirm Account PIN</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter PAN No"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                      </Col>
                      <Form.Group as={Col} xs={12}>
                    <Form.Label className="form-required my-2">Remark </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
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
                     <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Mobile OTP</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Mobile OTP"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                      </Col>
                      <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Email OTP</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Email OTP"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                    </Col>
                    </Row>
                </Card.Body>
                <Card.Header className="vender-text bg-transparent">
                  Upload Documents for Authorized KYC
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Authorized Signatory's Photograph</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required"> PAN Card</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">Organization ID Proof</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={(e) => {
                            setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                            setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {/* {securityAuditErrors.audit_report} */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  </Card.Body>
                  <Form.Group className="mx-3">
                    <Form.Check
                      type="checkbox"
                      label={<h5>Applicant and Authorized Signatory KYC</h5>}
                    />
                  </Form.Group>
                   <Card.Header className="vender-text bg-transparent">
                  Passcode Details
                </Card.Header>
                  <Card.Body className="px-4 pb-4">
                    <Row>
                       <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Enter Download Passcode</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Mobile OTP"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                      </Col>
                      <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">Confirm Passcode</Form.Label>
                        <Form.Control
                          name="quantity"
                          id="quantity"
                          placeholder="Enter Email OTP"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                            setApplicationErrors({ ...applicationErrors, quantity: '' });
                          }}
                          required
                          value={quantity}
                          isInvalid={!!applicationErrors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                    </Col>
</Row>
                </Card.Body>
                <Card.Header className="vender-text bg-transparent">
                  Declaration
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Form.Group className="mt-2">
                    <Form.Check
                      type="checkbox"
                      label="By choosing to continue and create this eKYC/eSign account, the applicant/subscriber agrees to the terms & conditions mentioned in the VSign CA eKYC subscriber agreement which will be signed during account creation. I also consent and agree to receive communication and messages via whatsapp from VSIGN CA"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              <Form.Control.Feedback type="invalid">
                {applicationErrors.nonfield_errors}
              </Form.Control.Feedback>
              <div className="pagenation-style">
                <Button className="me-2  px-3" onClick={() => setIsNext(false)} variant="danger">
                  <FontAwesomeIcon icon={faTimes} />
                  {' '}
                  Previous
                </Button>
                <Button variant="primary" onClick={() => setIsNext(true)} className="btn btn-success  px-3 mx-4">
                  <FontAwesomeIcon icon={faCheck} />
                  {' '}
                  Submit & Esign
                  </Button>
                  <Button variant="primary" onClick={() => setIsNext(true)} className="btn btn-success  px-3">
                  <FontAwesomeIcon icon={faCheck} />
                  {' '}Submit & Esign Later
                </Button>
              </div>
            </Stack>
          </Form>
        </Card.Body>
      )}

    </Card>

  );
}
