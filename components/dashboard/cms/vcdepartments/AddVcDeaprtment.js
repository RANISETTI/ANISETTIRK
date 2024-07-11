import { faCheck, faChevronLeft, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    Button,
    Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import React, { useSelector } from 'react-redux';
import {
    addVcDepartmentService, editVcDepartmentService, getServices
} from '../../../../services/dashboard/masters';

export default function AddVcDepartment() {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentErrors, setDepartmentErrors] = useState({});

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id } } = router;

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('is_active', isActive);
    if (id) {
      editVcDepartmentService(accessToken, formData, id).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          router.push({
            pathname: '/dashboard/conference/vc-departments/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    } else {
      addVcDepartmentService(accessToken, formData).then(({ data, errors }) => {
        if (errors) {
          setDepartmentErrors(errors);
        } else {
          router.push({
            pathname: '/dashboard/conference/vc-departments/',
          });
        }
      }).finally(() => { setIsLoading(false); });
    }
  };

  const getDepartmentDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/vc-departments/${id}`).then(({ data }) => {
      setName(data.name);
      setIsActive(data.is_active);
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
    <Card className="p-2 pb-4">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            { id ? 'Edit' : 'Add'}
            {' '}
            VC Department
          </h3>
          <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/conference/vc-departments')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">VC Department Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
              isInvalid={!!departmentErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {departmentErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3" controlId="formBasicCheckbox">
            <Form.Check
              name="is_active"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              type="checkbox"
              label="Is Active"
            />
          </Form.Group>
        </Row>
        <div className="pagenation-style">
          <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/conference/vc-departments')}>
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
