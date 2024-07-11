import { faChevronLeft, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CloseButton, Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import axiosInstance from '../../../../services/config';
import {
  approveDSEservice, rejectDSEservice, updateStatusService,
} from '../../../../services/dashboard/digitalcertificates/dse';
import { approveOrRejectVendorService, getVendorbyId, getVendorTurnOverService } from '../../../../services/dashboard/vendorempannelment/vendor';
import Page404 from '../../../common/customerrorpages/Page404';

export default function ViewVendorDetailPage() {
  const {
    accessToken,
    userDetails: { type, roles },
  } = useSelector((state) => state.user);

  const [errors, setErrors] = useState('');
  const [vendorDetails, setVendorDetails] = useState();
  const [turnoverDetails, setTurnoverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [approvedModal, setApproveModal] = useState(false);
  const [isApproved, setIsApproved] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const { handleSubmit } = useForm();

  const headers = getHeaders(accessToken);

  const router = useRouter();

  const { query: { id: applicationId } } = router;

  const getVendorEmpanelmentDetails = (applicationId) => {
    setIsLoading(true);
    getVendorbyId(accessToken, applicationId).then(({ data }) => {
      if (data) {
        setVendorDetails(data);
      }
    }).finally(() => setIsLoading(false));
  };

  const getTurnoverDetails = (applicationId) => {
    setIsLoading(true);
    getVendorTurnOverService(accessToken, applicationId).then(({ data }) => {
      if (data) {
        setTurnoverDetails(data.results);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getVendorEmpanelmentDetails(applicationId);
    getTurnoverDetails(applicationId);
  }, []);

  const approveVendor = () => {
    const type = isApproved === 'Approve' ? 'approve' : 'reject';
    approveOrRejectVendorService(accessToken, vendorDetails.id, type, { rejected_reason: rejectReason }).then(({ data, errors: err }) => {
      if (data) {
        getVendorEmpanelmentDetails(applicationId);
        setApproveModal(false);
      } else {
        setErrors(err);
      }
    });
  };

  // if (errors) {
  //   return (
  //     <Page404 errors={errors.nonFieldErrors} />
  //   );
  // }

  if (isLoading || !(vendorDetails && Object.keys(vendorDetails).length)) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderApproveModal = () => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={!!approvedModal}
      size="lg"
      onHide={() => {
        setApproveModal('');
        setErrors([]);
      }}
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          {isApproved}
        </Modal.Title>
        <CloseButton onClick={() => {
          setErrors([]);
          setApproveModal(false);
        }}
        />
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to
          {' '}
          {' '}
          {isApproved}
          {' '}
          {' '}
          this Vendor
          ?
        </p>
        <p style={{ color: '#dc3545', fontSize: '14px' }}>
          {errors && errors.non_field_errors}
        </p>
        { !(isApproved === 'Approve') && (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Reason For reject</Form.Label>
          <Form.Control
            type="rejectReason"
            id="rejectReason"
            name="rejectReason"
            autoComplete="off"
            placeholder="Enter Reason for reject"
            onChange={(e) => {
              setRejectReason(e.target.value);
              setErrors([]);
            }}
            isInvalid={!!errors.rejected_reason}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.rejected_reason}
          </Form.Control.Feedback>
        </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setErrors([]);
            setApproveModal(false);
          }}
        >
          Close

        </Button>
        <Button variant={isApproved === 'Approve' ? 'success' : 'danger'} onClick={() => approveVendor()}>{isApproved}</Button>
      </Modal.Footer>
    </Modal>
  );

  const {
    accepted_by,
    accepted_ts,
    account_number,
    address_1,
    address_2,
    ap_branch_address,
    bank_name,
    branch,
    business_start_year,
    city,
    contact_person,
    contact_person_designation,
    contact_person_email,
    contact_person_fax,
    contact_person_landline,
    contact_person_mobile,
    correspondence_address,
    email,
    gst,
    gst_proof,
    hod,
    hod_designation,
    hod_landline,
    hod_mobile,
    ifsc_code,
    name,
    pan,
    pan_proof,
    phone_number,
    registered_address,
    registration_date,
    registration_number,
    rejected_by,
    rejected_reason,
    rejected_ts,
    slug,
    state,
    status,
    status_display_name,
    tax_registration_number,
    type: org_type,
    type_display_name,
    website,
  } = vendorDetails;

  return (
    <Card className="pb-1">
      {renderApproveModal()}
      <Card.Header className="pt-3 bg-transparent">
        <div className="order-details-style1">
          <h3 className="your-cart">
            Vendor  Details
          </h3>

          <div className="d-flex ">
            <h5 className="mx-2">
              Status :
              {' '}
              {status_display_name}
            </h5>
            {(status === 'PENDING') && (
              <>
                <Button
                  className="btn-md bg-success"
                  onClick={() => {
                    setIsApproved('Approve');
                    setApproveModal(true);
                  }}
                >
                  Approve
                </Button>
                <Button
                  className="btn-md bg-danger mx-2"
                  onClick={() => {
                    setErrors('');
                    setIsApproved('Reject');
                    setApproveModal(true);
                  }}
                >
                  Reject
                </Button>
              </>
            )}

            <Button className=" float-end" onClick={() => router.push('/dashboard/vendor-empanelment/vendorlist/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </div>
        <p>{rejected_reason && `Reason for rejection : ${rejected_reason}`}</p>
      </Card.Header>
      <Card.Body>
        <Card className="p-3 rounded mt-3">
          <h4 className="your-cart">Organization Details</h4>
          <Row className="cust-form-label">
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Name Of the Organization : </Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {name}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Type Of Organization: </Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {org_type}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Registered Office Address: </Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {registered_address}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Correspondence Office Address: </Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {correspondence_address}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>AP Branch Address: </Form.Label>
              {' '}
              <Form.Text className="">
                {ap_branch_address}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address :</Form.Label>
              <Form.Text className="">
                {address_1}
                { address_2}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Year Of Commencement of Business :</Form.Label>
              <Form.Text className="">{business_start_year}</Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>AP GST No :</Form.Label>
              <Form.Text className="">
                {' '}
                {gst}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Service Tax Registration No :</Form.Label>
              <Form.Text className="">
                {' '}
                {tax_registration_number}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN No of Organization :</Form.Label>
              <Form.Text className="">
                {' '}
                {pan}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {email}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN  :</Form.Label>
              <Button className="btn-sm download-btn">
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
                {' '}
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>GST :</Form.Label>
              <Button className="btn-sm download-btn">
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Download
                {' '}
              </Button>
            </Form.Group>
          </Row>

          <Row>
            <h4 className="your-cart">Contact Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Contact Person Name :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Designation :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person_designation}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Land Line Phone No :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person_landline}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Mobile No :</Form.Label>
              <Form.Text className="">
                {' '}
                {phone_number}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Contact Email:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person_email}
                {' '}
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <h4 className="your-cart">Proprietor/Partner/Directors Details </h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Organization  Name:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Designation:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_designation}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Land Line No:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_landline}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Mobile:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_mobile}
                {' '}
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <h4 className="your-cart">Registration Details </h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Registration Email:</Form.Label>
              {' '}
              <Form.Text className=""> </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Registration No:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {registration_number}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Registration Date:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {registration_date}
                {' '}
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <h4 className="your-cart">Bank Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Account No :</Form.Label>
              <Form.Text className="">
                {account_number}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Bank Name:</Form.Label>
              <Form.Text className="">
                {bank_name}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Branch Name :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {branch}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>IFSC Date :</Form.Label>
              <Form.Text className="">{ifsc_code}</Form.Text>
            </Form.Group>

          </Row>
          {turnoverDetails && turnoverDetails.length > 0 && (
          <Row>
            <h4 className="your-cart">Turn over Details</h4>
            {turnoverDetails[0] && (
            <>
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Turn over year :</Form.Label>
                {' '}
                <Form.Text className="">
                  {' '}
                  {turnoverDetails[0].year}
                  {' '}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Turn over Amount :</Form.Label>
                {' '}
                <Form.Text className="">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(turnoverDetails[0].amount)}
                  {' '}
                </Form.Text>
              </Form.Group>
            </>
            )}
            {turnoverDetails[1] && (
            <>
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Turn over year :</Form.Label>
                {' '}
                <Form.Text className="">
                  {' '}
                  {turnoverDetails[1].year}
                  {' '}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} className="mb-2">
                <Form.Label>Turn over Amount :</Form.Label>
                {' '}
                <Form.Text className="">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(turnoverDetails[1].amount)}
                  {' '}
                </Form.Text>
              </Form.Group>
            </>
            )}
              {turnoverDetails[2] && (
                <>
                  <Form.Group as={Col} xs={12} md={6} className="mb-2">
                    <Form.Label>Turn over year :</Form.Label>
                    {' '}
                    <Form.Text className="">
                      {' '}
                      {turnoverDetails[2].year}
                      {' '}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6} className="mb-2">
                    <Form.Label>Turn over Amount :</Form.Label>
                    {' '}
                    <Form.Text className="">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(turnoverDetails[2].amount)}
                      {' '}
                    </Form.Text>
                  </Form.Group>
                </>
              )}
          </Row>
          )}
        </Card>
      </Card.Body>
    </Card>
  );
}
