import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createNewsService, editNewsService, getNewsDetailsService } from '../../../../services/dashboard/news';

export default function AddNews() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [published, setPublished] = useState(false);
  const [newsErrors, setNewsErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id: newsId } } = router;

  useEffect(() => {
    if (newsId) {
      getNewsDetailsService(accessToken, newsId)
        .then(({ data, errors }) => {
          if (errors) {
            setNewsErrors(errors);
          }
          if (data) {
            const {
              title, link, sort_order: sortOrder, published,
            } = data;
            setTitle(title);
            setLink(link);
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
    formData.append('title', title);
    formData.append('link', link);
    formData.append('published', published);
    formData.append('sort_order', sortOrder);
    if (newsId) {
      editNewsService(accessToken, newsId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setNewsErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/news');
          }
        }).finally(() => setIsLoading(false));
    } else {
      createNewsService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setNewsErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/news');
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

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className="float-end" onClick={() => router.push('/dashboard/cms/news/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {newsId ? 'Edit' : 'Create a new'}
            {' '}
            News Content
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row xs={1} md={1} className="g-4">
            <Form.Group as={Col}>
              <Form.Label className="form-required">Content</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter News Content"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setNewsErrors({ ...newsErrors, title: '' });
                }}
                required
                isInvalid={!!newsErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {newsErrors.title}
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
                  setNewsErrors({ ...newsErrors, link: '' });
                }}
                required
                isInvalid={!!newsErrors.link}
              />
              <Form.Control.Feedback type="invalid">
                {newsErrors.link}
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
                  setNewsErrors({ ...newsErrors, sort_order: '' });
                }}
                required
                isInvalid={!!newsErrors.sort_order}
              />
              <Form.Control.Feedback type="invalid">
                {newsErrors.sort_order}
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
          {newsErrors.nonFieldErrors ? (
            <Alert variant="danger">
              {newsErrors.nonFieldErrors}
            </Alert>
          ) : ''}
          <div className="pagenation-style">
            <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/cms/news')}>
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
