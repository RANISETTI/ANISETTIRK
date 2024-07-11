import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CloseButton, Col, Form, Modal, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getServices, postServices } from '../../../../services/dashboard/masters';
import GenericAlert from '../../../common/GenericAlert';

export default function ViewVendorEmpanelmentRefunds() {
  const router = useRouter();
  const { query: { refundId } } = router;

  const { accessToken } = useSelector((state) => state.user);

  const [vendorsId, setVendorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [refundDetails, setRefundDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [acceptanceType, setAcceptanceType] = useState('');
  const [rejectedReason, setRejectedReason] = useState('');

  const [submitLoader, setSubmitLoader] = useState(false);
  const [errors, setErrors] = useState({});

  async function getRefundDetails() {
    const { data } = await getServices(accessToken, `/admin/vendor/category/refunds/${refundId}/`);
    if (data) {
      setRefundDetails(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getRefundDetails();
  }, []);

  async function submitRequest() {
    const apiPath = acceptanceType === 'Approve' ? `/admin/vendors/${vendorsId}/categories/${vednor_category_id}/refunds/${refundId}/approve/` : `/admin/vendors/${vendorsId}/categories/${vednor_category_id}/refunds/${refundId}/reject/`;
    const formData = acceptanceType === 'Approve' ? {} : { rejected_reason: rejectedReason };
    const { data, errors: submitErrors } = await postServices(accessToken, apiPath, formData);
    if (data) {
      setShowModal(false);
      setSubmitLoader(false);
      setErrors({});
      getRefundDetails();
    }
    if (submitErrors) {
      setErrors(submitErrors);
      setSubmitLoader(false);
    }
  }

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  function renderApproveModal() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        size="lg"
        onHide={() => {
          setAcceptanceType('');
          setErrors('');
        }}
      >
        <Modal.Header
          className="bg-transparent"
        >
          <Modal.Title id="contained-modal-title-vcenter" className="text-black">
            {acceptanceType}
            {' '}
            Refund Request
          </Modal.Title>
          <CloseButton onClick={() => {
            setErrors({});
            setShowModal(false);
            setSubmitLoader(false);
          }}
          />
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to
            {' '}
            {' '}
            {acceptanceType}
            {' '}
            {' '}
            this refund request ?
          </p>
          <p style={{ color: '#dc3545', fontSize: '14px' }}>
            {/* {errors && errors.non_field_errors} */}
          </p>
          {!(acceptanceType === 'Approve') && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reason for rejection</Form.Label>
            <Form.Control
              type="rejectReason"
              id="rejectReason"
              name="rejectReason"
              autoComplete="off"
              as="textarea"
              rows={3}
              placeholder="Enter Reason for rejection"
              onChange={(e) => {
                setRejectedReason(e.target.value);
                setErrors({});
              }}
              isInvalid={!!errors.rejected_reason}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.rejected_reason}
            </Form.Control.Feedback>
          </Form.Group>
          )}
          {errors.non_field_errors && (
          <GenericAlert
            type="danger"
            text={errors.non_field_errors}
          />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setErrors({});
              setShowModal(false);
              setSubmitLoader(false);
            }}
          >
            Close
          </Button>
          <Button
            variant={acceptanceType === 'Approve' ? 'success' : 'danger'}
            onClick={() => { setSubmitLoader(true); submitRequest(); }}
          >
            {submitLoader && (
              <Spinner animation="border" role="status" size="sm" className="me-2" />
            )}
            {acceptanceType}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const {
    status, created_ts, vendor_category: {
      vendor: {
        id: vendorId, name: vendorName, email: vendorEmail, phone_number: vendorPhoneNumber,
      }, category, id : vednor_category_id, category: { parent },
    }, document, rejected_reason, approved_ts, rejected_ts,approved_by
  } = refundDetails;

  function refundStatus() {
    if (status === 'REJECTED') {
      return (
        <GenericAlert
          type="danger"
          text={`Refund for this category is rejected on ${moment(rejected_ts).format('lll')} - reason: ${rejected_reason}`}
        />
      );
    } if (status === 'APPROVED') {
      return (
        <GenericAlert
          type="success"
          text={`Refund for this category is approved by ${approved_by} on ${moment(approved_ts).format('lll')} `}
        />
      );
    }
    return (
      <GenericAlert
        type="secondary"
        text={`Refund for this category is requested on ${moment(created_ts).format('lll')} and status is pending`}
      />
    );
  }

  function renderRefundDetails() {
    return (
      <div>
        {refundStatus()}
        <Card className="pb-1">
          <Card.Header className="pt-3 bg-transparent">
            <h5>Vendor Details</h5>
          </Card.Header>
          <Card.Body>
            <Row className="cust-form-label">
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Name : </Form.Label>
                <Form.Text className="">
                  {vendorName}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Request Document :</Form.Label>
                <a href={document} className="p-2 download-btn rounded text-white" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFilePdf} />
                  {' '}
                  View
                  {' '}
                </a>
              </Form.Group>
            </Row>
            <Row className="cust-form-label">
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Email : </Form.Label>
                <Form.Text className="">
                  {vendorEmail}
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className="cust-form-label">
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Phone Number : </Form.Label>
                <Form.Text className="">
                  {vendorPhoneNumber}
                </Form.Text>
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>
        <Card className="pb-1">
          <Card.Header className="pt-3 bg-transparent">
            <h5>Category Details</h5>
          </Card.Header>
          <Card.Body>
            <Row className="cust-form-label">
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Category : </Form.Label>
                <Form.Text className="">
                  {category && category.name}
                </Form.Text>
              </Form.Group>
            </Row>
            {parent && (
              <Row className="cust-form-label">
                <Form.Group as={Col} xs={12} md={6} className="mb-2">
                  <Form.Label>Parent Category : </Form.Label>
                  <Form.Text className="">
                    {parent && parent.name}
                  </Form.Text>
                </Form.Group>
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <Card className="pb-1">
      {renderApproveModal()}
      <Card.Header className="pt-3 bg-transparent">
        <div className="order-details-style1">
          <h3 className="your-cart">
            Empanelment Category Refund
          </h3>
          <div className="d-flex">
            {status === 'PENDING' && (
            <>
              <Button
                className="btn-md bg-success"
                onClick={() => {
                  setAcceptanceType('Approve');
                  setShowModal(true);
                  setVendorId(vendorId);
                  setCategoryId(category && category.id);
                }}
              >
                Approve
              </Button>
              <Button
                className="btn-md bg-danger mx-2"
                onClick={() => {
                  setErrors({});
                  setAcceptanceType('Reject');
                  setShowModal(true);
                  setVendorId(vendorId);
                  setCategoryId(category && category.id);
                }}
              >
                Reject
              </Button>
            </>
            )}
            <Button className=" float-end" onClick={() => router.push('/dashboard/vendor-empanelment/empanelment-category-refunds/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {renderRefundDetails()}
      </Card.Body>
    </Card>
  );
}
