import { faChevronLeft, faFileArrowDown, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CloseButton, Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../../services/config';
import { getServices } from '../../services/dashboard/masters'
import { getVendorTurnOverServiceForVendor } from '../../services/dashboard/vendorempannelment/vendor';
import Page404 from '../common/customerrorpages/Page404';

export default function MyProfile() {
  const {
    accessToken,
    userDetails: { type: userType, roles, organization },
  } = useSelector((state) => state.user);

  const [errors, setErrors] = useState('');
  const [vendorEmpanelmentProductDetails, setVendorEmpanelmentProductDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState();
  const [modalType, setModalType] = useState();
  const [approvedModal, setApproveModal] = useState(false);
  const [isApproved, setIsApproved] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [reason, setReason] = useState();
  const [reasonErrors, setReasonErrors] = useState({});
  const [turnovers, setTurnovers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const { handleSubmit } = useForm();

  const headers = getHeaders(accessToken);

  const router = useRouter();

  const { query: { id: applicationId } } = router;



  const getVendorEmpanelmentDetails = () => {
    setIsLoading(true);
    getServices(accessToken,`/vendors/${organization?.id}/edit/`).then(({ data }) => {
      if (data) {
        setVendorEmpanelmentProductDetails(data);
         getVendorTurnOverServiceForVendor(accessToken, organization?.id).then(({ data }) => {
        if (data) {
          setTurnovers(data);
        }else {
          setTurnovers([]);
        }
      });
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getVendorEmpanelmentDetails()
  }, []);

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
  }

  if (isLoading || !(vendorEmpanelmentProductDetails && Object.keys(vendorEmpanelmentProductDetails).length)) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }


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


  const statusOptions = [
    {
      id: 1,
      name: 'In Progress',
      value: 'IN_PROGRESS',
    },
    {
      id: 2,
      name: 'Completed',
      value: 'CLOSED',
    },

  ];

  const {name,
    phone_number,email,description,address_1,address_2,city,
    postcode,pan,pan_proof,gst,gst_proof,type,registered_address,correspondence_address,
    ap_branch_address,contact_person,contact_person_designation,contact_person_landline,
    contact_person_mobile,contact_person_fax,contact_person_email,hod,hod_designation,hod_landline,hod_mobile,
    hod_fax,hod_email,website,business_start_year,tax_registration_number,account_number,bank_name,ifsc_code,
    branch,procurement_user_id,registration_details,registration_number,registration_date,state,accepted_by,rejected_by
  } = vendorEmpanelmentProductDetails;

  return (
    <Card className="pb-1">
      <Card.Header className="pt-3 bg-transparent">
        <div className="order-details-style1">
          <h3 className="your-cart">
            My Profile Details
          </h3>
          <div className="d-flex">
          <Button className={organization.status === 'APPROVED' ? "d-none" : " float-end mx-2 "} onClick={() => router.push(`/dashboard/my-profile/edit/`)}>
              <FontAwesomeIcon icon={faPen} />
              {' '}
              Edit
            </Button>
            <Button className={organization.status === 'REJECTED'? "d-none":" float-end"} onClick={() => router.push('/dashboard')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card className="p-3 rounded mt-3">
          <Row className="cust-form-label">
            <h4 className="your-cart">Basic Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Vendor Name : </Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {name}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Phone No :</Form.Label>
              <Form.Text className="">
                {' '}
                {phone_number}
              </Form.Text>
            </Form.Group>
          <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              <Form.Text className="">
                {' '}
                {email}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address 1 :</Form.Label>
              {' '}
              <Form.Text className="">
                {address_1} {city}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address 2 :</Form.Label>
              {' '}
              <Form.Text className="">
                {address_2}, {city}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Postcode :</Form.Label>
              {' '}
              <Form.Text className="">
                {postcode}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>GST : </Form.Label>
              {' '}
              <Form.Text className="">
                {gst}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>GST Proof :</Form.Label>
              <Link href={gst_proof} >
                          <a target="_blank">
              <Button className="btn-sm download-btn" onClick={() => downloadDocument({gst_proof})}>

                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Document
                {' '}
              </Button>
              </a>
              </Link>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN : </Form.Label>
              {' '}
              <Form.Text className="">
                {pan}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>PAN Proof :</Form.Label>
              <Link href={pan_proof} >
                          <a target="_blank">
                            <Button className="btn-sm download-btn">
                <FontAwesomeIcon icon={faFileArrowDown} />
                {' '}
                Document
                {' '}
                   </Button>
                   </a>
                        </Link>

            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Business year : </Form.Label>
              {' '}
              <Form.Text className="">
                {business_start_year}
              </Form.Text>
            </Form.Group>
            </Row>
            <Row className="cust-form-label">
            <h4 className="your-cart">Bank Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Bank Name</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {bank_name}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Account No:</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {account_number}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Branch :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {branch}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>IFSC :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {ifsc_code}
                {' '}
              </Form.Text>
            </Form.Group>
            </Row>
            <Row className="cust-form-label">
            <h4 className="your-cart">Contact Person Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Name :</Form.Label>
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
              <Form.Label>Phone No :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person_mobile}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {contact_person_email}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {correspondence_address}
                {' '}
              </Form.Text>
            </Form.Group>
            <Row className="cust-form-label">
            <h4 className="your-cart">Department Details</h4>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Name :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Designation :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_designation}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Phone No :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_mobile}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {hod_email}
                {' '}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Address :</Form.Label>
              {' '}
              <Form.Text className="">
                {' '}
                {ap_branch_address}
                {' '}
              </Form.Text>
            </Form.Group>
            </Row>
            <Row className="cust-form-label">
            <h4 className="your-cart">Last three years turnover </h4>
            <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Label>from </Form.Label>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Label>To </Form.Label>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Label>Amount </Form.Label>
              </Form.Group>
{
  turnovers.map((turnover) =>(
    <>
    <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Text className="">
                {' '}
                {turnover.year.split('-')[0]}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Text className="">
                {' '}
                {turnover.year.split('-')[1]}
                {' '}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4} className="mb-2">
              <Form.Text className="">
                {' '}
                {turnover.amount && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(turnover.amount)}
                {' '}
              </Form.Text>
            </Form.Group>
    </>)
  )
}

          </Row>

            {

              documents.map((item, index) => (

                <Form.Group as={Col} xs={12} md={6} className="mb-2">
                  <Form.Label>
                    Document
                    {' '}
                    {index + 1}
                    {' '}
                    :
                  </Form.Label>
                  <Button className="btn-sm download-btn">
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    {' '}
                    Download
                    {' '}
                  </Button>
                </Form.Group>

              ))
            }
          </Row>

        </Card>
      </Card.Body>
    </Card>
  );
}
