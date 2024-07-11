import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Image, Pagination, Row
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import axiosInstance from '../../services/config';
import GenericTable from '../common/GenericTable';

export default function VCManagement(props) {
  const { view } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [slotBookings, setSlotBookings] = useState([]);
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const [stateLevel, setStateLevel] = useState(true);
  const [districtLevel, setDistrictLevel] = useState(false);
  const [yearValue, setYearValue] = useState(new Date());

  const dateTime = new Date();
  // const lastDay = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0);
  const formattedDate = moment(dateTime).format('YYYY-MM-DD');
  // const formattedLastDay = moment(lastDay).format('YYYY-MM-DD');
  const { isLoggedIn } = useSelector((state) => state.user);
  const router = useRouter();

  const getSlotBookings = () => {
    setIsLoading(true);
    if (view) {
      const filterValue = moment(yearValue).format('MM-YYYY').split('-');
      axiosInstance.get(`/conferences/?state_level=${stateLevel || ''}&district_level=${districtLevel || ''}&month=${Number(filterValue[0]) || ''}&year=${Number(filterValue[1]) || ''}`).then((data, errors) => {
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
      axiosInstance.get(`/conferences/?state_level=${stateLevel || ''}&district_level=${districtLevel || ''}&request_date=${formattedDate}`).then((data, errors) => {
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
    if (stateLevel || districtLevel || view === 'AllBookings' || yearValue) {
      getSlotBookings();
      console.log('log');
    }
  }, [stateLevel, districtLevel, view, yearValue]);

  const getPaginatedDetails = (value) => {
    const path = (value.includes('conferences') && value.split('?').map((i) => i.split('https://apts.wmltech.com/api-server/api'))[1][0]) || 1;
    setIsLoading(true);
    axiosInstance.get(`/conferences/?${path}`).then((data, errors) => {
      if (data) {
        const { results, previous, next } = data;
        setSlotBookings(results);
        setPrevious(previous);
        setNext(next);
      } else {
        console.log(errors, 'errors');
      }
    }).finally(() => setIsLoading(false));
  };

  const renderButtons = () => (
    <Container>
    <div className="mt-5">
      <Row>
      <Col xs={12} md={3}></Col>
        <Col xs={12} md={2} className="text-md-end">
      {view ? (
        <Form className="">
          <Form.Group className="mb-3">
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
          </Form.Group>
        </Form>
      ) : ''}
      </Col>
      <Col xs={12} md={2} className="text-md-center">
      <Button
        onClick={() => {
          setStateLevel(true);
          setDistrictLevel(false);
        }}
        className="mb-3 text-nowrap w-md-100"
      >
        State Level
      </Button></Col>
      <Col xs={12} md={5} className="text-md-start ">
      <Button onClick={() => {
        setDistrictLevel(true);
        setStateLevel(false);
      }} className="text-nowrap w-md-100"
      >
        District VC
      </Button>
      </Col>
      </Row>
    </div>
    </Container>
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
            to
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
          {rowData.is_approved
            ? (<span>Confirmed</span>)
            : (
              <span className="text-danger">
                Pending Confirmation
              </span>
            )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {!view ? (
        <div className="services-bg">
          <Container className="innerPage mb-5">
            <h2 className="text-center p-4 apts-services-title">VC Management</h2>
            <Row className="g-4">
              <Col xs={12} md={4}>
                <Image
                  src="/images/vc-management_1.jpg"
                  rounded
                  className="w-100 shadow innerpages-img-borders1"
                  alt="APSWAN"
                />
              </Col>
              <Col xs={12} md={8} className="innerpage-centent-list">
                <div className="mx-3">
                  <h5>Video Conference services (VC Management):</h5>
                  <p>
                    The Govt. of AP is providing video conference service to Revenue Department and
                    to HOD offices from 1998 onwards. Currently the service is available in around
                    700 offices across AP. Few departments are asking for the services at their
                    offices.
                    {/* <a href="https://videonew.apts.gov.in/" target="_blank" rel="noreferrer">https://videonew.apts.gov.in/</a> */}
                  </p>
                  <p>
                    <Link href="/documents/U-O-Note-No-1636383-PU-A-2022-1.pdf">
                      <a target="_blank" className="text-danger">
                        Please Download Attachment to follow the C.S directions on -VC by
                        Secretaries/HODs with District Collectors and Joint Collectors
                      </a>
                    </Link>
                  </p>
                  <p className="">
                    <h5 className="text-success">Please contact 9652230088 for your video conference booking slot confirmation.</h5>
                  </p>

                  <div className="mt-3">
                    <Link href="/infrastructure-support/vc-management/vc-booking">
                      <a rel="noreferrer">
                        <Button className="me-5 w-md-100 my-md-3 mt-md-3">
                          Book your Slot
                        </Button>
                      </a>
                    </Link>
                    <Link href="/infrastructure-support/vc-management/all-bookings">
                      <a rel="noreferrer">
                        <Button className="w-md-100">
                          All Bookings
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : ''}
      <div className="">
        <Row>
          <Col>
            {/*  <div className=''>

                <div className="tender-scroll-text-container">
                  <div className="tender-scroll-text">

                    <Link href="/documents/U-O-Note-No-1636383-PU-A-2022-1.pdf">
                <a target="_blank" className='text-danger'>
                      Please Download Attachment to follow the C.S directions on -VC by Secretaries/HODs with District Collectors and Joint Collectors
                      </a>
                      </Link>

                  </div>
                </div>

            </div>
            <div className="">

              <div className="tender-scroll-text-container">
                <div className="tender-scroll-text">
                  <p className="">
                    <h4 className="text-success">Please contact 9652230088 for your video conference booking slot confirmation.</h4>
                  </p>

                </div>
              </div>

              </div>
              */}
          </Col>
        </Row>
        <Container className="innerPage mb-5">
          <Row>
            <Col>
              {view ? <h2 className="text-center pb-4 apts-services-title mt-md-3">All Video Conference Bookings</h2> : ''}
              {renderButtons()}
              <h4 className="mt-md-3 text-center">
                {' '}
                {districtLevel ? 'District' : 'State'}
                {' '}
                Level VC Booking Status as on
                {' '}
                {moment(dateTime).format('DD-MM-YYYY')}
              </h4>
            </Col>
          </Row>
          {view && (
            <Row>
              <Col className="d-flex justify-content-end">
                {' '}
                <Button className="px-3 mb-3" onClick={() => router.back()}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {' '}
                  &nbsp;
                  Back
                </Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <GenericTable
                tableData={BookingTableData}
                dataSet={slotBookings.length && slotBookings}
                loading={isLoading}
              />
              <Pagination className="pagenation-style">
                <Pagination.Prev onClick={() => getPaginatedDetails(previous)} disabled={!previous}>
                  &laquo; Previous
                </Pagination.Prev>
                <Pagination.Next onClick={() => getPaginatedDetails(next)} disabled={!next}>
                  Next &raquo;
                </Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
