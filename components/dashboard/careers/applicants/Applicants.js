import { faFileCsv, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDays, subDays } from 'date-fns';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Row, Spinner,
} from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { getJobsService, getQualificationsService } from '../../../../services/dashboard/jobs';
import ExportModal from '../../../common/ExportModal';
import ApplicantsTable from './ApplicantTable';

export default function Applicants() {
  const router = useRouter();
  const {
    query, query: {
      search, page, type, qualification, year_of_passing, start_date, end_date,
    },
  } = router;

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);
  const [searchText, setSearchText] = useState(search);
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [jobtype, setJobType] = useState(type);
  const [isLoading, setIsLoading] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setTodDate] = useState(null);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(qualification);
  const [yearOfPassing, setYearOfPassing] = useState(year_of_passing ? new Date(`01 01 ${year_of_passing}`) : null);
  const [startDate, setStartDate] = useState(start_date ? new Date(`${start_date}`) : null);
  const [endDate, setEndDate] = useState(end_date ? new Date(`${end_date}`) : null);

  const getJobs = (search) => {
    getJobsService(accessToken, `/admin/jobs/?search=
    ${search}`)
      .then(({ data, error }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setJobs(results);
          if (type) {
            setJobType(results.filter((filterItem) => filterItem.id === Number(type))[0]);
          }
        }
      });
  };

  const getQualifications = () => {
    getQualificationsService(headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          const { results } = data;
          setQualificationOptions(results);
          if (qualification) {
            setSelectedQualification(results.filter((item) => item.id === Number(qualification))[0]);
          }
        } else {
          setQualificationOptions([]);
        }
      });
  };

  useEffect(() => {
    getJobs('');
    getQualifications();
  }, []);

  useEffect(() => {
    if (type || year_of_passing || qualification || start_date || end_date) {
      setShowFilters(true);
    }
  }, [type, year_of_passing, qualification, start_date, end_date]);

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            <Col xs={12} md={4}>
              <Form.Label>Job</Form.Label>
              <Select
                name="dependant_on"
                value={jobtype}
                options={jobs}
                getOptionLabel={(options) => options.title}
                getOptionValue={(options) => options.id}
                onInputChange={(
                  inputValue,
                  { action, prevInputValue },
                ) => {
                  switch (action) {
                    case 'set-value':
                      return prevInputValue;
                    case 'input-change':
                      if (inputValue) {
                        getJobs(inputValue);
                      } else {
                        getJobs('');
                      }
                      return inputValue;
                    default:
                      return inputValue;
                  }
                }}
                isSearchable
                isClearable
                closeMenuOnSelect
                onChange={(newValue, actionMeta) => {
                  const { action } = actionMeta;
                  if (action === 'select-option' || action === 'remove-value') {
                    router.push({
                      pathname: '/dashboard/careers/applicants/',
                      query: { ...query, type: newValue.id, page: 1 },
                    });
                    setJobType(newValue);
                  } else if (action === 'clear') {
                    setJobType('');
                    router.push({
                      pathname: '/dashboard/careers/applicants/',
                      query: { ...query, type: '', page: 1 },
                    });
                  }
                }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>
                  Educational Qualifications
                </Form.Label>
                <Select
                  name="qualifications"
                  value={selectedQualification}
                  options={qualificationOptions}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  isSearchable
                  isClearable
                  closeMenuOnSelect
                  onChange={(newValue, actionMeta) => {
                    const { action } = actionMeta;
                    if (action === 'select-option' || action === 'remove-value') {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, qualification: newValue.id, page: 1 },
                      });
                      setSelectedQualification(newValue);
                    } else if (action === 'clear') {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, qualification: '', page: 1 },
                      });
                      setSelectedQualification('');
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Year of Passing</Form.Label>
                <ReactDatePicker
                  selected={yearOfPassing}
                  onChange={(date) => {
                    setYearOfPassing(date);
                    if (date) {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, year_of_passing: Number(moment(date).format('YYYY')), page: 1 },
                      });
                    } else {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, year_of_passing: '', page: 1 },
                      });
                    }
                  }}
                  minDate={subDays(new Date(), 14600)}
                  maxDate={addDays(new Date(), 5)}
                  placeholderText="Year of Passing"
                  showYearPicker
                  dateFormat="yyyy"
                  isClearable
                  className="date-picker-input"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="start_date" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (date) {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, start_date: moment(date).format('yyyy-MM-DD'), page: 1 },
                      });
                    } else {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, start_date: '', page: 1 },
                      });
                    }
                  }}
                  placeholderText="Start Date"
                  isClearable
                  className="date-picker-input"
                  showMonthYearDropdown
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="end_date" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <ReactDatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    if (date) {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, end_date: moment(date).format('yyyy-MM-DD'), page: 1 },
                      });
                    } else {
                      router.push({
                        pathname: '/dashboard/careers/applicants/',
                        query: { ...query, end_date: '', page: 1 },
                      });
                    }
                  }}
                  placeholderText="End Date"
                  isClearable
                  className="date-picker-input"
                  showMonthYearDropdown
                />
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Card>
  );

  return (
    <Card className="pt-2 pb-3">
      <Card.Header className="bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h2 className="your-cart">Applicants</h2>
              </Col>
              <Col xs={12} md={4}>
                <div className="applicants-style1">
                  <InputGroup size="md" className="mx-3">
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
                          pathname: '/dashboard/careers/applicants/',
                          query: { search: e.target.value },
                        });
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" className="float-end me-3" onClick={() => setShowFilters(!showFilters)}>
                    <FontAwesomeIcon icon={faFilter} />
                  </Button>
                  {roles && (roles.includes('Admin') || roles.includes('Careers')) && (
                  <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                    <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                  </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {showFilters && renderFilters()}
        <ApplicantsTable />
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/job-applications/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}&job=${type || ''}&qualification=${qualification || ''}&year_of_pass=${Number(year_of_passing) || ''}&start_date=${start_date ? moment(start_date).format('YYYY-MM-DD') : ''}&end_date=${end_date ? moment(end_date).format('YYYY-MM-DD') : ''}`}
          title="Job-Applicants"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
      </Card.Body>
    </Card>
  );
}
