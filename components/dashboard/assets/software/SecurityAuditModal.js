import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, Form, Modal, Row, Spinner,Alert
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { addSecurityAuditDetails } from '../../../../services/dashboard/assets/software';

export default function SecurityAuditModal(props) {
  const [securityAudit, setSecurityAudit] = useState({
    staging_url: '',
    description: '',
    other_details: '',
  });
  const [securityAuditErrors, setsecurityAuditErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState();
  const { handleSubmit } = useForm();

  const {
    onHide, onClose, action, onSubmitId, status, securityAuditData,
  } = props;
  const router = useRouter();
  const { accessToken, userDetails: { type, roles } } = useSelector((state) => state.user);
  console.log(securityAuditData, 'securityAuditData');
  const headers = getHeaders(accessToken);

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('description', securityAudit.description);
    formData.append('other_details', securityAudit.other_details);
    formData.append('staging_url', securityAudit.staging_url);
    addSecurityAuditDetails(headers, securityAuditData.id, formData)
      .then(({ data, errors }) => {
        if (data) {
          router.push('/dashboard/assets/security-audit');
          onClose();
        } else {
          setsecurityAuditErrors(errors);
        }
      }).finally(() => setIsLoading(false));
  };

  const onchange = (e) => {
    setSecurityAudit({ ...securityAudit, [e.target.name]: e.target.value });
    setsecurityAuditErrors({ ...securityAuditErrors, [e.target.name]: '' });
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-transparent">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-black"
          >
            <h3 className='your-cart p-0'>Request for audit </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row>
            <Form.Group className="mb-3">
                <Form.Label>Department :</Form.Label>{' '}
                <Form.Text>{securityAuditData && securityAuditData.department.name}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Portal :</Form.Label>{' '}
                <Form.Text>{securityAuditData && securityAuditData.application_url}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email :</Form.Label>{' '}
                <Form.Text>{ securityAuditData && securityAuditData.spoc_email}</Form.Text>
            </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label className="form-required">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  id="description"
                  value={securityAudit.description}
                  onChange={onchange}
                  required
                  isInvalid={!!securityAuditErrors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {securityAuditErrors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-required">Staging Server URL</Form.Label>
                <Form.Control
                  as="input"
                  name="staging_url"
                  id="staging_url"
                  value={securityAudit.staging_url}
                  onChange={onchange}
                  required
                  isInvalid={!!securityAuditErrors.staging_url}
                />
                <Form.Control.Feedback type="invalid">
                  {securityAuditErrors.staging_url}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-required">Credentials &amp; Other Details</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={2}
                  name="other_details"
                  id="other_details"
                  value={securityAudit.other_details}
                  onChange={onchange}
                  required
                  isInvalid={!!securityAuditErrors.other_details}
                />
                <Form.Control.Feedback type="invalid">
                  {securityAuditErrors.other_details}
                </Form.Control.Feedback>
              </Form.Group>

            </Row>
            {
              securityAuditErrors.non_field_errors
              && (
                <Alert variant="danger">
                  {' '}
                  {securityAuditErrors.non_field_errors}
                </Alert>
              )
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="mx-2" />
          Close</Button>
          <Button variant="success" onClick={() => onSubmit()}>
          <FontAwesomeIcon icon={faCheck} className="mx-2" />
            {
              isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  Submit
                </>
              )
            }

          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
