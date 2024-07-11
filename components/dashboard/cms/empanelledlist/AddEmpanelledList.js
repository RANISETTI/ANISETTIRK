import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createEmpanelledService, editEmpanelledService, getEmpanelledDetailsService } from '../../../../services/dashboard/empanelledlist';

export default function AddEmpanelmentList() {
  const [file, setFile] = useState([]);
  const [fileLink, setFileLink] = useState();
  const [published, setPublished] = useState(false);
  const [empanelmentErrors, setEmpanelmentErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id: empanelmentId } } = router;

  useEffect(() => {
    if (empanelmentId) {
      getEmpanelledDetailsService(accessToken, empanelmentId)
        .then(({ data, errors }) => {
          if (errors) {
            setEmpanelmentErrors(errors);
          }
          if (data) {
            const {
              file, active,
            } = data;
            setFileLink(file);
            setPublished(active);
          }
        });
    }
    setIsLoading(false);
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (file.type) {
      formData.append('file', file);
    }
    formData.append('active', published);
    if (empanelmentId) {
      editEmpanelledService(accessToken, empanelmentId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setEmpanelmentErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/vendor-empanelment/empanelmentlist');
          }
        }).finally(() => setIsLoading(false));
    } else {
      createEmpanelledService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setEmpanelmentErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/vendor-empanelment/empanelmentlist');
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
          <Button className="float-end" onClick={() => router.push('/dashboard/vendor-empanelment/empanelmentlist/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {empanelmentId ? 'Edit' : 'Add'}
            {' '}
            Empanelment list
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row xs={1} md={1} className="g-4">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="form-required">Upload Document </Form.Label>
              {fileLink && (
              <span>
                {' '}
                {fileLink.split('/').pop()}
              </span>
              )}
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setEmpanelmentErrors({ empanelmentErrors, file: '' });
                }}
                isInvalid={!!empanelmentErrors.file}
              />
              <Form.Control.Feedback type="invalid">
                {empanelmentErrors.file}
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
          {empanelmentErrors.nonFieldErrors ? (
            <Alert variant="danger">
              {empanelmentErrors.nonFieldErrors}
            </Alert>
          ) : ''}
          <div className="pagenation-style">
            <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/vendor-empanelment/empanelmentlist')}>
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
