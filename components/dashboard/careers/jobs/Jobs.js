import {
  faCircleCheck, faCircleXmark, faFileCsv, faFilter, faPen, faPlus, faSearch, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Spinner, Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../../services/dashboard/departments';
import { getJobsService } from '../../../../services/dashboard/jobs';
import { genericGetService } from '../../../../services/GenericService';
import ExportModal from '../../../common/ExportModal';
import DeleteJob from './DeleteJob';

export default function Jobs() {
  const router = useRouter((state) => state);
  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const {
    query: {
      page, search, department, active, type,
    },
  } = router;
  const headers = getHeaders(accessToken);
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState();
  const [showFilters, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState(search);
  const [previousPage, setPreviousPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const [action, setAction] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState('');
  const [departmentType, setDepartmentType] = useState();
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [jobType, setJobType] = useState(type);
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [published, setPublished] = useState(active);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());

  const getDepartments = (searchValue) => {
    getSecretariatDepartments(searchValue, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDepartmentOptions(data.results);
        } else {
          setDepartmentOptions([]);
        }
      });
  };

  const getHodDepartments = (parentId, searchValue) => {
    getHODDepartments(searchValue, parentId, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setHodDepartmentOptions(data.results);
        } else {
          setHodDepartmentOptions([]);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    genericGetService('/admin/job/types/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setJobTypeOptions(data.results);
        } else {
          setJobTypeOptions([]);
        }
      });
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        setHodDepartmentType(data);
      });
    }
    getDepartments('');
    getHodDepartments('');
  }, []);

  const getJobs = () => {
    setIsLoading(true);
    getJobsService(accessToken, `/admin/jobs/?page=${page || 1}&type=${jobType || ''}&department=${hodDepartmentType ? hodDepartmentType.id : ''}&active=${published || ''}`)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setCount(count);
        setJobs(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    if (hodDepartmentType || jobType || published) {
      setShowFilter(true);
      router.push({
        pathname: '/dashboard/careers/jobs/',
        query: {
          page,
          department: hodDepartmentType && hodDepartmentType.id,
          active: published,
          type: jobType,
        },
      });
    }
    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        getJobsService(accessToken, `/admin/jobs/?search=${searchText}`)
          .then(({
            data: {
              results, previous, next, count,
            },
          }) => {
            setJobs(results);
            setPreviousPage(previous);
            setNextPage(next);
          })
          .finally(() => { setIsLoading(false); });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    getJobs();
  }, [searchText, hodDepartmentType, jobType, published]);

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      props.map((item) => {
        tableRows.push(
          <tr>
            <td>{item.title}</td>
            <td>{item.type && item.type.name}</td>
            <td>{item.locations}</td>
            <td>{item.start_date}</td>
            <td>{item.end_date}</td>
            <td>
              <div className="text-center">
                {item.active ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" /> : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
              </div>
            </td>
            <td className="table-action">
              <button type="button" className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/careers/jobs/edit-job/${item.id}`); }} className="text-primary" />
              </button>
              <button type="button" className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(item); setShowDeleteModal(true); setAction('DELETE'); }} className="text-danger" />
              </button>
            </td>
          </tr>,
        );
      });
    }
    return tableRows;
  };

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/careers/jobs/',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][2].split('=')[1])) || 1,
        department: hodDepartmentType,
        active: published,
        type: jobType,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][2].split('=')[1])) || 1;
    getJobsService(accessToken, `/admin/jobs/?page=${pageNum || 1}&type=${jobType || ''}&department=${hodDepartmentType ? hodDepartmentType.id : ''}&active=${published || ''}`)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setJobs(results);
        setCount(count);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
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

  const renderTable = () => (
    <div>
      <div>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Locations</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length ? renderTableData(jobs) : (
              <tr>
                <td colSpan={7} className="text-center p-3 text-danger fw-bold">
                  NO DATA FOUND
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination className="pagenation-style">
          <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </div>
      <DeleteJob
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        data={editData}
        onClose={() => { getJobs(); setShowDeleteModal(false); }}
        action={action}
      />
    </div>
  );

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            <Col xs={12} md={3}>
              <Form.Label>
                Secretariat Department
              </Form.Label>
              <Select
                name="dependant_on"
                defaultValue={departmentType}
                options={departmentOptions}
                getOptionLabel={(options) => options.name}
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
                        getDepartments(inputValue);
                      } else {
                        getDepartments('');
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
                    setDepartmentType(newValue);
                    getHodDepartments(newValue && newValue.id);
                  } else if (action === 'clear') {
                    getDepartments('');
                    setHodDepartmentType('');
                    setDepartmentType('');
                    getHodDepartments('', '');
                  }
                }}
              />
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>HOD Department</Form.Label>
              <Select
                name="dependant_on"
                isClearable
                defaultValue={hodDepartmentType}
                options={hodDepartmentOptions}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.id}
                isSearchable
                closeMenuOnSelect
                onChange={(newValue, actionMeta) => {
                  const { action } = actionMeta;
                  if (action === 'select-option' || action === 'remove-value') {
                    setHodDepartmentType(newValue);
                  } else if (action === 'clear') {
                    setDefaultdepartmentId('');
                    setHodDepartmentType('');
                  }
                }}
              />
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                id="jobType"
                name="jobType"
                value={jobType}
                onChange={(e) => {
                  setJobType(e.target.value);
                }}
              >
                <option value="">Select a type</option>
                {jobTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>Published</Form.Label>
              <Form.Select
                id="published"
                name="published"
                value={published}
                onChange={(e) => {
                  setPublished(e.target.value);
                }}
              >
                <option value="">Select an option</option>
                <option value>
                  Yes
                </option>
                <option value={false}>
                  No
                </option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

      </Form>
    </Card>
  );

  return (
    <Card className="pt-2">
      <Card.Header className="bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={6}>
                <h2 className="your-cart">
                  Jobs (
                  {count}
                  )
                </h2>
              </Col>

              <Col xs={12} md={6}>
                <div className="applicants-style1">
                  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchText}
                      onChange={(e) => {
                        router.push({
                          pathname: '/dashboard/careers/jobs/',
                          query: {
                            search: e.target.value,
                          },
                        });
                        setSearchText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" className="mx-3" onClick={() => setShowFilter(!showFilters)}>
                    <FontAwesomeIcon icon={faFilter} />
                  </Button>
                  <Button variant="primary" className="text-nowrap me-3" onClick={() => router.push('/dashboard/careers/jobs/create-job')} style={{ display: 'flex' }}>
                    <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                    {' '}
                    Add Job
                  </Button>
                  {roles && roles.includes('Admin') && (
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
        {renderTable()}
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/jobs/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
          title="Jobs"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />

      </Card.Body>
    </Card>
  );
}
