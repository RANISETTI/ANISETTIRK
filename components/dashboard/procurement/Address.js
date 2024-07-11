import {
  faCircleCheck, faFilter, faPen, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Pagination, Row, Spinner, Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../libs/utils/getHeaders';
import getdepartmentaddressService, { getAdminDepartmentServices } from '../../../services/dashboard/addresses';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../services/dashboard/departments';
import DeleteModal from './DeleteModal';

export default function Address() {
  const [data, setData] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const [action, setAction] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // filters
  const [showFilters, setShowFilter] = useState(false);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState('');
  const [departmentType, setDepartmentType] = useState();
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);

  const { accessToken, userDetails: { department: { slug }, type } } = useSelector(
    (state) => state.user,
  );

  const router = useRouter();
  const { query: { department, page } } = router;

  const headers = getHeaders(accessToken);

  const getAddresses = () => {
    setIsLoading(true);
    if (type === 'APTS') {
      getAdminDepartmentServices(accessToken, page, '')
        .then(({
          data: addressData, error,
        }) => {
          const { results, previous, next } = addressData;
          setData(results);
          setPreviousPage(previous);
          setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    } else {
      getdepartmentaddressService(accessToken, slug, page, '')
        .then(({
          data: addressData, error,
        }) => {
          setData(addressData);
          // setPreviousPage(previous);
          // setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    }
  };

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

  useEffect(() => {
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        setHodDepartmentType(data);
      });
    }
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
    getAddresses();
    getDepartments();
    getHodDepartments();
  }, []);

  const filterRouter = () => {
    const newQuery = {
      department: (hodDepartmentType && hodDepartmentType.id) || '',
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
      pathname: '/dashboard/procurement/manage-address',
      query: newQuery,
    });
    setIsLoading(true);
    if (type === 'APTS') {
      getAdminDepartmentServices(accessToken, page, hodDepartmentType)
        .then(({
          data: addressData, error,
        }) => {
          const { results, previous, next } = addressData;
          setData(results);
          setPreviousPage(previous);
          setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    } else {
      getdepartmentaddressService(accessToken, slug, page, hodDepartmentType)
        .then(({
          data: addressData, error,
        }) => {
          setData(addressData);
          // setPreviousPage(previous);
          // setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    }
  };

  useEffect(() => {
    filterRouter();
  }, [hodDepartmentType])

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
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
        </Form.Group>
      </Form>
    </Card>
  );

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/procurement/orders',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1 },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1;
    if (type === 'APTS') {
      getAdminDepartmentServices(accessToken, pageNum)
        .then(({
          data: addressData, error,
        }) => {
          const { results, previous, next } = addressData;
          setData(results);
          setPreviousPage(previous);
          setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    } else {
      getdepartmentaddressService(accessToken, slug, pageNum)
        .then(({
          data: addressData, error,
        }) => {
          setData(addressData);
          // setPreviousPage(previous);
          // setNextPage(next);
        })
        .finally(() => { setIsLoading(false); });
    }
  };

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      {
        props.map((item) => {
          tableRows.push(
            <tr>
                      <td>{item.department.name}</td>
              <td>{`${item.address_line_1}` + `, ${item.address_line_2}`}</td>
              <td>{item.city}</td>
              <td>{item.pincode}</td>
              <td>{item.gst_number}</td>
              <td>
                <div className="text-center">
                  {item.active ? <FontAwesomeIcon icon={faCircleCheck} className="color-green" /> : <FontAwesomeIcon icon={faCircleXmark} />}
                </div>
              </td>
              <td className="table-action">
                <div className="address-style">
                  <button className="apts-admin-tenders-button">
                    <FontAwesomeIcon icon={faPen} className="text-primary" onClick={() => { router.push(`/dashboard/procurement/edit-address/${item.id}`); }} />
                  </button>
                  <button className="apts-admin-tenders-button">
                    <FontAwesomeIcon icon={faTrash} className="text-danger" onClick={() => { setEditData(item); setShowDeleteModal(true); setAction('DELETE'); }} />
                  </button>
                </div>
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

  return (
    <Card className="pt-2 pb-4">
      <Card.Header className="bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            Manage Addresses
          </h3>
          <div>
            <Button variant="primary" className="float-end" onClick={() => router.push('/dashboard/procurement/add-address/')}>
              <FontAwesomeIcon icon={faPlus} />
              {' '}
              Add Address
            </Button>
            <Button variant="primary" className="float-end me-2" onClick={() => setShowFilter(!showFilters)}>
              <FontAwesomeIcon icon={faFilter} />
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {showFilters && renderFilters()}
        <div>
          <Table bordered responsive>
            <thead>
              <tr>
                <th className="">Department</th>
                <th className="">Address</th>
                <th className="">City</th>
                <th className="">Pincode</th>
                <th className="">GST Number</th>
                <th className="">Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {renderTableData(data)}
            </tbody>
          </Table>
          <DeleteModal
            show={showDeleteModal}
            onHide={() => { setShowDeleteModal(false); }}
            data={editData}
            onClose={() => { getAddresses(); setShowDeleteModal(false); }}
            action={action}
          />
          <Pagination style={{ display: 'flex', justifyContent: 'end' }}>
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </div>
      </Card.Body>
    </Card>
  );
}
