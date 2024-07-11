import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, CloseButton, Col, Form, Modal, Row, Spinner,Alert
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { addSecurityAuditReport, addSecurityAudits } from '../../../../services/dashboard/assets/software';

export default function SecurityAuditModal(props) {
  const [securityAudit, setSecurityAudit] = useState({
    status: '',
    compliance_report: '',
    high_level_issues: '',
    medium_level_issues: '',
    low_level_issues: '',
    audit_report: '',
    password:'',
  });
  const [file, setFile] = useState('');
  const [Description, setComment] = useState('');
  const [securityAuditErrors, setSecurityAuditErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [amountSent, setAmountSent] = useState('');
  const [notes, setNotes] = useState();
  const { handleSubmit } = useForm();

  const {
    onHide, onClose, securityAuditData, isAuditReport,
  } = props;
  const router = useRouter();
  const { accessToken, userDetails: { type, roles } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

   const onClear = () => {
    onHide();
    setSecurityAudit({});
    setSecurityAuditErrors({});
  };


  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (isAuditReport) {
      formData.append('high_level_issues', securityAudit.high_level_issues);
      formData.append('low_level_issues', securityAudit.low_level_issues);
      formData.append('medium_level_issues', securityAudit.medium_level_issues);
      formData.append('audit_report', securityAudit.audit_report);
      formData.append('password', securityAudit.password);
      addSecurityAuditReport(headers, securityAuditData.id, formData)
        .then(({ data, errors }) => {
          if (data) {
            onClear();
            onClose();
          } else {
            setSecurityAuditErrors(errors);
          }
        }).finally(() => setIsLoading(false));
    } else {
      formData.append('status', securityAudit.status);
      formData.append('compliance_report', securityAudit.compliance_report);
      addSecurityAudits(headers, securityAuditData.id, formData)
        .then(({ data, errors }) => {
          if (data) {
            onClear();
            onClose();
          } else {
            setSecurityAuditErrors(errors);
          }
        }).finally(() => setIsLoading(false));
    }
  };

  const onchange = (e) => {
    setSecurityAudit({ ...securityAudit, [e.target.name]: e.target.value });
    setSecurityAuditErrors({ ...securityAuditErrors, [e.target.name]: '' });
  };

  const statusOptions = [
    { id: 1, name: 'In Progress', value: 'IN_PROGRESS' },
    { id: 2, name: 'Closed', value: 'CLOSED' },

  ];


  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-transparent">
          <Modal.Title id="contained-modal-title-vcenter" className="text-black">
            {isAuditReport ? 'Security Audit Report Details' : 'Audit Request'}
          </Modal.Title>
          <CloseButton onClick={() => onClear()}
          />
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            {isAuditReport ? (
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-required">High level Issues Noted</Form.Label>
                    <Form.Control
                      as="input"
                      name="high_level_issues"
                      id="high_level_issues"
                      value={securityAudit.high_level_issues}
                      onChange={onchange}
                      required
                      isInvalid={!!securityAuditErrors.high_level_issues}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.high_level_issues}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-required">Medium level Issues Noted</Form.Label>
                    <Form.Control
                      as="input"
                      name="medium_level_issues"
                      id="medium_level_issues"
                      value={securityAudit.medium_level_issues}
                      onChange={onchange}
                      required
                      isInvalid={!!securityAuditErrors.medium_level_issues}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.medium_level_issues}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-required">Low level Issues Noted</Form.Label>
                    <Form.Control
                      as="input"
                      name="low_level_issues"
                      id="low_level_issues"
                      value={securityAudit.low_level_issues}
                      onChange={onchange}
                      required
                      isInvalid={!!securityAuditErrors.low_level_issues}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.low_level_issues}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="form-required">Upload Audit Report</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(e) => {
                        setSecurityAudit({ ...securityAudit, audit_report: e.target.files[0] });
                        setSecurityAuditErrors({ ...securityAuditErrors, audit_report: '' });
                      }}
                      isInvalid={!!securityAuditErrors.audit_report}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.audit_report}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-required">Password</Form.Label>
                    <Form.Control
                      as="input"
                      type="password"
                      name="password"
                      id="password"
                      value={securityAudit.password}
                      onChange={onchange}
                      required
                      isInvalid={!!securityAuditErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-required">Status</Form.Label>
                    <Form.Select
                      name="status"
                      id="status"
                      value={securityAudit.status}
                      onChange={(e) => {
                        setSecurityAudit({ ...securityAudit, status: e.target.value });
                        setSecurityAuditErrors({ ...securityAuditErrors, status: '' });
                      }}
                      required
                      isInvalid={!!securityAuditErrors.status}
                    >
                      <option value="">Select status</option>
                      {statusOptions.map((option) => (
                        <option value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="form-required">Compliance Report</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(e) => {
                        setSecurityAudit({ ...securityAudit, compliance_report: e.target.files[0] });
                        setSecurityAuditErrors({ ...securityAuditErrors, compliance_report: '' });
                      }}
                      isInvalid={!!securityAuditErrors.compliance_report}
                    />
                    <Form.Control.Feedback type="invalid">
                      {securityAuditErrors.compliance_report}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}
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
          <Button
            variant="danger"
            onClick={ () => onClear()}
          > <FontAwesomeIcon icon={faTimes} className="mx-2" />
            Close

          </Button>
          <Button
            variant="success"
            disabled={!(securityAudit.status && securityAudit.compliance_report) && !isAuditReport}
            onClick={() => onSubmit()}
          > <FontAwesomeIcon icon={faCheck} className="mx-2" />
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
