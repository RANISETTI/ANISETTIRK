import {
  faCheckCircle, faChevronLeft, faFileArrowDown, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, CloseButton, Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
// import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import axiosInstance from '../../../../services/config';
import {
  approveDSEservice, getDSEbyId, rejectDSEservice, updateStatusService,
} from '../../../../services/dashboard/digitalcertificates/dse';
import Page404 from '../../../common/customerrorpages/Page404';

const statusOptions = [
  {
    id: 1,
    name: 'Pending ',
    value: 'PENDING',
  },
  {
    id: 2,
    name: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    id: 3,
    name: 'Completed',
    value: 'CLOSED',
  },

];

export default function ViewDSE() {
  const {
    accessToken,
    userDetails: { type, roles },
  } = useSelector((state) => state.user);
  const [submitErrors, setSubmitErrors] = useState();
  const [errors, setErrors] = useState();
  const [dseDetails, setDSEdetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState();
  const [modalType, setModalType] = useState();
  const [reason, setReason] = useState('');
  const [reasonErrors, setReasonErrors] = useState({});
  const { handleSubmit } = useForm();

  const headers = getHeaders(accessToken);

  const router = useRouter();

  const { query: { id: applicationId } } = router;

  const getDSEDetails = (applicationId) => {
    setIsLoading(true);
    getDSEbyId(accessToken, applicationId).then(({ data }) => {
      if (data) {
        setDSEdetails(data);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDSEDetails(applicationId);
  }, []);

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
  }

  if (isLoading || !(dseDetails && Object.keys(dseDetails).length)) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const updateStatus = (type) => {
    if (type === 'Approve') {
      approveDSEservice(accessToken, applicationId).then(({ data, errors }) => {
        if (data) {
          setShowModal(false);
          getDSEDetails(applicationId);
        } else {
          setSubmitErrors(errors);
        }
      });
    } else if (type === 'Reject') {
      rejectDSEservice(accessToken, applicationId, { rejected_reason: reason })
        .then(({ data, errors }) => {
          console.log('data: ', data);
          if (data) {
            console.log('log');
            setShowModal(false);
            getDSEDetails(applicationId);
          } else {
            setReasonErrors(errors);
          }
        });
    } else {
      updateStatusService(accessToken, applicationId, { status }).then(({ data, errors }) => {
        if (data) {
          setShowModal(false);
          getDSEDetails(applicationId);
        } else {
          setSubmitErrors(errors);
        }
      });
    }
  };

  const downloadImageDocument = (type) => {
    const todayDate = moment(new Date()).format('LL');
    axiosInstance.get(`/admin/dsc/${applicationId}/download/documents/?type=${type}`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${type}-${todayDate}.jpeg`);
      });
  };
  const downloadDocument = (type) => {
    const todayDate = moment(new Date()).format('LL');
    axiosInstance.get(`/admin/dsc/${applicationId}/download/documents/?type=${type}`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${type}-${todayDate}.pdf`);
      });
  };

  function renderModalTitle(value) {
    if (value === 'updateStatus') return 'Update Status';
    if (value === 'Approve') return 'Approve the DSC Application';
    return 'Reject the DSC Application';
  }

  const renderModal = () => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          {renderModalTitle(modalType)}
        </Modal.Title>
        <CloseButton onClick={() => { setShowModal(false); setReason(''); }} />
      </Modal.Header>
      <Modal.Body>
        {modalType === 'updateStatus' && (
          <Form.Group as={Col} xs={12} md={12}>
            <Form.Label className="form-required my-2">Status</Form.Label>
            <Form.Select
              name="status"
              as="textArea"
              id="status"
              value={status || dscStatus}
              required
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">Select a status</option>
              {statusOptions.map((option) => (
                <option value={option.value}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {' '}
        {modalType === 'Approve' && (
          <h6>
            {' '}
            Are you sure you want to
            {' '}
            {modalType}
            {' '}
            this application ?
            {' '}
          </h6>
        )}
        {modalType === 'Reject' && (
          <Form.Group>
            <Form.Label className="form-required my-2">Reason For Reject</Form.Label>
            <Form.Control
              name="reason"
              id="reason"
              as="textArea"
              placeholder="Enter Reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setReasonErrors('');
              }}
              required
              isInvalid={!!reasonErrors.rejected_reason}
            />
            <Form.Control.Feedback type="invalid">
              {reasonErrors.rejected_reason}
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {submitErrors && submitErrors.nonFieldErrors ? (
          <Alert variant="danger">
            {submitErrors.nonFieldErrors}
          </Alert>
        ) : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => { setShowModal(false); setReason(''); }}
        >
          Close
        </Button>
        <Button onClick={() => updateStatus(modalType)}>{modalType === 'updateStatus' ? 'Update' : modalType}</Button>
      </Modal.Footer>
    </Modal>
  );

  const {
    applicant_dob,
    applicant_email,
    applicant_id_card,
    applicant_mobile_number,
    applicant_name,
    applicant_office_address,
    applicant_pan,
    applicant_pan_photo,
    applicant_photo,
    applicant_postcode,
    approved_by,
    approved_ts,
    authorization_letter,
    department,
    hod_designation,
    hod_email,
    hod_id_card,
    hod_mobile_number,
    hod_name,
    hod_office_address,
    hod_pan,
    hod_pan_photo,
    hod_photo,
    is_approved,
    modified_ts,
    request_letter,
    status_display_name,
    status: dscStatus,
    is_rejected,
    rejected_reason,
  } = dseDetails;

  return (

    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div className="order-details-style1">
          <h3 className="your-cart">
            DSC Details
          </h3>

          <div className="d-inline-flex">
            {(dscStatus && !is_rejected) && (
            <h5 className="text-success mt-1">
              {' '}
              Status :
              {' '}
              {status_display_name === 'Closed' ? 'Completed' : status_display_name }
            </h5>
            )}
            {is_rejected && (
              <h5 className="text-danger m-1 mx-4">Rejected </h5>
            )}
            {is_approved && (
              <h5 className="text-success mt-1 mx-4">Approved </h5>
            )}
            {!is_rejected && !(roles.includes('DSC User')) && status_display_name !== 'Closed'
              && (
              <Button
                variant="danger"
                className="mx-3"
                onClick={() => {
                  setShowModal(true);
                  setModalType('Reject');
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Reject
              </Button>
              )}
            {!is_approved && !(roles.includes('DSC User')) && !is_rejected
              && (
              <Button
                variant="success"
                className="me-3"
                onClick={() => {
                  setShowModal(true);
                  setModalType('Approve');
                }}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                {' '}
                {' '}
                Approve
              </Button>
              )}
            {is_approved && (
              <Button
                disabled={dscStatus === 'CLOSED'}
                className="me-3"
                onClick={() => {
                  setShowModal(true);
                  setModalType('updateStatus');
                }}
              >
                Update Status
              </Button>
            )}
            <Button className=" float-end" onClick={() => router.push('/dashboard/digital-certificate/dse')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {renderModal()}
        {rejected_reason ? (
          <Alert variant="danger">
            {rejected_reason}
          </Alert>
        ) : ''}
        <Card className="px-3 pb-4 rounded my-3">
          <h4 className="vender-text">Applicant Details</h4>
          <Row className="cust-form-label">
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Name :</Form.Label>
              {' '}
              <Form.Text className="">
                {applicant_name}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>ID Card :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('applicant_id_card')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN Number :</Form.Label>
              {' '}
              <Form.Text className="">
                {applicant_pan}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN Card :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('applicant_pan_photo')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Mobile No :</Form.Label>
              {' '}
              <Form.Text className="">
                {applicant_mobile_number}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Request Letter :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadDocument('request_letter')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              {' '}
              <Form.Text className="">
                {applicant_email}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Authorization Letter :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadDocument('authorization_letter')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address :</Form.Label>
              {' '}
              <Form.Text className="">
                {applicant_office_address}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Applicant Photo/Selfie :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('applicant_photo')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
          </Row>
        </Card>
        <Card className="px-3 pb-4 rounded my-3">
          <Row className="cust-form-label">
            <h4 className="vender-text">Authorized Official Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Name :</Form.Label>
              {' '}
              <Form.Text className="">
                {hod_name}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>ID Card :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('hod_id_card')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN number :</Form.Label>
              {' '}
              <Form.Text className="">
                {hod_pan}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN Card :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('hod_pan_photo')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Mobile No :</Form.Label>
              {' '}
              <Form.Text className="">
                {hod_mobile_number}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Authorized Photo/Selfie :</Form.Label>
              <Button className="btn-sm download-btn mx-5" onClick={() => downloadImageDocument('hod_photo')}>
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              {' '}
              <Form.Text className="">
                {hod_email}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2" />
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address :</Form.Label>
              {' '}
              <Form.Text className="">
                {hod_office_address}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2" />
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Department :</Form.Label>
              {' '}
              <Form.Text className="">
                {department.name}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2" />
          </Row>
          <Row className="cust-form-label">
            {is_approved
              && (
                <Form.Group as={Col} xs={12} md={6} className="mb-2">
                  <Form.Label>Approved By :</Form.Label>
                  {' '}
                  <Form.Text className="">
                    {approved_by.first_name}
                    {approved_by.last_name}
                  </Form.Text>
                </Form.Group>
              )}
          </Row>
        </Card>
      </Card.Body>
    </Card>
  );
}
