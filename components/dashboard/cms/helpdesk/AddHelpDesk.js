import {
  faChevronLeft, faCheck, faTimes, faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { createHelpDeskService, editHelpDeskService, getHelpDeskDetailsService } from '../../../../services/dashboard/helpdesk';
import {
  addDepartmentService, addProductService, editDepartmentService, editProductService, getServices,
} from '../../../../services/dashboard/masters';

export default function AddHelpDesk() {
  const [helpDesk, setHelpDesk] = useState({
    title: '',
    reference_to_steps: '',
    contact_person: '',
    contact_no: '',
    published: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [helpDeskErrors, setHelpDeskErrors] = useState({});


  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id } } = router;

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', helpDesk.title);
    formData.append('reference_to_steps', helpDesk.reference_to_steps);
    formData.append('contact_person', helpDesk.contact_person);
    formData.append('contact_no', helpDesk.contact_no);
    formData.append('published', helpDesk.published);
    if (id) {
      editHelpDeskService(accessToken, formData, id).then(({ data, errors }) => {
        if (data) {
          router.push({
            pathname: '/dashboard/cms/helpdesk/',
          });
        } else {
          setHelpDeskErrors(errors);
        }
      }).finally(() => { setIsLoading(false); });
    } else {
      createHelpDeskService(accessToken, formData).then(({ data, errors }) => {
        if (data) {
          console.log(data, 'data');
          router.push({
            pathname: '/dashboard/cms/helpdesk/',
          });
        } else {
          setHelpDeskErrors(errors);
        }
      }).finally(() => { setIsLoading(false); });
    }
  };


  const getDepartmentDetails = () => {
    setIsLoading(true);
    getHelpDeskDetailsService(accessToken, id).then(({ data }) => {
      setHelpDesk(data);
      if (data.category) {
        setHelpDesk({
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
    setHelpDesk({ ...helpDesk, [e.target.name]: e.target.value });
    setHelpDeskErrors({ ...helpDeskErrors, [e.target.name]: '' });
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



  return (
    <Card className="p-2 pb-4">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            { id ? 'Edit' : 'Add'}
            {' '}
            Help Desk
          </h3>
          <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/cms/helpdesk')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={helpDesk.title}
              onChange={onchange}
              placeholder="Enter title"
              required
              isInvalid={!!helpDeskErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {helpDeskErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row xs={1} md={3}>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Refrence Steps</Form.Label>
            <Form.Control
              type="text"
              name="reference_to_steps"
              id="reference_to_steps"
              value={helpDesk.reference_to_steps}
              onChange={onchange}
              placeholder="Enter reference steps"
              isInvalid={!!helpDeskErrors.reference_to_steps}
            />
            <Form.Control.Feedback type="invalid">
              {helpDeskErrors.reference_to_steps}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Contact Person</Form.Label>
            <Form.Control
              type="text"
              name="contact_person"
              id="contact_person"
              value={helpDesk.contact_person}
              onChange={onchange}
              placeholder="Enter Contact Person"
              isInvalid={!!helpDeskErrors.contact_person}
            />
            <Form.Control.Feedback type="invalid">
              {helpDeskErrors.contact_person}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contact_no"
              id="contact_no"
              value={helpDesk.contact_no}
              onChange={onchange}
              placeholder="Enter Contact no"
              isInvalid={!!helpDeskErrors.contact_no}
            />
            <Form.Control.Feedback type="invalid">
              {helpDeskErrors.contact_no}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              title="published"
              id="published"
              checked={helpDesk.published}
              onChange={(e) => setHelpDesk({ ...helpDesk, published: e.target.checked })}
              type="checkbox"
              label="Published"
            />
          </Form.Group>
        </div>
        <div className="pagenation-style">
          <Button variant="danger" className="me-2 px-3"
            onClick={() => router.push('/dashboard/cms/helpdesk')}>
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
                  > <FontAwesomeIcon icon={faCheck} className="mx-2" />
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
