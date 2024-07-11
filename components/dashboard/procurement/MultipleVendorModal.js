import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, CloseButton, Col, Form, Modal, Row, Spinner, Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../libs/utils/getHeaders';
import {
  generatePIService, getServices, patchMultiVendorsService, updateOrderStatusService,
} from '../../../services/dashboard/orders';

export default function MultipleVendorModal(props) {
  const {
    onHide, onClose, action, approveOrderId, selectedvendors,
    totalPrice,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [serviceChargeOptions, setServiceChargeOptions] = useState([]);
  const [sgstOptions, setSgstOptions] = useState();
  const [cgstOptions, setCgstOptions] = useState();
  const [igstOptions, setIgstOptions] = useState();
  const [piValues, setPIvalues] = useState({
    service_charge_type: 'PERCENTAGE',
    service_charge: '',
    service_charge_id: '',
    sgst: '',
    cgst: '',
    igst: '',
    pi_subject: '',
    pi_reference: '',
    comment: '',
  });
  const [piErrors, setPiErrors] = useState();

  const typeOptions = [
    {
      id: 1,
      type: 'Percentage',
      value: 'PERCENTAGE',
    },
    {
      id: 2,
      type: 'Flat Fee',
      value: 'FLAT',
    },

  ];

  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    getServices(accessToken, '/service-charges/').then(({ data }) => {
      setServiceChargeOptions(data);
    });
    getServices(accessToken, '/sgst/').then(({ data }) => {
      setSgstOptions(data);
    });
    getServices(accessToken, '/cgst/').then(({ data }) => {
      setCgstOptions(data);
    });
    getServices(accessToken, '/igst/').then(({ data }) => {
      setIgstOptions(data);
    });
  }, []);

  const approveOrder = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('comment', piValues.comment);
    formData.append('service_charge_type', piValues.service_charge_type);
    formData.append('service_charge', piValues.service_charge_type === 'FLAT' ? piValues.service_charge : piValues.service_charge_id);
    formData.append('status', 'PENDING_PAYMENT');
    // formData.append('sgst', piValues.sgst);
    // formData.append('cgst', piValues.cgst);
    // formData.append('igst', piValues.igst);
    // formData.append('pi_subject', piValues.pi_subject);
    // formData.append('pi_reference', piValues.pi_reference);

    await generatePIService(accessToken, approveOrderId, formData)
      .then(({ data, errors }) => {
        if (data) {
          onClose();
        } else {
          setPiErrors(errors);
        }
      });
    setIsLoading(false);
  };
  const onChange = (e) => {
    setPIvalues({ ...piValues, [e.target.name]: e.target.value });
    setPiErrors({ ...piErrors, [e.target.name]: '', non_field_errors: '' });
  };
  const aptsChargeValue = piValues.service_charge_id
    ? ((piValues.service_charge_id * totalPrice) / 100)
    : parseInt(piValues.service_charge);

  const grandTotal = totalPrice + aptsChargeValue;

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
            APTS Service Charge Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="form-required">APTS Service Charge Type</Form.Label>
                    <Form.Select
                      name="service_charge_type"
                      id="service_charge_type"
                      value={piValues.service_charge_type}
                      onChange={(e) => {
                        setPIvalues({
                          ...piValues, service_charge_type: e.target.value, service_charge: '', service_charge_id: '',
                        });
                      }}
                      required
                      isInvalid={piErrors && !!piErrors.service_charge_type}
                    >
                      {typeOptions.map((option) => (
                        <option value={option.value}>
                          {option.type}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {piErrors && piErrors.service_charge_type}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  {piValues.service_charge_type === 'FLAT'
                    ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="form-required">APTS Service Charge Value</Form.Label>
                        <Form.Control
                          type="number"
                          name="service_charge"
                          id="service_charge"
                          value={piValues.service_charge}
                          onChange={onChange}
                          required
                          isInvalid={piErrors && !!piErrors.service_charge}
                        />
                        <Form.Control.Feedback type="invalid">
                          {piErrors && piErrors.service_charge}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )
                    : (
                      <Form.Group className="mb-3">
                        <Form.Label className="form-required">Service Charges</Form.Label>
                        <Form.Select
                          id="service_charge_id"
                          name="service_charge_id"
                          value={piValues.service_charge_id}
                          onChange={onChange}
                          isInvalid={piErrors && !!piErrors.service_charge}
                          required
                        >
                          <option value="">Select a Service Charge</option>
                          {serviceChargeOptions.map((option) => (
                            <option value={option.value}>
                              {option.value}
                              {' '}
                              %
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {piErrors && piErrors.service_charge}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                </Col>
              </Row>
              <Table className="order-details mb-0" bordered>
                <tbody>
                  <tr>
                    <td>
                      <p>Total Order Value</p>
                    </td>
                    <td>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>APTS Service charge</p>
                    </td>
                    <td>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(aptsChargeValue || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Grand Total</p>
                    </td>
                    <td>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(grandTotal || 0)}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Row className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label className="form">Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="comment"
                    id="comment"
                    value={piValues.comment}
                    onChange={onChange}
                    required
                    isInvalid={piErrors && !!piErrors.comment}
                  />
                  <Form.Control.Feedback type="invalid">
                    {piErrors && piErrors.comment}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              {
                piErrors && piErrors.non_field_errors && (
                  <Alert variant="danger">
                    {piErrors.non_field_errors}
                  </Alert>
                )
              }
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setPIvalues({});
              onHide();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => approveOrder(true)}
            disabled={!((piValues.service_charge && piValues.service_charge_id) || piValues.comment)}>
            {
              isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : 'Generate PI'
            }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
