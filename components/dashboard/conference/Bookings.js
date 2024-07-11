import { faFileCsv, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CloseButton, Form, Modal, Pagination, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../../services/config';
import getServices, { cancelSlotService, deleteSlotService } from '../../../services/dashboard/conference';
import ExportModal from '../../common/ExportModal';
import GenericTable from '../../common/GenericTable';
import DeleteModal from '../../common/modals/DeleteModal';

export default function Bookings({ view }) {
  const [isLoading, setIsLoading] = useState(false);
  const [slotBookings, setSlotBookings] = useState([]);
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const [stateLevel, setStateLevel] = useState(true);
  const [districtLevel, setDistrictLevel] = useState(false);
  const [yearValue, setYearValue] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [slotId, setSlotId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());

  const router = useRouter();
  const { query, query: { page } } = router;
  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const dateTime = new Date();
  const formattedDate = moment(dateTime).format('YYYY-MM-DD HH:mm');
  const headers = getHeaders(accessToken);

  const getSlotBookings = () => {
    setIsLoading(true);
    const filterValue = moment(yearValue).format('MM-YYYY').split('-');
    if (view) {
      getServices(accessToken, `/admin/conferences/?page=${page || 1}&state_level=${stateLevel || ''}&district_level=${districtLevel || ''}&month=${Number(filterValue[0]) || ''}&year=${Number(filterValue[1]) || ''}`).then(({ data, errors }) => {
        if (data) {
          const { results, previous, next } = data;
          setSlotBookings(results);
          setPrevious(previous);
          setNext(next);
        } else {
          console.log(errors, 'errors');
        }
      }).finally(() => setIsLoading(false));
    } else {
      getServices(accessToken, `/admin/conferences/?page=${page || 1}&request_date=${formattedDate}`).then(({ data, errors }) => {
        if (data) {
          const { results, previous, next } = data;
          setSlotBookings(results);
          setPrevious(previous);
          setNext(next);
        } else {
          console.log(errors, 'errors');
        }
      }).finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    router.push({
      pathname: view === 'All Bookings' ? '/dashboard/conference/all-records' : '/dashboard/conference/bookings',
      query: { ...query, page },
    });
    if (stateLevel || districtLevel || view === 'All Bookings' || yearValue) {
      getSlotBookings();
    }
  }, [stateLevel, districtLevel, view, yearValue, page]);

  const getPaginatedDetails = (value) => {
    router.push({
      pathname: view === 'All Bookings' ? '/dashboard/conference/all-records' : '/dashboard/conference/bookings',
      query: { page: (value.includes('page') && (value.split('page=').map((i) => i.split('&'))[1][0]).split('='))[0] },
    });
    setIsLoading(true);
  };

  const cancelSlot = () => {
    setIsLoading(true);
    cancelSlotService(accessToken, slotId).then(({ data, errors }) => {
      if (data) {
        getSlotBookings();
        setShowModal(false);
      } else {
        console.log(errors, 'errors');
      }
    }).finally(() => setIsLoading(false));
  };

  const renderButtons = () => (
    <div className="d-flex justify-content-center">
      <Form className="d-flex my-1 me-3">
        <DatePicker
          selected={yearValue}
          onChange={(date) => {
            setYearValue(date);
          }}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          className="date-picker-input"
        />
      </Form>
      {/* {isLoggedIn && (
      <Button variant="primary" className="float-end me-2" onClick={() => router.push('/dashboard/conference/bookings/add-conference-booking')}>
        <FontAwesomeIcon icon={faPlus} />
        {' '}
        Book a Slot
      </Button>
      )} */}
      {view ? (
        <>
          <Button
            onClick={() => {
              setStateLevel(true);
              setDistrictLevel(false);
            }}
          >
            State Level
          </Button>
          <Button
            className="mx-3"
            onClick={() => {
              setDistrictLevel(true);
              setStateLevel(false);
            }}
          >
            District VC
          </Button>
          {/* {roles && roles.includes('Admin') && (
          <Button variant="primary" onClick={() => downloadFile()} className="float-end">
            <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
          </Button>
          )} */}
        </>
      ) : ''}
    </div>
  );

  const downloadFile = () => {
    const todayDate = moment(new Date()).format('LL');
    setIsLoading(true);
    axiosInstance.get('/admin/export/conferences/', { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${'tenders_'}${todayDate}.csv`);
        setIsLoading(false);
      });
  };

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
          Cancel the slot
        </Modal.Title>
        <CloseButton onClick={() => setShowModal(false)} />
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to cancel this slot
          {' '}
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
        <Button onClick={() => cancelSlot()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );

  const BookingTableData = [
    {
      title: 'S. No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{(index + 1)}</span>
        </div>
      ),
    },
    {
      id: 'date',
      title: 'Booking Date',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{moment(rowData.request_date).format('DD-MM-YYYY dddd')}</span>
        </div>
      ),
    },
    {
      id: 'time',
      title: 'Time',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>
            {moment(rowData.start_date).format('HH:mm')}
            {' '}
            -
            {' '}
            {moment(rowData.end_date).format('HH:mm')}
            {' '}
          </span>
        </div>
      ),
    },
    {
      id: 'district',
      title: stateLevel ? 'Location' : 'District',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{rowData.location ? rowData.location.name : rowData.district.name}</span>
        </div>
      ),
    },
    {
      id: 'subject',
      title: 'Subject',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{rowData.subject}</span>
        </div>
      ),
    },
    {
      id: 'participants',
      title: 'Participants',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{rowData.participants}</span>
        </div>
      ),
    },
    {
      id: 'Department',
      title: 'Department',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{rowData.department.name}</span>
        </div>
      ),
    },
    // {
    //   id: 'cmo_letter_no',
    //   title: 'CMO/CSO Letter No',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.cmo_letter_no}</span>
    //     </div>
    //   ),
    // },
    // {
    //   id: 'cmo_letter_date',
    //   title: 'CMO/CSO Letter Date',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.cmo_letter_date}</span>
    //     </div>
    //   ),
    // },
    {
      id: 'phone_number',
      title: 'Phone Number',
      width: '',
      render: (rowData) => (
        <div>
          <span className={`${rowData.is_approved ? '' : 'text-danger'}`}>{rowData.phone_number}</span>
        </div>
      ),
    },
    {
      id: 'status',
      title: 'Status',
      width: '',
      render: (rowData) => (
        <div>
          { rowData.is_deleted ? (<span>Deleted</span>) : rowData.is_approved
            ? (<span>Confirmed</span>)
            : (
              <span className="text-danger">
                Pending Confirmation
              </span>
            )}
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex justify-content-between p-2">
          <button
            onClick={() => { router.push(`/dashboard/conference/bookings/edit-conference-booking/${rowData.id}`); }}
            type="button"
            className="apts-admin-tenders-button"
          >
            <FontAwesomeIcon icon={faPen} className="text-primary" />
          </button>
          <button
            disabled={rowData.is_deleted}
            onClick={() => {
              setSlotId(rowData.id);
              setShowDeleteModal(true);
            }}
            type="button"
            className="apts-admin-tenders-button"
          >
            <FontAwesomeIcon icon={faTrash} className="text-danger me-2" />
          </button>
          {/* <Button
            className="btn-sm download-btn"
            onClick={() => {
              setSlotId(rowData.id);
              setShowModal(true);
            }}
            disabled={rowData.is_cancelled}
          >
            Cancel
          </Button> */}
        </div>
      ),
    },
  ];

  const AllBookingTableData = [
    {
      title: 'S. No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1)}</span>
        </div>
      ),
    },
    {
      id: 'date',
      title: 'Booking Date',
      width: '',
      render: (rowData) => (
        <div>
          <span>{moment(rowData.request_date).format('DD-MM-YYYY dddd')}</span>
        </div>
      ),
    },
    {
      id: 'time',
      title: 'Time',
      width: '',
      render: (rowData) => (
        <div>
          <span>
            {moment(rowData.start_date).format('HH:mm')}
            {' '}
            -
            {' '}
            {moment(rowData.end_date).format('HH:mm')}
            {' '}
          </span>
        </div>
      ),
    },
    {
      id: 'district',
      title: stateLevel ? 'Location' : 'District',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.location ? rowData.location.name : rowData.district.name}</span>
        </div>
      ),
    },
    {
      id: 'subject',
      title: 'Subject',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.subject}</span>
        </div>
      ),
    },
    {
      id: 'participants',
      title: 'Participants',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.participants}</span>
        </div>
      ),
    },
    {
      id: 'Department',
      title: 'Department',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.department.name}</span>
        </div>
      ),
    },
    // {
    //   id: 'cmo_letter_no',
    //   title: 'CMO/CSO Letter No',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.cmo_letter_no}</span>
    //     </div>
    //   ),
    // },
    // {
    //   id: 'cmo_letter_date',
    //   title: 'CMO/CSO Letter Date',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.cmo_letter_date}</span>
    //     </div>
    //   ),
    // },
    {
      id: 'phone_number',
      title: 'Phone Number',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.phone_number}</span>
        </div>
      ),
    },
    {
      id: 'status',
      title: 'Approved',
      width: '',
      render: (rowData) => (
        <div>
          <span>
            {rowData.is_deleted ? (<span>Deleted</span>) : rowData.is_approved
              ? (<span>Confirmed</span>)
              : (
                <span className="text-danger">
                  Pending Confirmation
                </span>
              )}
          </span>
        </div>
      ),
    },
  ];

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
      {renderModal()}
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        id={slotId}
        onClose={() => {
          setShowDeleteModal(false);
          getSlotBookings();
        }}
        deleteService={deleteSlotService}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="table-responsive">
            <div className="applicants-style">
              {view ? (
                <h2 className="your-cart">
                  {stateLevel ? 'State Level All VC Bookings' : 'District Level All VC Bookings'}
                </h2>
              ) : <h2 className="your-cart">Video Conference Slot Bookings</h2>}

              {view && (
                <div>
                  {renderButtons()}

                </div>
              )}
              {roles && roles.includes('Admin') && (
              <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
              </Button>
              )}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={view ? AllBookingTableData : BookingTableData}
            dataSet={slotBookings.length && slotBookings}
            loading={isLoading}
          />
          <ExportModal
            show={showExportModal}
            onHide={() => setShowExportModal(false)}
            onClose={() => setShowExportModal(false)}
            path={router.asPath.includes('bookings')
              ? `/admin/export/conferences/?request_date=${moment(formattedDate).format('YYYY-MM-DD HH:mm')}&from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`
              : (
                stateLevel && `/admin/export/conferences/?state_level=${stateLevel || ''}&from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}` || districtLevel && `/admin/export/conferences/?district_level=${districtLevel || ''}&from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`)}
            title={router.asPath.includes('bookings') ? 'Active Bookings' : (stateLevel && 'State level bookigs' || districtLevel && 'District level bookings')}
            toDate={toDate}
            setTodDate={setTodDate}
            fromDate={fromDate}
            setFromDate={setFromDate}
          />
          <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => getPaginatedDetails(previous)} disabled={!previous}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => getPaginatedDetails(next)} disabled={!next}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </Card.Body>
      </Card>
    </div>
  );
}
