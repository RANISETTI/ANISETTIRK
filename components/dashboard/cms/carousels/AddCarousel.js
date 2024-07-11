import { faChevronLeft, faImage, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { createCarouselService, editCarouselService, getCarouselDetailsService } from '../../../../services/dashboard/carousels';

export default function AddCarousel() {
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState('');
  const [submitPhoto, setSubmitPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [published, setPublished] = useState(false);
  const [carouselErrors, setCarouselErrors] = useState([]);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { query: { id: carouselId } } = router;

  useEffect(() => {
    if (carouselId) {
      getCarouselDetailsService(accessToken, carouselId)
        .then(({ data, errors }) => {
          if (errors) {
            setCarouselErrors(errors);
          }
          if (data) {
            const {
              heading, sub_heading: subHeading, link, image,
              sort_order: sortOrder, published,
            } = data;
            setHeading(heading);
            setSubHeading(subHeading);
            setLink(link);
            setPhoto(image);
            setSortOrder(sortOrder);
            setPublished(published);
          }
        });
    }
    setIsLoading(false);
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('sub_heading', subHeading);
    formData.append('link', link);
    formData.append('published', published);
    formData.append('sort_order', sortOrder);
    if (submitPhoto) {
      formData.append('image', submitPhoto);
    }
    if (carouselId) {
      editCarouselService(accessToken, carouselId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setCarouselErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/carousels');
          }
        }).finally(() => setIsLoading(false));
    } else {
      createCarouselService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setCarouselErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/carousels');
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
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faImage}
        className="img-thumbnail img-fluid mx-3"
        style={{ width: '300px', height: '150px' }}
      />
    );
  };

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className="float-end" onClick={() => router.push('/dashboard/cms/carousels/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {carouselId ? 'Edit' : 'Create a new'}
            {' '}
            Carousel
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row xs={1} md={2} className="g-4 mb-5 mt-0">
            <Col md={4} xs={12}>
              {renderImage()}
            </Col>
            <Form.Group as={Col} md={8} xs={12} controlId="formFile" className="my-auto">
              <Form.Label className="form-required">Carousel image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="photo"
                onChange={(e) => {
                  setSubmitPhoto(e.target.files[0]);
                  setPhoto(URL.createObjectURL(e.target.files[0]) || '');
                  setCarouselErrors({ ...carouselErrors, image: '' });
                }}
             isInvalid={!!carouselErrors.image}
              />
              <Form.Control.Feedback type="invalid">
                {carouselErrors.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row xs={1} md={1} className="g-4">
            <Form.Group as={Col}>
              <Form.Label className="form-required">Heading</Form.Label>
              <Form.Control
                type="text"
                name="heading"
                id="heading"
                value={heading}
                placeholder="Enter Heading"
                onChange={(e) => {
                  setHeading(e.target.value);
                  setCarouselErrors({ ...carouselErrors, heading: '' });
                }}
                required
                isInvalid={!!carouselErrors.heading}
              />
              <Form.Control.Feedback type="invalid">
                {carouselErrors.heading}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Sub Heading</Form.Label>
              <Form.Control
                type="text"
                name="subHeading"
                id="subHeading"
                value={subHeading}
                placeholder="Enter sub heading"
                onChange={(e) => {
                  setSubHeading(e.target.value);
                  setCarouselErrors({ ...carouselErrors, sub_heading: '' });
                }}
                required
                isInvalid={!!carouselErrors.sub_heading}
              />
              <Form.Control.Feedback type="invalid">
                {carouselErrors.sub_heading}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                id="link"
                value={link}
                placeholder="Enter Link"
                onChange={(e) => {
                  setLink(e.target.value);
                  setCarouselErrors({ ...carouselErrors, link: '' });
                }}
                required
                isInvalid={!!carouselErrors.link}
              />
              <Form.Control.Feedback type="invalid">
                {carouselErrors.link}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-required">Sort Order</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="sortOrder"
                id="sortOrder"
                value={sortOrder}
                placeholder="Enter Sort Order"
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCarouselErrors({ ...carouselErrors, sort_order: '' });
                }}
                required
                isInvalid={!!carouselErrors.sort_order}
              />
              <Form.Control.Feedback type="invalid">
                {carouselErrors.sort_order}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="my-3" controlId="formBasicCheckbox">
            <Form.Check
              name="published"
              id="published"
              checked={published}
              onChange={(e) => setPublished(!published)}
              type="checkbox"
              label="Publish"
            />
          </Form.Group>
          {carouselErrors.nonFieldErrors ? (
            <Alert variant="danger">
              {carouselErrors.nonFieldErrors}
            </Alert>
          ) : ''}
          <div className="pagenation-style">
            <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/cms/carousels')}>
            <FontAwesomeIcon icon={faTimes} />  Cancel
            </Button>
            <Button variant="success" type="submit" className="btn btn-success px-3">
            <FontAwesomeIcon icon={faCheck} />  Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
