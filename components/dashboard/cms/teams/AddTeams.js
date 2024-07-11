import {
  faCheck, faChevronLeft, faTimes, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import {
  createTeamMemberService,
  editTeamMemberService,
  getTeamMemberDetailsService,
} from '../../../../services/dashboard/teams';
import { genericGetService } from '../../../../services/GenericService';

export default function AddTeamMember() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [photo, setPhoto] = useState('');
  const [submitPhoto, setSubmitPhoto] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [gender, setGender] = useState('MALE');
  const [active, setActive] = useState(false);
  const [teamErrors, setTeamErrors] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { query: { id: teamId } } = router;

  useEffect(() => {
    if (teamId) {
      getTeamMemberDetailsService(accessToken, teamId)
        .then(({ data, errors }) => {
          if (errors) {
            setTeamErrors(errors);
          }
          if (data) {
            const {
              name, designation, email, phone_number: mobileNumber, photo,
              sort_order: sortOrder, active, gender,
            } = data;
            setName(name);
            setDesignation(designation);
            setEmail(email);
            setMobile(mobileNumber);
            setPhoto(photo);
            setSortOrder(sortOrder);
            setActive(active);
            setGender(gender);
          }
        });
    }
    genericGetService('/admin/genders/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setGenderOptions(data);
        } else {
          setGenderOptions([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phone_number', mobile);
    formData.append('active', active);
    formData.append('sort_order', sortOrder);
    if (submitPhoto) {
      formData.append('photo', submitPhoto);
    }
    if (teamId) {
      editTeamMemberService(accessToken, teamId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setTeamErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/teams');
          }
        }).finally(() => setIsLoading(false));
    } else {
      createTeamMemberService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setTeamErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/teams');
          }
        }).finally(() => setIsLoading(false));
    }
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

  const renderImage = () => {
    if (photo) {
      return (
        <img
          src={photo}
          alt="team-member"
          className="img-thumbnail img-fluid mx-3"
          style={{ width: '150px', height: '150px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faUser}
        className="img-thumbnail img-fluid mx-3"
        style={{ width: '150px', height: '150px' }}
      />
    );
  };

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className="float-end" onClick={() => router.push('/dashboard/cms/teams/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {teamId ? 'Edit' : 'Create a new'}
            {' '}
            Team Member
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="mb-3">
            {renderImage()}
            <Form.Group as={Col} controlId="formFile" className="my-auto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="photo"
                onChange={(e) => {
                  setSubmitPhoto(e.target.files[0]);
                  setPhoto(URL.createObjectURL(e.target.files[0]) || '');
                  setTeamErrors({ ...teamErrors, photo: '' });
                }}
                isInvalid={!!teamErrors.photo}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.photo}
              </Form.Control.Feedback>
            </Form.Group>

          </Row>
          <Row xs={1} md={2} className="g-4">
            <Form.Group as={Col}>
              <Form.Label className="form-required">Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                value={name}
                placeholder="Enter Team Member Name"
                onChange={(e) => {
                  setName(e.target.value);
                  setTeamErrors({ ...teamErrors, name: '' });
                }}
                required
                isInvalid={!!teamErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-required">Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                id="designation"
                value={designation}
                placeholder="Enter Designation"
                onChange={(e) => {
                  setDesignation(e.target.value);
                  setTeamErrors({ ...teamErrors, designation: '' });
                }}
                required
                isInvalid={!!teamErrors.designation}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.designation}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-required">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTeamErrors({ ...teamErrors, email: '' });
                }}
                required
                isInvalid={!!teamErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                id="mobile"
                value={mobile}
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  setMobile(e.target.value);
                  setTeamErrors({ ...teamErrors, phone_number: '' });
                }}
                required
                isInvalid={!!teamErrors.phone_number}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.phone_number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-required">Gender</Form.Label>
              <Form.Select
                name="type"
                id="type"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setTeamErrors({ ...teamErrors, gender: '' });
                }}
                required
                isInvalid={!!teamErrors.gender}
              >
                <option value="">Select a type</option>
                {genderOptions.map((option) => (
                  <option value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {teamErrors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form">Sort Order</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="sortOrder"
                id="sortOrder"
                value={sortOrder}
                placeholder="Enter Sort Order"
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setTeamErrors({ ...teamErrors, sort_order: '' });
                }}
                required
                isInvalid={!!teamErrors.sort_order}
              />
              <Form.Control.Feedback type="invalid">
                {teamErrors.sort_order}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="my-3" controlId="formBasicCheckbox">
            <Form.Check
              name="active"
              id="active"
              checked={active}
              onChange={(e) => setActive(!active)}
              type="checkbox"
              label="Active"
            />
          </Form.Group>
          {teamErrors.nonFieldErrors ? (
            <Alert variant="danger">
              {teamErrors.nonFieldErrors}
            </Alert>
          ) : ''}
          <div className="pagenation-style">
            <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/cms/teams')}>
              <FontAwesomeIcon icon={faTimes} />
              {' '}
              Cancel
            </Button>
            <Button variant="success" type="submit" className="btn btn-success px-3">
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
