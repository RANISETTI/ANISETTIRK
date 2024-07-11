import {
  faFilter, faPen, faPlus, faSearch, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getNetworkingDevicesServices from '../../../../services/dashboard/assets/networkingDevices';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import DeleteModal from './DeleteModal';

export default function NetworkingDevices() {
  const router = useRouter();
  const {
    query: {
      search, department, type, page,
    },

  } = router;
  const { accessToken, userDetails: { type: userType } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const [showFilters, setShowFilter] = useState(false);
  const [networkingDeviceData, setNetworkingDeviceData] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState();
  const [searchText, setSearchText] = useState(search);
  const [departmentType, setDepartmentType] = useState();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [deviceType, setDeviceType] = useState(type);
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

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
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDepartments('');
    getHodDepartments('', '');
    getNetworkingDevices();
    genericGetService('/networking-devices/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDeviceTypeOptions(data);
        } else {
          setDeviceTypeOptions([]);
        }
      });
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        setHodDepartmentType(data);
      });
    }
  }, []);

  const getNetworkingDevices = () => {
    setIsLoading(true);
    getNetworkingDevicesServices(accessToken, `/admin/networking-assets/?page=${page || 1}&department=${hodDepartmentType && hodDepartmentType.id || ''}&type=${deviceType || ''}`)
      .then(({
        data, errors,
      }) => {
        if (errors) {
          setNetworkingDeviceData('');
          setPreviousPage('');
          setNextPage('');
        } else {

          setNetworkingDeviceData(data.results);
          setPreviousPage(data.previous);
          setNextPage(data.next);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // if (deviceType || hodDepartmentType) {
    //   setShowFilter(true);
    //   router.push({
    //     pathname: '/dashboard/assets/networking-devices',
    //     query: {
    //       department: hodDepartmentType && hodDepartmentType.id,
    //       type: deviceType,
    //       page,
    //     },
    //   });
    // }
    const newQuery = {
      page,
      department: hodDepartmentType && hodDepartmentType.id || '',
      type: deviceType || '',
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
      pathname: '/dashboard/assets/networking-devices',
      query: newQuery,
    });

    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        router.push({
          pathname: '/dashboard/assets/networking-devices',
          query: { search: searchText },
        });
        getNetworkingDevicesServices(accessToken, `/admin/networking-assets/?search=${searchText}`)
          .then(({
            data: {
              results, previous, next, count,
            }, error,
          }) => {
            setNetworkingDeviceData(results);
            setPreviousPage(previous);
            setNextPage(next);
          }).finally(() => { setIsLoading(false); });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    getNetworkingDevicesServices(accessToken, `/admin/networking-assets/?page=${page || 1}&department=${hodDepartmentType && hodDepartmentType.id || ''}&type=${deviceType || ''}`)
      .then(({
        data, errors,
      }) => {
        if (errors) {
          setNetworkingDeviceData('');
          setPreviousPage('');
          setNextPage('');
        } else {

          setNetworkingDeviceData(data.results);
          setPreviousPage(data.previous);
          setNextPage(data.next);
        }
      })
      .finally(() => { setIsLoading(false); });
  }, [searchText, hodDepartmentType, deviceType]);



  const handlePath = (path) => {
    const pageNum = (path.includes('page') && (path.split('?').map((i) => i.split('='))[1][2]).split('&')[0]) || 1;

    router.push({
      pathname: '/dashboard/assets/networking-devices/',
      query: {
        page: pageNum,
        department:hodDepartmentType && hodDepartmentType.id || '',
        type:deviceType  || '',
      },
    });
    setIsLoading(true);
    getNetworkingDevicesServices(accessToken, `/admin/networking-assets/?page=${pageNum || 1}&department=${hodDepartmentType && hodDepartmentType.id || ''}&type=${deviceType || ''}`)
      .then(({
        data, errors,
      }) => {
        if (errors) {
          setNetworkingDeviceData('');
          setPreviousPage('');
          setNextPage('');
        } else {

          setNetworkingDeviceData(data.results);
          setPreviousPage(data.previous);
          setNextPage(data.next);
        }
      })
      .finally(() => { setIsLoading(false); });
  };

  const renderTable = () => (
    <div>
      <div className="table-responsive mb-4">
        <Table bordered>
          <thead>
            <tr>
              {/* <th>Type</th> */}
              <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Asset Id
            </th>
              <th>Department</th>
              <th>Device Type</th>
              <th>Make</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Other Details</th>
              <th>SPOC</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {networkingDeviceData.length ? renderTableData(networkingDeviceData) : (
              <tr>
                <td colSpan={9} className="text-center p-3 text-danger fw-bold">
                  NO DATA FOUND
                </td>
              </tr>
            )}
          </tbody>
        </Table>

      </div>
      <Pagination className="pagenation-style">
        <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
          &laquo; Previous
        </Pagination.Prev>
        <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
          Next &raquo;
        </Pagination.Next>
      </Pagination>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        data={deleteData}
        onClose={() => { getNetworkingDevices(); setShowDeleteModal(false); }}
      />
    </div>
  );

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      { props.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{`${'IT'}-${item.department.code} - ${item.id}`}</td>
            <td>{item.department && item.department.name}</td>
            <td>{item.type && item.type.name}</td>
            <td>{item.make}</td>
            <td>{item.model}</td>
            <td>{item.quantity}</td>
            <td>{item.other_details}</td>
            <td>{item.spoc_name}</td>
            <td>{item.spoc_email}</td>
            <td>{item.spoc_mobile}</td>
            <td />
            <td className="table-action d-flex">
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/assets/networking-devices/edit-device/${item.id}`); }} className="text-primary" />
              </button>
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faTrash} onClick={() => { setDeleteData(item); setShowDeleteModal(true); }} className="text-danger" />
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
          <Row>
            {!(userType === 'DEPARTMENT')
              && (
              <>
                <Col xs={12} md={4}>
                  <Form.Label>
                    Secretariat
                    Department
                  </Form.Label>
                  <Select
                    name="dependant_on"
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
                        setDepartmentType('');
                        setHodDepartmentType('');
                        getDepartments('');
                      }
                    }}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Form.Label>Head of Department</Form.Label>
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
                        setHodDepartmentType('');
                        setDefaultdepartmentId('');
                      }
                    }}
                  />
                </Col>
              </>
              )}
            <Col xs={12} md={4}>
              <Form.Label>Data center</Form.Label>
              <Form.Select
                id="deviceType"
                name="deviceType"
                value={deviceType}
                onChange={(e) => {
                  setDeviceType(e.target.value);
                }}
              >
                <option value="">Select a Data center</option>
                {deviceTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
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
          <div className="">
            <Row>
              <Col xs={12} md={6}>
                <h2 className="your-cart">Networking Devices</h2>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-end pb-3 ">

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
                        pathname: '/dashboard/assets/networking-devices',
                        query: { search: e.target.value },
                      });
                      setSearchText(e.target.value);
                    }}
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>

                <Button variant="primary" className="mx-3" onClick={() => setShowFilter(!showFilters)}>
                  <FontAwesomeIcon icon={faFilter} />
                </Button>
                <Button variant="primary" className="float-end text-nowrap" onClick={() => router.push('/dashboard/assets/networking-devices/add-device')}>
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add Device
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {showFilters && renderFilters()}
        {renderTable()}
      </Card.Body>
    </Card>
  );
}
