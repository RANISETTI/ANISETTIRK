import {
  faCheck, faChevronLeft, faImage, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import {
  addDepartmentUserService, addDepartmentVendorService,
  editDepartmentUserService,
  getServices, patchUserDetailsService,
} from '../../../../services/dashboard/masters';

export default function AddUser({ vendor }) {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    code: '',
    email: '',
    department: '',
    hodDepartment: '',
    userroles: [],
    vendorrole: '',
    mobile: '',
    active: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [departmentErrors, setDepartmentErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [hodDepartments, setHodDepartments] = useState();
  const [roles, setRoles] = useState();
  const [vendors, setVendors] = useState();
  const [vendorRoles, setVendorRoles] = useState();
  const [userId, setUserId] = useState();
  const { accessToken, userDetails } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id } } = router;
  const headers = getHeaders(accessToken);
  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('mobile', user.mobile);
    formData.append('email', user.email);
    if (vendor) {
      formData.append('vendor', user.vendor && user.vendor.id);
      formData.append('role', user.vendorrole && user.vendorrole.id);
    } else {
      if (user.hodDepartment) {
        formData.append('department', user.hodDepartment.id);
      } else {
        formData.append('department', user.department.id);
      }
      if (user.userroles.length) {
        user.userroles.map((i) => (
          formData.append('roles', i.id)
        ));
      }
      formData.append('is_active', user.active);
    }

    const editFormData = new FormData();
    editFormData.append('first_name', user.first_name);
    editFormData.append('last_name', user.last_name);
    editFormData.append('mobile', user.mobile);
    editFormData.append('is_active', user.active);

    if (user.userroles.length) {
      user.userroles.map((i) => (
        editFormData.append('roles', i.id)
      ));
    }

    if (vendor && !id) {
      addDepartmentVendorService(accessToken, formData).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          console.log(data, 'data');
          router.push({
            pathname: '/dashboard/user-management/users/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    } else if (id && vendor) {
      patchUserDetailsService(accessToken, editFormData, userId).then(({ data }) => {
        console.log('file: AddUser.js ~ line 82 ~ patchUserDetailsService ~ editFormData', editFormData);
        if (data) {
          router.push({
            pathname: '/dashboard/user-management/users/',
          });
        }
      });
    } else if (id && !vendor) {
      const rolesformData = new FormData();
      user.userroles.map((i) => {
        rolesformData.append('roles', i.id);
      });
      patchUserDetailsService(accessToken, editFormData, userId).then(async ({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          await editDepartmentUserService(accessToken, rolesformData, id).then(({ data }) => {
            if (data) {
              router.push({
                pathname: '/dashboard/user-management/users/',
              });
            }
          });
        }
      }).finally(() => { setIsLoading(false); });
    } else {
      addDepartmentUserService(accessToken, formData).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          console.log(data, 'data');
          router.push({
            pathname: '/dashboard/user-management/users/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    }
  };

  const getDepartments = (search) => {
    getSecretariatDepartments(search, headers)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setDepartments(results);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const getHodDepartments = (search, id) => {
    getHODDepartments(search, id, headers).then(({ data }) => {
      if (data) {
        const {
          results, previous, next, count,
        } = data;
        setHodDepartments(results);
      }
    }).finally(() => { setIsLoading(false); });
  };

  const getRoles = (slug) => {
    getServices(accessToken, `/admin/departments/${slug}/roles/`).then(({ data }) => {
      if (data) {
        setRoles(data);
      }
    }).finally(() => { setIsLoading(false); });
  };

  const getVendors = () => {
    getServices(accessToken, '/vendors/').then(({ data }) => {
      if (data) {
        setVendors(data.results);
      }
    }).finally(() => { setIsLoading(false); });
  };

  const getVendorRoles = () => {
    getServices(accessToken, '/admin/vendor/roles/').then(({ data }) => {
      if (data) {
        setVendorRoles(data);
      }
    }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getDepartments('');
    getVendorRoles();
    getVendors();
  }, []);

  const getDepartmentUserDetails = () => {
    setIsLoading(true);
    if (vendor) {
      getServices(accessToken, `/admin/vendor/users/${id}/`).then(({ data, errors }) => {
        if (data) {
          const { user, role, vendor } = data;
          setUserId(user.pk);
          setUser({
            ...data,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            vendorrole: role,
            mobile: user.mobile && user.mobile,
            vendor,
          });
        } else {
          setDepartmentErrors(errors);
        }
      });
    } else {
      getServices(accessToken, `/admin/users/${id}/`).then(({ data, errors }) => {
        if (data) {
          const { user, roles, department } = data;
          setUserId(user.pk);
          setUser({
            ...user,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            userroles: roles.map((i) => i),
            department: department.parent ? department.parent : department,
            hodDepartment: department.parent && department,
            mobile: user.mobile && user.mobile,
            active: user.is_active,
          });
          getHodDepartments('', department.parent && department.parent.id);
          getRoles(department.slug);
        } else {
          setDepartmentErrors(errors);
        }
      });
    }
  };

  useEffect(() => {
    if (id) {
      getDepartmentUserDetails();
    }
  }, []);

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setDepartmentErrors({ ...departmentErrors, [e.target.name]: '' });
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" roles="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderImage = (logo) => {
    if (logo) {
      return (
        <img
          src={logo}
          alt="team-member"
          className="img-thumbnail img-fluid"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faImage}
        className="img-thumbnail img-fluid rounded p-100"
        style={{ width: '100px', height: '100px' }}
      />
    );
  };

  return (
    <Card className="p-2 pb-4">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            { id ? 'Edit' : 'Add'}
            {' '}
            {vendor ? 'Vendor' : 'Department'}
            {' '}
            User
          </h3>
          <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/user-management/users')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {/* <div className="d-flex mb-2">
          {user.imageURl ? renderImage(user.imageURl) : renderImage(user.logo)}
          <Form.Group controlId="formFile" style={{ width: '350px' }} className="mx-3">
            <Form.Label className="form">Upload Logo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="logo"
              onChange={(e) => {
                e.preventDefault();
                setUser({
                  ...user,
                  logo: e.target.files[0],
                  imageURl: URL.createObjectURL(e.target.files[0]),
                });
              }}
              isInvalid={departmentErrors.logo}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.logo}
            </Form.Control.Feedback>
          </Form.Group>
        </div> */}
        <Row>
          <Col className="mb-3" xs={12} md={6}>
            <Form.Group>
              <Form.Label className="form-required">First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                id="first_name"
                value={user.first_name}
                onChange={onchange}
                placeholder="Enter firstname"
                required
                isInvalid={!!departmentErrors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                {departmentErrors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Form.Group>
              <Form.Label className="form-required">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                id="last_name"
                value={user.last_name}
                onChange={onchange}
                placeholder="Enter lastname"
                required
                isInvalid={!!departmentErrors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {departmentErrors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} md={6}>
            <Form.Group>
              <Form.Label className="form-required">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={onchange}
                placeholder="Enter email"
                isInvalid={!!departmentErrors.email}
                disabled={id}
              />
              <Form.Control.Feedback type="invalid">
                {departmentErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Form.Group>
              <Form.Label className="form-required">Mobile No</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                id="mobile"
                value={user.mobile}
                onChange={onchange}
                placeholder="Enter Mobile"
                isInvalid={!!departmentErrors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {departmentErrors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {vendor ? (
          <Row>
            <Col className="mb-3" xs={12} md={6}>
              <Form.Group>
                <Form.Label className="form">Select Vendor</Form.Label>
                <Select
                  name="secretariat_department"
                  value={user.vendor}
                  options={vendors}
                  isDisabled={id}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  placeholder="Select Vendor"
                  onInputChange={(
                    inputValue,
                    { action, prevInputValue },
                  ) => {
                    switch (action) {
                      case 'set-value':
                        return prevInputValue;
                      case 'input-change':
                        if (inputValue) {
                          getVendors(inputValue);
                        } else {
                          getVendors('');
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
                      getHodDepartments('', newValue.id);
                      getRoles(newValue.slug);
                      setUser({ ...user, vendor: newValue, vendorrole: '' });
                      setDepartmentErrors({ ...departmentErrors, vendor: '' });
                    } else if (action === 'clear') {
                      getDepartments({});
                      setUser({ ...user, vendor: '', vendorrole: '' });
                    }
                  }}
                />
                {
              departmentErrors.vendor
              && (
              <p style={{
                color: '#d9534f', fontSize: '14px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {departmentErrors.vendor}
              </p>
              )
            }
              </Form.Group>
            </Col>
            <Col className="mb-3" xs={12} md={6}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label className="form">Roles</Form.Label>
                <Select
                  name="roles"
                  value={user.vendorrole}
                  options={vendorRoles}
                  isDisabled={id}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  placeholder="Select Role"
                  isClearable
                  closeMenuOnSelect
                  onChange={(newValue, actionMeta) => {
                    const { action } = actionMeta;
                    if (action === 'select-option' || action === 'remove-value') {
                      setUser({ ...user, vendorrole: newValue });
                      setDepartmentErrors({ ...departmentErrors, role: '' });
                    } else if (action === 'clear') {
                      setUser({ ...user, vendorrole: '' });
                      getDepartments('');
                    }
                  }}
                />
                {
              departmentErrors.role
              && (
              <p style={{
                color: '#d9534f', fontSize: '14px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {departmentErrors.role}
              </p>
              )
            }
              </Form.Group>
            </Col>
          </Row>
        )
          : (
            <Row>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form">Select Secretariat Department</Form.Label>
                  <Select
                    name="secretariat_department"
                    value={user.department}
                    options={departments}
                    isDisabled={id}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    placeholder="Select Secretariat Department"
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
                        getHodDepartments('', newValue.id);
                        getRoles(newValue.slug);
                        setUser({
                          ...user, department: newValue, hodDepartment: '', userroles: [],
                        });
                        setDepartmentErrors({ ...departmentErrors, department: '' });
                      } else if (action === 'clear') {
                        getDepartments('');
                        setUser({
                          ...user, department: '', hodDepartment: '', userroles: [],
                        });
                      }
                    }}
                  />
                  {
              departmentErrors.department
              && (
              <p style={{
                color: '#d9534f', fontSize: '14px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {departmentErrors.department}
              </p>
              )
            }
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form">Select HOD Department</Form.Label>
                  <Select
                    name="hod_department"
                    value={user.hodDepartment}
                    isDisabled={id || !user.department}
                    options={hodDepartments}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    placeholder="Select HOD Department"
                    onInputChange={(
                      inputValue,
                      { action, prevInputValue },
                    ) => {
                      switch (action) {
                        case 'set-value':
                          return prevInputValue;
                        case 'input-change':
                          if (inputValue) {
                            getHodDepartments(inputValue, user.department.id);
                          } else {
                            getHodDepartments('', user.department.id);
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
                        setUser({ ...user, hodDepartment: newValue, userroles: [] });
                        getRoles(newValue && newValue.slug);
                      } else if (action === 'clear') {
                        getHodDepartments('', user.department.id);
                        setUser({ ...user, hodDepartment: '', userroles: [] });
                      }
                    }}
                  />
                  {
              departmentErrors.department
              && (
              <p style={{
                color: '#d9534f', fontSize: '14px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {departmentErrors.department}
              </p>
              )
            }
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="form">Roles</Form.Label>
                  <Select
                    name="secretariat_department"
                    value={user.userroles}
                    isDisabled={(!user.department && !user.hodDepartment)}
                    options={roles}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    placeholder="Select Role"
                    isMulti
                    isClearable
                    closeMenuOnSelect={false}
                    onChange={(newValue, actionMeta) => {
                      const { action } = actionMeta;
                      if (action === 'select-option' || action === 'remove-value') {
                        setUser({ ...user, userroles: newValue });
                        setDepartmentErrors({ ...departmentErrors, roles: '' });
                      } else if (action === 'clear') {
                        setUser({ ...user, userroles: [] });
                        getDepartments('');
                      }
                    }}
                  />
                  {
                  departmentErrors.roles
                  && (
                  <p style={{
                    color: '#d9534f', fontSize: '14px', fontWeight: '400', marginTop: '4px',
                  }}
                  >
                    {' '}
                    {departmentErrors.roles}
                  </p>
                  )
                }
                </Form.Group>
              </Col>
              <Col className="mb-3" xs={12} md={4}>
                <Form.Group className="my-2">
                  <Form.Check
                    type="checkbox"
                    id="isApproved"
                    label="Approve"
                    onChange={(e) => setUser({ ...user, active: e.target.checked })}
                    checked={user.active}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
        {
             (departmentErrors.non_field_errors)
              && (
              <p style={{
                color: '#d9534f', fontSize: '16px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {departmentErrors.non_fielde_rrors }
              </p>
              )
            }
        <div className="pagenation-style">
          <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/user-management/users')}>
            <FontAwesomeIcon icon={faTimes} />
            {' '}
            Cancel
          </Button>
          {
                id ? (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success px-3"
                    onClick={() => onSubmit()}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCheck} className="mx-2" />
                    {
                      isLoading ? (
                        <div className="button-loading">
                          <Spinner animation="border" roles="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : 'Submit'
                    }
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success px-3"
                    onClick={() => onSubmit()}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCheck} />
                    {' '}
                    &nbsp;
                    {
                      isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : 'Submit'
                    }
                  </Button>
                )
              }
        </div>
      </Card.Body>
    </Card>
  );
}
