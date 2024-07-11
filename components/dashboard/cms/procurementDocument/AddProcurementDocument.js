import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Form, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createProcurementDocumentService, editgetProcurementDocumentDetailsService, getProcurementDocumentDetailsService } from '../../../../services/dashboard/procurementDocument';

export default function AddProcurementDocument() {
  const [file, setFile] = useState([]);
  const [fileLink, setFileLink] = useState();
  const [documentName, setDocumentName] = useState('');
  const [published, setPublished] = useState(false);
  const [documentErrors, setDocumentErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { documentId } } = router;

  useEffect(() => {
    console.log('documentId: ', documentId);
    if (documentId) {
      getProcurementDocumentDetailsService(accessToken, documentId)
        .then(({ data, errors }) => {
          if (errors) {
            setDocumentErrors(errors);
          }
          if (data) {
            const {
              file, active, name,
            } = data;
            setFileLink(file);
            setPublished(active);
            setDocumentName(name);
          }
        });
    }
    setIsLoading(false);
  }, []);

  const onSubmit = () => {
    setDocumentErrors({});
    setSubmitLoader(true);
    const formData = new FormData();
    if (file.type) {
      formData.append('file', file);
    }
    formData.append('name', documentName);
    formData.append('active', published);
    if (documentId) {
      editgetProcurementDocumentDetailsService(accessToken, documentId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setDocumentErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/procurement-document');
          }
        }).finally(() => setSubmitLoader(false));
    } else {
      createProcurementDocumentService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setDocumentErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/cms/procurement-document');
          }
        }).finally(() => setSubmitLoader(false));
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
          <Button className="float-end" onClick={() => router.push('/dashboard/cms/procurement-document')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {documentId ? 'Edit' : 'Add'}
            {' '}
            Empanelment list
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row xs={1} md={2} className="g-4">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="form-required">Document Name</Form.Label>
              <Form.Control type="text" placeholder="Enter document name" value={documentName} onChange={(e) => { setDocumentName(e.target.value); setDocumentErrors({ ...documentErrors, name: '' }); }} isInvalid={documentErrors.name} />
              <Form.Control.Feedback type="invalid">
                {documentErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
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
                  setDocumentErrors({ ...documentErrors, file: '' });
                }}
                isInvalid={!!documentErrors.file}
              />
              <Form.Control.Feedback type="invalid">
                {documentErrors.file}
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
          {documentErrors.non_field_errors ? (
            <Alert variant="danger">
              {documentErrors.non_field_errors}
            </Alert>
          ) : ''}
          <div className="pagenation-style">
            <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/cms/procurement-document')}>
              <FontAwesomeIcon icon={faTimes} />
              {' '}
              Cancel
            </Button>
            <Button variant="success" type="submit" className="btn btn-success px-3">
              {submitLoader
                ? <Spinner animation="border" role="status" size="sm" className="me-2" />
                : <FontAwesomeIcon icon={faCheck} /> }
              {' '}
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
