import {
  faCircleXmark, faClipboardCheck, faEye, faFileCsv, faFilter, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, FormControl, InputGroup, Pagination, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getServices from '../../../../services/dashboard/conference';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../../services/dashboard/departments';
import getDSEServices, { deleteDSEervice } from '../../../../services/dashboard/digitalcertificates/dse';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Dse() {
  const router = useRouter();

  const {
    query: {
      page, department, hodDepartment, autonomousDepartment, search,
    },
    query,
  } = router;

  const {
    accessToken,
    userDetails: { type: userType, roles },
  } = useSelector((state) => state.user);

  const [showFilters, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState(search);
  const [dscData, setDscData] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentType, setDepartmentType] = useState();
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState();
  const [autonomousOrganizationsData, setAutonomousOrganizationsData] = useState([]);
  const [autonomousDepartmentType, setAutonomousDepartmentType] = useState();
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [defaultHodDepartmentId, setHodDefaultdepartmentId] = useState(hodDepartment);
  const [defaultautonomousDepartmentId,
    setDefaultautonomousdepartmentId] = useState(autonomousDepartment);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const [editData, setEditData] = useState({});
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [count, setCount] = useState();
  const headers = getHeaders(accessToken);

  const getDepartments = (searchText) => {
    getSecretariatDepartments(searchText, headers)
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

  const getHodDepartments = (parentId, searchText) => {
    getHODDepartments(searchText, parentId, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setHodDepartmentOptions(data.results);
        } else {
          setHodDepartmentOptions([]);
        }
      });
  };

  const getAutonomousOrganizations = (departmentId, search) => {
    getServices(accessToken, `/departments/?search=${search || ''}&type=AO&parent=${departmentId || ''}`).then(({ data, errors }) => {
      if (data) {
        const { results } = data;
        setAutonomousOrganizationsData(results);
      }
    });
  };

  useEffect(() => {
    getDepartments('');
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data);
      });
    }
    if (defaultHodDepartmentId) {
      getHODDepartmentsById(defaultHodDepartmentId, headers).then(({ data }) => {
        setHodDepartmentType(data);
      });
    }
    if (defaultautonomousDepartmentId) {
      getHODDepartmentsById(defaultautonomousDepartmentId, headers).then(({ data }) => {
        setAutonomousDepartmentType(data);
      });
    }
  }, []);

  // const getDepartmentCertificates = () => {
  //   setIsLoading(true);
  //   getDSEServices(accessToken, '/admin/dsc/').then(({ data, errors }) => {
  //     if (data) {
  //       const {
  //         results, next, previous, count,
  //       } = data;
  //       setDscData(results);
  //       setNext(next);
  //       setPrevious(previous);
  //       setCount(count);
  //     } else {
  //       setDscData([]);
  //       console.log(errors);
  //     }
  //   }).finally(() => setIsLoading(false));
  // };

  useEffect(() => {
    const newQuery = {
      ...query,
      page: isFilterApplied ? 1 : page,
      department: departmentType && departmentType.id,
      hodDepartment: (hodDepartmentType && hodDepartmentType.id) || '',
      autonomousDepartment: (autonomousDepartmentType && autonomousDepartmentType.id) || '',
      search: searchText || '',
    };
    Object.keys(newQuery).forEach((mapItem) => {
      if (!newQuery[mapItem]) {
        delete newQuery[mapItem];
      }
    });
    if (hodDepartmentType || departmentType || autonomousDepartmentType) {
      setShowFilter(true);
    }

    router.push({
      pathname: '/dashboard/digital-certificate/dse',
      query: newQuery,
    });

    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      getDSEServices(accessToken, `admin/dsc/?page=${page || 1}&department=${(autonomousDepartmentType && autonomousDepartmentType.id) || (hodDepartmentType && hodDepartmentType.id) || (departmentType && departmentType.id) || ''}&search=${searchText || ''}`).then(({ data, errors }) => {
        if (data) {
          const {
            results, next, previous, count,
          } = data;
          setDscData(results);
          setNext(next);
          setPrevious(previous);
          setCount(count);
        } else {
          setDscData([]);
          console.log(errors);
        }
      }).finally(() => setIsLoading(false));
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [hodDepartmentType, departmentType, autonomousDepartmentType, searchText, page]);

  const tableData = [
    {
      title: 'S. No.',
      id: 's_no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1) + (20 * ((page || 1) - 1))}</span>
        </div>
      ),
    },
    {
      title: 'Application No',
      id: 'application_no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>
            DSC-
            {rowData.department.code}
            -
            {rowData.number}
          </span>
        </div>
      ),
    },
    {
      title: 'Applicant Name',
      id: 'applicant_name',
      width: '',
      render: (rowData) => (
        <div className="d-flex items-center">
          <span>{rowData.applicant_name}</span>
        </div>
      ),
    },
    // {
    //   title: 'Applicant PAN',
    //   id: 'applicant_pan',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.applicant_pan}</span>
    //     </div>
    //   ),
    // },
    {
      title: 'Applicant Conatct No',
      id: 'applicant_mobile',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.applicant_mobile_number}</span>
        </div>
      ),
    },
    {
      title: 'Authorized Name',
      id: 'hod_name',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.hod_name}</span>
        </div>
      ),
    },
    {
      title: 'Department',
      id: 'department',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.department.name}</span>
        </div>
      ),
    },
    {
      title: 'Designation',
      id: 'designation',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.hod_designation}</span>
        </div>
      ),
    },
    // {
    //   title: 'Organization PAN',
    //   id: 'hod_pan',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //       <span>{rowData.hod_pan}</span>
    //     </div>
    //   ),
    // },
    {
      title: 'Mobile No',
      id: 'mobile_no',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.hod_mobile_number}</span>
        </div>
      ),
    },
    {
      title: 'Approved',
      id: 'approved',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.is_approved
              ? <FontAwesomeIcon icon={faClipboardCheck} className="text-success" />
              : rowData.is_rejected
                ? <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />
                : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      id: 'status_display_name',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.status_display_name === 'Closed' && !rowData.is_rejected ? 'Completed'
              : rowData.is_rejected ? 'Rejected' : rowData.status_display_name}
          </span>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex flex-end">
          <button type="button" onClick={() => { router.push(`/dashboard/digital-certificate/dse/view-dse/${rowData.id}`); }} className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faEye} className="text-primary" />
          </button>
        </div>
      ),
    },
  ];

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/digital-certificate/dse',
      query: {
        ...query,
        page: (path.includes('page') && (path.split('page=').map((i) => i.split('&'))[1][0]).split('='))[0] || 1,
      },
    });
    setIsFilterApplied(false);
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

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            <Col xs={12} md={4}>
              <Form.Label>
                Secretariat
                Department
              </Form.Label>
              <Select
                name="department"
                value={departmentType}
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
                        getAutonomousOrganizations(inputValue.id, '');
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
                    getAutonomousOrganizations(newValue.id, '');
                    setAutonomousDepartmentType('');
                    setHodDepartmentType('');
                    setIsFilterApplied(true);
                  } else if (action === 'clear') {
                    setDepartmentType('');
                    setHodDepartmentType('');
                    setAutonomousDepartmentType('');
                    setHodDepartmentOptions([]);
                    setAutonomousOrganizationsData([]);
                    getDepartments('');
                    setIsFilterApplied(false);
                  }
                }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Head of Department</Form.Label>
              <Select
                name="hoddepartment"
                isClearable
                value={hodDepartmentType}
                options={hodDepartmentOptions}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.id}
                isSearchable
                closeMenuOnSelect
                onChange={(newValue, actionMeta) => {
                  const { action } = actionMeta;
                  if (action === 'select-option' || action === 'remove-value') {
                    setHodDepartmentType(newValue);
                    setAutonomousDepartmentType('');
                    getAutonomousOrganizations(newValue.id, '');
                    setIsFilterApplied(true);
                  } else if (action === 'clear') {
                    setHodDepartmentType('');
                    getAutonomousOrganizations();
                    setDefaultdepartmentId('');
                    setHodDefaultdepartmentId('');
                    setIsFilterApplied(false);
                  }
                }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Autonomous Department</Form.Label>
              <Select
                name="autonomousdepartment"
                isClearable
                value={autonomousDepartmentType}
                options={autonomousOrganizationsData}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.id}
                isSearchable
                closeMenuOnSelect
                onChange={(newValue, actionMeta) => {
                  const { action } = actionMeta;
                  if (action === 'select-option' || action === 'remove-value') {
                    setAutonomousDepartmentType(newValue);
                    setIsFilterApplied(true);
                  } else if (action === 'clear') {
                    setAutonomousDepartmentType('');
                    setDefaultdepartmentId('');
                    setDefaultautonomousdepartmentId('');
                    setIsFilterApplied(false);
                  }
                }}
              />
            </Col>
          </Row>
        </Form.Group>

      </Form>
    </Card>
  );

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div>
            <Row>
              <Col xs={12} md={8}>
                <h2 className="your-cart">
                  DSC (
                  {count}
                  )
                </h2>
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
                          pathname: '/dashboard/digital-certificate/dse',
                          query: { search: e.target.value },
                        });
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" className="me-3" onClick={() => setShowFilter(!showFilters)}>
                    <FontAwesomeIcon icon={faFilter} />
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
        {/* <DeleteModal
          show={showDeleteModal}
          onHide={() => { setShowDeleteModal(false); }}
          onClose={() => {
            setShowDeleteModal(false);
            getDSEServices();
          }}
          id={editData.id}
          type="DSC"
          deleteService={deleteDSEervice}
        /> */}
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/dsc/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
          title="DSC"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
        <GenericTable
          tableData={tableData}
          dataSet={dscData}
          loading={isLoading}
        />
        <Pagination className="pagenation-style mt-5">
          <Pagination.Prev onClick={() => handlePath(previous)} disabled={!previous}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next onClick={() => handlePath(next)} disabled={!next}>
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </Card.Body>
    </Card>

  );
}
