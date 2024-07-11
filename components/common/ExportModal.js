import { faCheck, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Alert,
  Button, CloseButton, Col, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../../services/config';

export default function ExportModal(props) {
  const {
    onHide, title, errors, fromDate, setFromDate, toDate, setTodDate, path,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState('');

  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const downloadFile = () => {
    if (moment(fromDate).format('YYYY-MM-DD') < moment(toDate).format('YYYY-MM-DD')) {
      const todayDate = moment(new Date()).format('LL');
      setIsLoading(true);
      axiosInstance.get(path, { headers, responseType: 'blob' })
        .then((response) => {
          saveAs(response, `${title}_${todayDate}.csv`);
          setIsLoading(false);
          onHide();
          setFromDate(null);
          setTodDate(null);
        });
    } else {
      setDateErrors('fromdate should be lessthan todate');
    }
  };

  if (isLoading) {
    return (
      <Modal>
        <div className="tender-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          Export
          {' '}
          {title}
        </Modal.Title>
        <CloseButton onClick={() => {
          onHide();
          setFromDate(null);
          setTodDate(null);
        }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>From</Form.Label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => {
                  setFromDate(date);
                  setDateErrors('');
                  setTodDate();
                }}
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                className="date-picker-input"
                minDate={title === 'Active Bookings' && moment().toDate()}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>To</Form.Label>
              <DatePicker
                selected={toDate}
                onChange={(date) => {
                  setTodDate(date);
                  setDateErrors('');
                }}
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                className="date-picker-input"
                minDate={title === 'Active Bookings' && moment().toDate()}
              />
            </Form.Group>
          </Row>
        </Form>
        <p style={{ color: '#dc3545', fontSize: '14px' }}>
          {errors && errors.nonFieldErrors}
        </p>
        {dateErrors && (
        <Alert variant="danger">
          {dateErrors}
        </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            onHide();
            setFromDate(null);
            setTodDate(null);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => downloadFile()}>
          {
            isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <div>
                Submit
              </div>
            )
          }
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
