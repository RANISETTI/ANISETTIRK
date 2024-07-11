import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, CloseButton, Col, Form, Modal, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  approveVendorCategoryStatusService, rejectVendorCategoryStatusService, requestForRefund, updateStatusService
} from '../../../../services/dashboard/digitalcertificates/dse';
import { getServices } from '../../../../services/dashboard/masters';
import { getVendorEmpanelmentDetailsService, getVendorEmpanelmentDetailsServiceByVendor } from '../../../../services/dashboard/vendorempannelment/vendorProductEmapanelment';
import Page404 from '../../../common/customerrorpages/Page404';
import GenericAlert from '../../../common/GenericAlert';

export default function ViewVendorEmpanelmentProduct() {
  const {
    accessToken,
    userDetails: { type: userType, roles, organization },
  } = useSelector((state) => state.user);

  const [errors, setErrors] = useState('');
  const [vendorEmpanelmentProductDetails, setVendorEmpanelmentProductDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState();
  const [approvedModal, setApproveModal] = useState(false);
  const [isApproved, setIsApproved] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [reason, setReason] = useState();
  const [refundModal, setRefundModal] = useState(false);
  const [reasonForRefund, setReasonForRefund] = useState({});
  const [reasonErrors, setReasonErrors] = useState({});
  const [documents, setDocuments] = useState([]);

  const router = useRouter();

  const { query: { id: applicationId } } = router;

  const getVendorEmpanelmentDetailsByVendor = () => {
    setIsLoading(true);
    getVendorEmpanelmentDetailsServiceByVendor(accessToken, applicationId, organization.id).then(({ data }) => {
      console.log(data, 'data');
      if (data) {
        setVendorEmpanelmentProductDetails(data);
        getServices(accessToken, `/vendors/${organization.id}/categories/${applicationId}/documents/`).then(({ data }) => {
          if (data) {
            setDocuments(data);
          }
        });
      }
    }).finally(() => setIsLoading(false));
  };

  const getVendorEmpanelmentDetails = async () => {
    setIsLoading(true);
    await getVendorEmpanelmentDetailsService(accessToken, applicationId).then(({ data }) => {
      if (data) {
        setVendorEmpanelmentProductDetails(data);
        getServices(accessToken, `/vendors/${data.vendor.id}/categories/${applicationId}/documents/`).then(({ data }) => {
          if (data) {
            setDocuments(data);
          }
        });
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (userType === 'VENDOR') {
      getVendorEmpanelmentDetailsByVendor();
    } else {
      getVendorEmpanelmentDetails();
    }
  }, []);

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
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

  const updateStatus = (type, vendorId) => {
    if (type === 'Approve') {
      approveVendorCategoryStatusService(
        accessToken,
        vendorEmpanelmentProductDetails.id,
        applicationId,
      ).then(({ data, errors }) => {
        if (data) {
          setApproveModal(false);
          getVendorEmpanelmentDetails(applicationId);
        } else {
          setErrors(errors);
        }
      });
    } else if (type === 'Reject') {
      rejectVendorCategoryStatusService(
        accessToken,
        vendorEmpanelmentProductDetails.id,
        applicationId,
        { rejected_reason: rejectReason },
      ).then(({ data, errors }) => {
        if (data) {
          setApproveModal(false);
          getVendorEmpanelmentDetails(applicationId);
        } else {
          setErrors(errors);
        }
      });
    } else {
      updateStatusService(accessToken, applicationId, { status }).then(({ data, errors }) => {
        if (data) {
          setApproveModal(false);
          getVendorEmpanelmentDetails(applicationId);
        } else {
          setErrors(errors);
        }
      });
    }
  };

  const onRequestRefund = () => {
    const formData = new FormData();
    formData.append('reason', reasonForRefund.reason);
    formData.append('document', reasonForRefund.document);
    requestForRefund(
      accessToken,
      organization.id,
      applicationId,
      formData,
    ).then(({ data, errors: err }) => {
      if (data) {
        setRefundModal('');
        setReasonErrors('');
        getVendorEmpanelmentDetailsByVendor();
      } else {
        setReasonErrors(err);
      }
    }).finally(() => setIsLoading(false));
  };

  const renderApproveModal = () => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={!!approvedModal}
      size="lg"
      onHide={() => {
        setApproveModal('');
        setErrors('');
      }}
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          {isApproved}
        </Modal.Title>
        <CloseButton onClick={() => {
          setErrors('');
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
          this Category
          ?
        </p>
        <p style={{ color: '#dc3545', fontSize: '14px' }}>
          {errors && errors.non_field_errors}
        </p>
        {!(isApproved === 'Approve') && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reason for rejection</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="rejectReason"
              id="rejectReason"
              name="rejectReason"
              autoComplete="off"
              placeholder="Enter Reason for rejection"
              onChange={(e) => {
                setRejectReason(e.target.value);
                setErrors('');
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
            setErrors('');
            setApproveModal(false);
          }}
        >
          Close
        </Button>
        <Button variant={isApproved === 'Approve' ? 'success' : 'danger'} onClick={() => updateStatus(isApproved)}>{isApproved}</Button>
      </Modal.Footer>
    </Modal>
  );

  const renderRequestRefundModal = () => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={!!refundModal}
      size="lg"
      onHide={() => {
        setRefundModal('');
        setReasonErrors('');
      }}
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          Request for refund
        </Modal.Title>
        <CloseButton onClick={() => {
          setErrors('');
          setRefundModal(false);
        }}
        />
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want request refund for
          {' '}
          {' '}
          this Category
          ?
        </p>
        <p style={{ color: '#dc3545', fontSize: '14px' }}>
          {reasonErrors && reasonErrors.non_field_errors}
        </p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Reason for request refund</Form.Label>
          <Form.Control
            type="reason"
            id="reason"
            name="reason"
            autoComplete="off"
            placeholder="Enter Reason for refund"
            onChange={(e) => {
              setReasonForRefund({ ...reasonForRefund, reason: e.target.value });
              setReasonErrors({ ...reasonErrors, reason: '' });
            }}
            isInvalid={!!reasonErrors.reason}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.reason}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formFile">
          <Form.Label className='form-required '>Document</Form.Label>
          <Form.Control
            type="file"
            id="document"
            name="document"
            autoComplete="off"
            placeholder="Enter Reason"
            onChange={(e) => {
              setReasonForRefund({ ...reasonForRefund, document: e.target.files[0] });
              setReasonErrors({ ...reasonErrors, document: '' });
            }}
            isInvalid={!!reasonErrors.document}
            required
          />
          <Form.Control.Feedback type="invalid">
            {reasonErrors.document}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setErrors('');
            setRefundModal(false);
          }}
        >
          Close
        </Button>
        <Button variant={isApproved === 'Approve' ? 'success' : 'danger'} onClick={() => onRequestRefund()}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );

  const {
    vendor,
    amount,
    created_ts,
    approved_ts,
    rejected_ts,
    apts_receipt_no,
    category,
    dd,
    dd_no,
    dd_date,
    bank,
    branch,
    receipt,
    sd_amount,
    sd_bank,
    sd_branch,
    sd_dd_no,
    sd_dd_date,
    sd_dd,
    approval_date,
    mom_date,
    receipt_date,
    status: vendorStatus,
    validity_date,
    rejected_reason,
    rejected_by,
    approved_by,
    maf,
    remarks,
  } = vendorEmpanelmentProductDetails;

  function refundStatus() {
    if (vendorStatus === 'REJECTED') {
      return (
        <GenericAlert
          type="danger"
          text={`Request for this category is rejected  on ${moment(rejected_ts).format('lll')} by ${rejected_by.first_name} - reason: ${rejected_reason}`}
        />
      );
    } if (vendorStatus === 'APPROVED') {
      return (
        <GenericAlert
          type="success"
          text={`Request for this category is approved on ${moment(approved_ts).format('lll')} by ${approved_by.first_name}`}
        />
      );
    }
    return (
      <GenericAlert
        type="secondary"
        text={`Request received on ${moment(created_ts).format('lll')} and status is pending`}
      />
    );
  }

  return (
    <Card className="pb-1">
      {renderApproveModal()}
      {renderRequestRefundModal()}
      <Card.Header className="pt-3 bg-transparent">
        <div className="order-details-style1">
          <h3 className="your-cart">
            Empanelment Category Details
          </h3>
          <div className="d-flex">
            {userType === 'VENDOR' && (
            <Button
              className="btn-md mx-2"
              onClick={() => {
                setRefundModal(true);
              }}
            >
              Request for refund
            </Button>
            )}
            {roles && roles.includes('Admin') && vendorStatus === 'PENDING'
            && (
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
            <Button className=" float-end" onClick={() => router.push('/dashboard/vendor-empanelment/empanelment-category-list/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {refundStatus()}
        {vendorStatus === 'REJECT' && (
        <div className="order-details-style1 d-flex justify-content-center mt-5">
          <Alert key="warning" variant="warning">
            Reason :---
          </Alert>
        </div>
        )}
        <Card className="p-3 rounded mt-3">
          <Row className="cust-form-label">
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Vendor Name : </Form.Label>
              <Form.Text className="">
                {vendor ? vendor.name : organization.name}
              </Form.Text>
            </Form.Group>
            {((vendor && vendor.phone_number) || (organization && organization.phone_number)) && (
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Mobile No :</Form.Label>
              <Form.Text className="">
                {vendor ? vendor.phone_number : organization.phone_number}
              </Form.Text>
            </Form.Group>
            )}
            {((vendor && vendor.email) || (organization && organization.email)) && (
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Email :</Form.Label>
              <Form.Text className="">
                {vendor ? vendor.email : organization.email}
              </Form.Text>
            </Form.Group>
            )}
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Category :</Form.Label>
              <Form.Text className="">
                {category.parent ? category.parent.name : category.name}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Sub Category :</Form.Label>
              <Form.Text className="">{category.parent ? category.name : '-'}</Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Approval Date :</Form.Label>
              <Form.Text className="">
                {approval_date ? moment(approval_date).format('DD-MM-YYYY') : '-'}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Receipt Date :</Form.Label>
              <Form.Text className="">{ receipt_date ? moment(receipt_date).format('DD-MM-YYYY') : '-'}</Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Validity Date :</Form.Label>
              <Form.Text className="">
                {validity_date ? moment(validity_date).format('DD-MM-YYYY') : '-'}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>MOM Date :</Form.Label>
              <Form.Text className="">
                {mom_date ? moment(mom_date).format('DD-MM-YYYY') : '-'}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>MAF :</Form.Label>
              <Form.Text className="">
                {maf || '-'}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Remarks :</Form.Label>
              <Form.Text className="">
                {remarks || '-'}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>APTS Receipt :</Form.Label>
              <a className="btn-sm download-btn pe-4 py-2 rounded text-white" href={receipt} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                View
              </a>
            </Form.Group>
          </Row>
          <Row className="cust-form-label">
            <Col xs={12} md={6}>
              <PaymentDetails
                title="Security Deposit"
                ddNo={sd_dd_no}
                amount={sd_amount}
                ddDate={sd_dd_date}
                bank={sd_bank}
                branch={sd_branch}
                ddFile={sd_dd}
              />
            </Col>
            <Col xs={12} md={6}>
              <PaymentDetails
                title="Processing Fee"
                ddNo={dd_no}
                amount={amount}
                ddDate={dd_date}
                bank={bank}
                branch={branch}
                ddFile={dd}
              />
            </Col>
          </Row>
          <CategoryDocuments
            documents={documents}
          />
        </Card>
      </Card.Body>
    </Card>
  );
}

export function PaymentDetails({
  title, ddNo, amount, ddDate, bank, branch, ddFile,
}) {
  return (
    <Row className="cust-form-label">
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          DD No :
        </Form.Label>
        <Form.Text className="">
          {ddNo}
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          Amount :
        </Form.Label>
        <Form.Text className="">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(title === 'Security Deposit' ? amount*(100000) : amount)}
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          DD Date :
        </Form.Label>
        <Form.Text className="">
          {moment(ddDate).format('DD-MM-YYYY')}
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          Bank :
        </Form.Label>
        <Form.Text className="">
          {bank}
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          Branch :
        </Form.Label>
        <Form.Text className="">
          {branch}
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} xs={12} className="mb-2">
        <Form.Label>
          {title}
          {' '}
          DD :
        </Form.Label>
        <a className="btn-sm download-btn pe-4 py-2 rounded text-white" href={ddFile} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFilePdf} className="me-2" />
          View
        </a>
      </Form.Group>
    </Row>
  );
}

export function CategoryDocuments({ documents }) {
  return (
    <Card className="pt-3 bg-transparent">
      <Card.Header className="pt-3 bg-transparent">
        <h5>Documents</h5>
      </Card.Header>
      <Card.Body>
        {
          documents.map((item) => {
            const { id, name, document } = item;
            return (
              <Form.Group as={Col} xs={12} md={6} className="mb-2" key={id}>
                <Form.Label className="me-4">
                  {name}
                  :
                </Form.Label>
                <a className="btn-sm download-btn pe-4 py-2 rounded text-white" href={document} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                  View
                </a>
              </Form.Group>
            );
          })
        }
      </Card.Body>
    </Card>
  );
}
