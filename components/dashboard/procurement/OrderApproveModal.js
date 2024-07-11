import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, Form, Modal, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import { updateOrderStatusService, uploadDocumentService } from '../../../services/dashboard/orders';

export default function ApproveModals(props) {
  const [file, setFile] = useState('');
  const [comment, setComment] = useState('');
  const [approveErrors, setApproveErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [amountSent, setAmountSent] = useState('');
  const [notes, setNotes] = useState();
  const { handleSubmit } = useForm();

  const {
    onHide, onClose, action, approveOrderId, status,
  } = props;
  const router = useRouter();

  const { accessToken, userDetails: { type, roles } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const approveOrder = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('file', file);
    formData.append('sent_amount', amountSent || '');
    formData.append('received_amount', amountReceived || '');

    if (status === 'PENDING_PO') {
      await Axios.patch(
        Api.patchOrderDetails(approveOrderId),
        {
          reference_no: referenceNo,
          delivery_instructions: notes,
          terms_and_conditions: termsAndConditions,
        },
        { headers },
      ).then(({ data, errors }) => {
        console.log('data', data, errors);
      });

      formData.append('status', 'ORDERED');
    } else if (status === 'PENDING_PI') {
      formData.append('status', 'PENDING_PAYMENT');
    } else if (status === 'ORDERED') {
      formData.append('status', 'RECEIVED');
    } else if (type === 'APTS'
      && roles && roles.includes('Finance')
      && status === 'PENDING_PAYMENT') {
      formData.append('status', 'PENDING_PO');
    } else if ((type === 'DEPARTMENT' && roles && roles.includes('Admin')
      && status === 'PENDING_PAYMENT')) {
      formData.append('status', 'PENDING_PAYMENT');
    }
    await updateOrderStatusService(accessToken, approveOrderId, formData)
      .then(({ data, errors }) => {
        if (data) {
          onClose();
        } else {
          setApproveErrors(errors);
        }
      }).finally(() => setIsLoading(false));
  };

  const acceptOrder = () => {
    const formData = new FormData();
    formData.append('file', '');
    formData.append('comment', comment);
    formData.append('status', 'ACCEPTED');
    formData.append('sent_amount', '');
    formData.append('received_amount', '');
    uploadDocumentService(accessToken, approveOrderId, formData)
      .then(({ data }) => {
        if (data) {
          router.reload('');
        } else {
          console.log('errors', errors);
        }
      });
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
          <Modal.Title id="contained-modal-title-vcenter" className="text-black">
            {/* {status ? 'Upload Payment' : action === 'Order' ? 'Approve Order' : 'Approve Payment' } */}
            {/* {status === 'PENDING_PI' && 'Upload PI'} */}
            {status === 'PENDING_PO' && 'Generate PO'}
            {(type === 'DEPARTMENT' && status === 'PENDING_PAYMENT') && 'Upload Payment'}
            {(type === 'APTS' && status === 'PENDING_PAYMENT') && 'Approve Payment'}
            {status === 'ORDERED' && 'Product Received'}
            {status === 'ACCEPTED' && 'Accept Order'}
            {action === 'Order' && 'Approve Order'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            {((status === 'PENDING_PO') || (status === 'ORDERED') || (status === 'ACCEPTED')) ? '' : (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="form-required">Upload Document</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setApproveErrors({ ...approveErrors, file: '' });
                  }}
                  isInvalid={!!approveErrors.file}
                />
                <Form.Control.Feedback type="invalid">
                  {approveErrors.file}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {(type === 'DEPARTMENT' && status === 'PENDING_PAYMENT') && (
              <Form.Group className="mb-3">
                <Form.Label className="form-required">Amount Sent</Form.Label>
                <Form.Control
                  as="input"
                  name="sent_amount"
                  id="sent_amount"
                  value={amountSent}
                  onChange={(e) => {
                    setAmountSent(e.target.value);
                    setApproveErrors({ ...approveErrors, sent_amount: '' });
                  }}
                  required
                  isInvalid={!!approveErrors.sent_amount}
                />
                <Form.Control.Feedback type="invalid">
                  {approveErrors.sent_amount}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {(type === 'APTS' && roles && roles.includes('Finance') && status === 'PENDING_PAYMENT') && (
              <Form.Group className="mb-3">
                <Form.Label className="form-required">Amount Received</Form.Label>
                <Form.Control
                  as="input"
                  name="received_amount"
                  id="received_amount"
                  value={amountReceived}
                  onChange={(e) => {
                    setAmountReceived(e.target.value);
                    setApproveErrors({ ...approveErrors, received_amount: '' });
                  }}
                  required
                  isInvalid={!!approveErrors.received_amount}
                />
                <Form.Control.Feedback type="invalid">
                  {approveErrors.received_amount}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {status === 'PENDING_PO'
              && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-required">Delivery instructios</Form.Label>
                    <Form.Control
                      value={notes}
                      as="textarea"
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter delivery instructios "
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-required">Terms and Conditions</Form.Label>
                    <Form.Control value={termsAndConditions} as="textarea" onChange={(e) => setTermsAndConditions(e.target.value)} placeholder="terms and conditions" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-required">Reference No</Form.Label>
                    <Form.Control value={referenceNo} as="input" onChange={(e) => setReferenceNo(e.target.value)} placeholder="Enter reference no" />
                  </Form.Group>
                </>
              )}
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                isInvalid={!!approveErrors.comment}
              />
              <Form.Control.Feedback type="invalid">
                {approveErrors.comment}
              </Form.Control.Feedback>
            </Form.Group>
            {
              approveErrors.non_field_errors
              && (
                <p style={{
                  color: '#d9534f', fontSize: '16px', fontWeight: '400', marginTop: '4px',
                }}
                >
                  {' '}
                  {approveErrors.non_field_errors}
                </p>
              )
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>Close</Button>
          <Button variant="primary" disabled={status === 'PENDING_PO' ? (!referenceNo || !termsAndConditions || !notes || !comment) : !comment} onClick={() => { type === 'VENDOR' ? acceptOrder() : approveOrder(); }}>
            {
              isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  {status === 'PENDING_PO' && 'Generate PO'}
                  {(type === 'DEPARTMENT' && status === 'PENDING_PAYMENT') && 'Upload Payment'}
                  {(type === 'APTS' && status === 'PENDING_PAYMENT') && 'Approve Payment'}
                  {status === 'ORDERED' && 'Product Received'}
                  {status === 'ACCEPTED' && 'Accept Order'}
                  {action === 'Order' && 'Approve Order'}
                </>
              )
            }

          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
