import { faEye, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Pagination, Row, Spinner, Table,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../libs/utils/getHeaders';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../services/dashboard/departments';
import getOrdersService, { getOrderStatusService } from '../../../services/dashboard/orders';
import getVendorOrdersService from '../../../services/dashboard/vendors';

export default function OrdersTable() {
  const {
    accessToken,
    userDetails,
    userDetails: {
      type,
    },
  } = useSelector((state) => state.user);
  const router = useRouter();
  const {
    query: {
      page, department, start_date,
      end_date,
      order_status,
    },
  } = router;
  const headers = getHeaders(accessToken);

  const [ordersData, setOrdersData] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [departmentType, setDepartmentType] = useState();
  const [hodDepartmentType, setHodDepartmentType] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [status, setStatus] = useState();
  const [startDate, setStartdate] = useState(start_date);
  const [endDate, setEndDate] = useState(end_date);

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

  const getStatus = () => {
    getOrderStatusService(headers)
      .then(({
        data, errors,
      }) => {
        if (errors) {
          console.log('errors', errors);
        } else {
          setStatusOptions(data);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        setHodDepartmentType(data);
      });
    }
    getOrderStatusService(headers)
      .then(({
        data, errors,
      }) => {
        if (errors) {
          console.log('errors', errors);
        } else {
          setStatus(data.filter((item) => item.value === order_status)[0]);
        }
      }).finally(() => setIsLoading(false));
  }, []);
  const getHodDepartments = (parentId, searchValue) => {
    getHODDepartments(searchValue, parentId, headers)
      .then(({
        data: {
          results, previous, next, count,
        }, errors,
      }) => {
        if (errors) {
          console.log('errors', errors);
        } else {
          setHodDepartmentOptions(results);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    let getService;
    if (type === 'VENDOR') {
      const { organization: { id: organizationId } } = userDetails;
      getService = getVendorOrdersService(accessToken, organizationId, page);
    } else {
      getService = getOrdersService(accessToken, page);
    }
    getService.then(({
      data: {
        results, count, previous, next,
      }, error,
    }) => {
      setOrdersData(results);
      setPreviousPage(previous);
      setNextPage(next);
    })
      .finally(() => setIsLoading(false));
    getDepartments('');
    getHodDepartments('');
    getStatus('');
  }, []);

  useEffect(() => {
    const newQuery = {
      secretariat_Department: departmentType && departmentType.id || '',
      department: hodDepartmentType && hodDepartmentType.id || '',
      order_status: status && status.value,
      start_date: startDate || '',
      end_date: endDate || '',
    };
    Object.keys(newQuery).forEach((mapItem) => {
      if (!newQuery[mapItem]) {
        delete newQuery[mapItem];
      }
    });

    if (Object.keys(newQuery).length) {
      setShowFilter(true);
    }
    router.push({
      pathname: '/dashboard/procurement/orders',
      query: newQuery,
    });
    getOrdersService(accessToken, page, hodDepartmentType && hodDepartmentType.id, status && status.value, startDate, endDate).then(({
      data: {
        results, count, previous, next,
      }, error,
    }) => {
      setOrdersData(results);
      setPreviousPage(previous);
      setNextPage(next);
    });
  }, [departmentType, hodDepartmentType, startDate, endDate, status]);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/procurement/orders',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1 },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1;
    getOrdersService(accessToken, pageNum)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setOrdersData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      {
        props.map((item) => {
          tableRows.push(
            <tr>
              <td>{item.uid}</td>
              <td>{item.department && item.department.name}</td>
              <td>{moment(item.created_ts).format('MMM Do YYYY hh:mm A')}</td>

              <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.total_price)}</td>
              <td>{item.purchase_order_no}</td>
              <td>{item.status}</td>
              <td className="table-action text-center">
                <button className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faEye} onClick={() => { router.push(`/dashboard/procurement/orders/order-detail/${item.uid}`); }} />
                </button>
              </td>
            </tr>,
          );
        });
      }
    }
    return tableRows;
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
          {!(type === 'DEPARTMENT')
            && (
            <Row>
              <Col xs={12} md={6}>
                <Form.Label>
                  Secretariat Department
                </Form.Label>
                <Select
                  name="departmentType"
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
              <Col xs={12} md={6}>
                <Form.Label>HOD Department</Form.Label>
                <Select
                  name="dependant_on"
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
                    } else if (action === 'clear') {
                      setDefaultdepartmentId('');
                      setHodDepartmentType('');
                    }
                  }}
                />
              </Col>
            </Row>
            )}
          <Row>
            <Col xs={12} md={4}>
              <Form.Label>Status</Form.Label>
              <Select
                name="dependant_on"
                isClearable
                value={status}
                options={statusOptions}
                getOptionLabel={(options) => options.text}
                getOptionValue={(options) => options.key}
                isSearchable
                closeMenuOnSelect
                onChange={(newValue, actionMeta) => {
                  const { action } = actionMeta;
                  if (action === 'select-option' || action === 'remove-value') {
                    setStatus(newValue);
                  } else if (action === 'clear') {
                    setStatus('');
                    getStatus('');
                  }
                }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>
                Start Date
              </Form.Label>
              <DatePicker
                // dateFormat="yyyy-MM-dd"
                placeholderText="Start Date"
                selected={startDate && new Date(startDate)}
                value={startDate}
                className="date-picker-input"
                onChange={(e) => {
                  console.log(e);
                  setStartdate(moment(e).format('YYYY-MM-DD'));
                }}
                // isClearable
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>
                End Date
              </Form.Label>
              <DatePicker
                // dateFormat="yyyy-MM-dd"
                placeholderText="End Date"
                selected={endDate &&  new Date(endDate)}
                value={endDate}
                className="date-picker-input"
                onChange={(e) => {
                  setEndDate(moment(e).format('YYYY-MM-DD'));
                }}
                // isClearable
              />
            </Col>
          </Row>
        </Form.Group>

      </Form>
    </Card>
  );

  return (
    <Card className="pt-2">
      <Card.Header className="bg-transparent">
        <div className="d-flex justify-content-between">
          <h2 className="your-cart">Total Orders</h2>
          <Button variant="primary" className="float-end me-2" onClick={() => setShowFilter(!showFilter)}>
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </div>

      </Card.Header>
      <Card.Body>
        {showFilter && renderFilters()}
        <Table bordered responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th> Ordered On </th>
              <th>Price</th>
              <th>PO No.</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.length ? renderTableData(ordersData) : (
              <tr>
                <td colSpan={6} className="text-center p-3 text-danger fw-bold">
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
      </Card.Body>
    </Card>
  );
}
