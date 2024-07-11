import {
  faCircleXmark,
  faClipboardCheck,
  faEye,
  faFileCsv, faPen, faPlus, faSearch, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CloseButton, Col, Form, FormControl, InputGroup, Modal, Pagination, Row, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getVendorsServices, { approveOrRejectVendorService, deleteVendorService } from '../../../../services/dashboard/vendorempannelment/vendor';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function VendorList() {
  const router = useRouter();

  const { query: { search, organization, page }, query } = router;

  const { accessToken, userDetails: { type: userType, roles } } = useSelector(
    (state) => state.user,
  );

  const [vendorData, setVendorData] = useState();
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(search);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [organizationType, setOrganizationType] = useState(organization);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());
  const [approvedModal, setApproveModal] = useState(false);
  const [isApproved, setIsApproved] = useState('');
  const [errors, setErrors] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    const newQuery = {
      ...query,
      page,
      organization: organizationType || '',
      search: searchText || '',
    };
    Object.keys(newQuery).forEach((mapItem) => {
      if (!newQuery[mapItem]) {
        delete newQuery[mapItem];
      }
    });

    router.push({
      pathname: '/dashboard/vendor-empanelment/vendorlist',
      query: newQuery,
    });

    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      getVendorsServices(accessToken, `/admin/vendors/?page=${page || 1}&search=${searchText || ''}&type=${organizationType || ''}`).then(({ data, errors }) => {
        if (data) {
          const {
            count, next, previous, results,
          } = data;
          setVendorData(results);
          setPrevious(previous);
          setNext(next);
        } else {
          setVendorData([]);
        }
      }).finally(() => setIsLoading(false));
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText, organizationType, page]);

  const approveVendor = () => {
    const type = isApproved === 'Approve' ? 'approve' : 'reject';
    console.log(accessToken, editData.id, type, 'kkk');
    approveOrRejectVendorService(accessToken, editData.id, type, { rejected_reason: rejectReason }).then(({ data, errors: err }) => {
      if (data) {
        getVendors();
        setApproveModal(false);
      } else {
        setErrors(err);
      }
    });
  };

  useEffect(() => {
    getVendorsServices(accessToken, '/admin/vendor-types/').then(({ data, results }) => {
      if (data) {
        setOrganizationTypes(data);
        setIsLoading(false);
      }
    });
  }, []);

  const vendorListTableData = [
    {
      title: 'S.No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>
            {(index + 1)}
            .
          </span>
        </div>
      ),
    },
    {
      title: 'Vendor Name',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.name}</span>
        </div>
      ),
    },
    {
      title: 'Vendor Address',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>
            {rowData.address_1}
            {' '}
            {rowData.address_2}
            {rowData.registered_address}
          </span>
        </div>
      ),
    },
    {
      title: 'Email',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>
            {rowData.email}
            {' '}
            {rowData.contact_person_email}
          </span>
        </div>
      ),
    },
    {
      title: 'Mobile',
      width: '',
      id: 'name',
      render: (rowData) => (
        <div>
          <span>
            {rowData.phone_number}
            { rowData.contact_person_mobile}
          </span>
        </div>
      ),
    },
    // {
    //   title: 'Approved',
    //   id: 'approved',
    //   width: '',
    //   render: (rowData) => (
    //     <div className="text-center">
    //       <span>
    //         {rowData.status === 'ACCEPTED'
    //           ? <FontAwesomeIcon icon={faClipboardCheck} className="text-success" />
    //           : rowData.status === 'REJECTED'
    //             ? <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />
    //             : '-'}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      title: 'Status',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.status === 'ACCEPTED'
              ? <FontAwesomeIcon icon={faClipboardCheck} className="text-success" />
              : rowData.status === 'REJECTED'
                ? <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />
                : ''}
          </span>
          <p className="text-center">
            {' '}
            {rowData.status_display_name}
          </p>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex justify-content-between ms-2">
          {/* <Button
            className="btn-sm bg-success"
            onClick={() => {
              setIsApproved('Approve');
              setEditData(rowData);
              setApproveModal(true);
            }}
          >
            Approve
          </Button>
          <Button
            className="btn-sm bg-danger mx-2"
            onClick={() => {
            setErrors([]);;
              setIsApproved('Reject');
              setEditData(rowData);
              setApproveModal(true);
            }}
          >
            Reject
          </Button> */}
          {/* <button type="button" className="apts-admin-tenders-button ms-2">
            <FontAwesomeIcon icon={faPen} onClick={() => router.push(`/dashboard/vendor-empanelment/vendorlist/edit-vendor/${rowData.id}`)} className="text-primary" />
          </button> */}
          <button type="button" className="apts-admin-tenders-button ms-2">
            <FontAwesomeIcon icon={faEye} onClick={() => router.push(`/dashboard/vendor-empanelment/vendorlist/view-vendor/${rowData.id}`)} className="text-primary" />
          </button>
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
          </button>
        </div>
      ),
    },
  ];

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

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/vendor-empanelment/vendorlist',
      query: {
        ...query,
        page: (path.includes('page') && (path.split('page=').map((i) => i.split('&'))[1][0]).split('='))[0] || 1,
      },
    });
    setIsLoading(true);
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
    <div>
      {/* {renderApproveModal()} */}
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <Row>
            <Col xs={12} md={4}>
              <h2 className="your-cart">Vendors</h2>
            </Col>
            <Col xs={12} md={8}>
              <div className="applicants-style1">
                <InputGroup size="md" className="mx-3 w-50">
                  <InputGroup.Text id="basic-addon1">
                    {' '}
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Search Here.."
                    aria-label="Username"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      router.push({
                        pathname: '/dashboard/vendor-empanelment/vendorlist',
                        query: { search: e.target.value },
                      });
                    }}
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Form.Group className="me-3 w-50">
                  <Form.Select
                    value={organizationType}
                    onChange={(e) => {
                      setOrganizationType(e.target.value);
                      router.push({
                        pathname: '/dashboard/vendor-empanelment/vendorlist',
                        query: { organization: e.target.value },
                      });
                    }}
                  >
                    <option value="">Filter By Organization Type.</option>
                    {organizationTypes.map((option) => (
                      <option value={option.value}>
                        {' '}
                        {option.text}
                        {' '}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" className="w-50 mx-3" onClick={() => router.push('/dashboard/vendor-empanelment/vendorlist/add-vendor')}>
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add Vendor
                </Button>
                {roles && roles.includes('Admin') && (
                  <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                    <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={vendorListTableData}
            dataSet={vendorData}
            loading={false}
          />
          <Pagination className="pagenation-style mt-2">
            <Pagination.Prev onClick={() => handlePath(previous)} disabled={!previous}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(next)} disabled={!next}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </Card.Body>
        <DeleteModal
          show={showDeleteModal}
          onHide={() => { setShowDeleteModal(false); }}
          onClose={() => { setShowDeleteModal(false); getVendors(); }}
          id={editData.id}
          title="Vendor"
          deleteService={deleteVendorService}
        />
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/vendors/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(moment(toDate).format('YYYY-MM-DD')).format('YYYY-MM-DD')}`}
          title="Vendors"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
      </Card>
    </div>

  );
}
