import { faCheck, faChevronLeft, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Row, Spinner, col
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getSecretariatDepartments from '../../../../services/dashboard/departments';
import {
  addDepartmentService, editDepartmentService, getServices
} from '../../../../services/dashboard/masters';

export default function AddDepartment() {
  const [department, setDepartment] = useState({
    name: '',
    code: '',
    description: '',
    logo: '',
    owner: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [departmentErrors, setDepartmentErrors] = useState({});
  const [departments, setDepartments] = useState([]);

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);
  const router = useRouter();
  const { query: { id } } = router;

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', department.name);
    formData.append('code', department.code);
    if (department.imageURl) {
      formData.append('logo', department.logo);
    }
    formData.append('description', department.description);
    if (department.parent) {
      formData.append('parent', department.parent.id);
    }
    formData.append('owner', department.owner);
    if (id) {
      editDepartmentService(accessToken, formData, id).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          router.push({
            pathname: '/dashboard/masters/department/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    } else {
      addDepartmentService(accessToken, formData).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          console.log(data, 'data');
          router.push({
            pathname: '/dashboard/masters/department/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    }
  };

  const getDepartments  = (search) => {
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

  useEffect(() => {
    getDepartments ('');
  }, []);

  const getDepartmentDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/departments/${id}`).then(({ data }) => {
      setDepartment(data);
      if (data.category) {
        setDepartment({
          ...data,
          parent: data.parent,
        });
      }
    }).finally(() => { setIsLoading(false); });
  };
  useEffect(() => {
    if (id) {
      getDepartmentDetails();
    }
  }, []);

  const onchange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
    setDepartmentErrors({ ...departmentErrors, [e.target.name]: '' });
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
    <Card className="pb-4">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            { id ? 'Edit' : 'Add'}
            {' '}
            Department
          </h3>
          <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/masters/department')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
        <Col  xs={12} md={2}> {department.imageURl ? renderImage(department.imageURl) : renderImage(department.logo)}</Col>
          <Col  xs={12} md={10} controlId="formFile" >
            <Form.Label className="form">Upload Logo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="logo"
              onChange={(e) => {
                e.preventDefault();
                setDepartment({
                  ...department,
                  logo: e.target.files[0],
                  imageURl: URL.createObjectURL(e.target.files[0]),
                });
                setDepartmentErrors({ ...departmentErrors, logo: '' });
              }}
              isInvalid={departmentErrors.logo}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.logo}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={department.name}
              onChange={onchange}
              placeholder="Enter name"
              required
              isInvalid={!!departmentErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row xs={1} md={2}>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              id="code"
              value={department.code}
              onChange={onchange}
              placeholder="Enter code"
              isInvalid={!!departmentErrors.code}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.code}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form">Select Secretariat Department</Form.Label>
            <Select
              name="secretariat_department"
              value={department.parent}
              options={departments}
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
                      getDepartments (inputValue);
                    } else {
                      getDepartments ('');
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
                  setDepartment({ ...department, parent: newValue });
                } else if (action === 'clear') {
                  getDepartments ('');
                  setDepartment({ ...department, parent: '' });
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.parent}
            </Form.Control.Feedback>
          </Form.Group>

        </Row>
        <Form.Group as={Col} className="mb-3">
          <Form.Label className="form">Description</Form.Label>
          <Form.Control
            type="textarea"
            as="textarea"
            name="description"
            id="description"
            value={department.description}
            onChange={onchange}
            placeholder="Enter Description"
            required
            isInvalid={!!departmentErrors.description}
          />
          <Form.Control.Feedback type="invalid">
            {departmentErrors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <div>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              name="owner"
              id="owner"
              checked={department.verified}
              onChange={(e) => setDepartment({ ...department, owner: e.target.checked })}
              type="checkbox"
              label="Owner"
            />
          </Form.Group>
        </div>
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
          <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/masters/department')}>
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
                  > <FontAwesomeIcon icon={faCheck} /> &nbsp;
                    {
                      isLoading ? (
                        <div className="button-loading">
                          <Spinner animation="border" role="status">
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
