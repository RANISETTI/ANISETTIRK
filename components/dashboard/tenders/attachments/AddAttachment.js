import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Form, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { createTenderAttachmentService, editTenderAttachmentService } from '../../../../services/dashboard/tenders';
import { genericGetService } from '../../../../services/GenericService';

export default function AddTenderAttachment(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentFile, setAttachmentFIle] = useState('');
  const [attachmentLink, setAttachmentLink] = useState('');
  const [attachmentFileName, setAttachmentFileName] = useState('');
  const [published, setPublished] = useState(false);
  const [attachmentErrors, setAttachmentErrors] = useState([]);
  const [attachmentId, setAttachmentId] = useState('');
  const { handleSubmit } = useForm();
  const [formErrors, setFormErrors] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;

  const tenderId = asPath.split('/')[4];

  const { action } = props;

  useEffect(() => {
    if (action) {
      const fileId = asPath.split('/')[7];
      genericGetService(`/admin/tenders/${tenderId}/attachments/${fileId}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            console.log('errors', errors);
          }
          if (data) {
            const {
              attachment, id, name, published,
            } = data;
            setAttachmentId(id);
            setAttachmentName(name);
            if (attachment) {
              const fileName = attachment.split('/')[7];
              setAttachmentFileName(fileName);
            }
            setAttachmentLink(attachment);
            setPublished(published);
          }
        });
    }
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', attachmentName);
    if (attachmentFile) {
      formData.append('attachment', attachmentFile);
    }
    formData.append('published', published);

    if (action) {
      editTenderAttachmentService(formData, headers, tenderId, attachmentId)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setAttachmentErrors(addErrors);
          } else if (data) {
            router.push(`/dashboard/tenders/list/${tenderId}/attachments`);
          }
        }).finally(() => setIsLoading(false));
    } else {
      createTenderAttachmentService(formData, headers, tenderId)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setAttachmentErrors(addErrors);
          } else if (data) {
            router.push(`/dashboard/tenders/list/${tenderId}/attachments`);
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
    <Card>
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className="float-end" onClick={() => router.push(`/dashboard/tenders/list/${tenderId}/attachments`)}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {action ? 'Edit' : 'Add'}
            {' '}
            Attachment
          </h3>
        </div>
      </Card.Header>
      <Card.Body className="pb-4">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label className="form-required">Attachment Name</Form.Label>
            <Form.Control
              type="text"
              name="attachmentName"
              id="attachmentName"
              value={attachmentName}
              onChange={(e) => setAttachmentName(e.target.value)}
              required
              isInvalid={!!attachmentErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {attachmentErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="form-required me-3">Document</Form.Label>
            <Link href={attachmentLink}>
              <a>
                {attachmentFileName}
              </a>
            </Link>
            <Form.Control
              type="file"
              name="attachmentFile"
              onChange={(e) => {
                setAttachmentFIle(e.target.files[0]);
                if (attachmentFileName) {
                  setIsEdited(true);
                }
              }}
              isInvalid={!!attachmentErrors.attachment}
            />
            <Form.Control.Feedback type="invalid">
              {attachmentErrors.attachment}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Published"
              name="published"
              id="published"
              checked={published}
              onChange={() => setPublished(!published)}
              required
            />
          </Form.Group>
          {attachmentErrors.non_field_errors ? (
            <Alert variant="danger">
              {attachmentErrors.non_field_errors}
            </Alert>
          ) : ''}
          <Button variant="primary" type="submit" className="btn btn-success">
          <FontAwesomeIcon icon={faCheck} />  Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
