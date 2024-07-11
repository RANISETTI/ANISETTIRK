import {
  faFilter, faPlus, faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Row, Spinner, Tab, Tabs,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { SoftwareList } from '../../../../services/dashboard/assets/software';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import ApplicationTable from './ApplicationTable';
import MobileApplicationTable from './MobileApplicationTable';
import SecurityAuditModal from './SecurityAuditModal';

export default function Software() {
  const router = useRouter();
  const {
    query: {
      search, department, dataCenter, page, os,
    },
  } = router;
  const [key, setKey] = useState('application');
  const [applicationData, setApplicationData] = useState([]);
  const [mobileApplicationData, setMobileApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState(search);
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [showFilters, setShowFilter] = useState(false);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [dataCenterOptions, setDataCenterOptions] = useState([]);
  const [OSOptions, setOSOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState('');
  const [departmentType, setDepartmentType] = useState();
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [dataCenterType, setDataCenterType] = useState(dataCenter);
  const [OSType, setOSType] = useState(os);
  const [securityModal, setSecurityModal] = useState();
  const [securityData, setSecurityData] = useState();
  const { accessToken, userDetails: { type } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

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
    getDepartments('');
    getHodDepartments('');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    genericGetService('/admin/data-centers/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDataCenterOptions(data.results);
        } else {
          setDataCenterOptions([]);
        }
      });

    genericGetService('/admin/operating-systems/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setOSOptions(data);
        } else {
          setOSOptions([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (key === 'application') {
      SoftwareList(accessToken, '/admin/software-assets/?type=a')
        .then(({ data, errors }) => {
          if (errors) {
            console.log('errors: ', errors);
          } if (data) {
            const {
              results, count, previous, next,
            } = data;
            setApplicationData(results);
            setCount(count);
            setPreviousPage(previous);
            setNextPage(next);
          }
        });
    } else {
      SoftwareList(accessToken, '/admin/software-assets/?type=m')
        .then(({ data, errors }) => {
          if (errors) {
            console.log('errors: ', errors);
          } if (data) {
            const {
              results, count, previous, next,
            } = data;
            setMobileApplicationData(results);
            setCount(count);
            setPreviousPage(previous);
            setNextPage(next);
          }
        });
    }
  }, [key]);

  useEffect(() => {
    const newQuery = {
      dataCenter: dataCenterType || '',
      page,
      os: OSType || '',
      department: hodDepartmentType && hodDepartmentType.id || '',
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
      pathname: '/dashboard/assets/software',
      query: newQuery,
    });

    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        if (key === 'application') {
          setIsLoading(true);
          router.push({
            pathname: '/dashboard/assets/software',
            query: { search: searchText },
          });
          SoftwareList(accessToken, `/admin/software-assets/?type=a&search=${searchText}`)
            .then(({
              data: {
                results, previous, next, count,
              }, error,
            }) => {
              setApplicationData(results);
              setCount(count);
              setPreviousPage(previous);
              setNextPage(next);
            }).finally(() => { setIsLoading(false); });
        } else {
          setIsLoading(true);
          router.push({
            pathname: '/dashboard/assets/software',
            query: { search: searchText },
          });
          SoftwareList(accessToken, `/admin/software-assets/?type=m&search=${searchText}`)
            .then(({
              data: {
                results, previous, next, count,
              }, error,
            }) => {
              setMobileApplicationData(results);
              setCount(count);
              setPreviousPage(previous);
              setNextPage(next);
            }).finally(() => { setIsLoading(false); });
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }

    setIsLoading(true);
    if (key === 'application') {
      SoftwareList(accessToken, `/admin/software-assets/?type=a&page=${page || 1}&data_center=${dataCenterType || ''}&os=${OSType || ''}&department=${hodDepartmentType && hodDepartmentType.id || ''}`)
        .then(({
          data,
          data: {
            results, previous, next, count,
          }, errors,
        }) => {
          setApplicationData(results);
          setCount(count);
          setPreviousPage(previous);
          setNextPage(next);
        }).finally(() => { setIsLoading(false); });
    } else {
      SoftwareList(accessToken, `/admin/software-assets/?type=m&page=${page || 1}&data_center=${dataCenterType || ''}&os=${OSType || ''}&department=${hodDepartmentType && hodDepartmentType.id || ''}`)
        .then(({
          data,
          data: {
            results, previous, next, count,
          }, errors,
        }) => {
          setMobileApplicationData(results);
          setCount(count);
          setPreviousPage(previous);
          setNextPage(next);
        }).finally(() => { setIsLoading(false); });
    }
  }, [searchText, hodDepartmentType, dataCenterType, OSType]);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/assets/software',
      query: {
        dataCenter,
        os,
        department,
        page: (path.includes('page') && (path.split('page=')[1]).split('&')[0]) || 1,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && (path.split('page=')[1]).split('&')[0]) || 1;

    if (key === 'application') {
      SoftwareList(accessToken, `/admin/software-assets/?type=a&page=${pageNum || 1}&data_center=${dataCenterType || ''}&os=${OSType || ''}&department=${hodDepartmentType && hodDepartmentType.id || ''}`)
        .then(({
          data: {
            results, previous, next, count,
          }, errors,
        }) => {
          setApplicationData(results);
          setCount(count);
          setPreviousPage(previous);
          setNextPage(next);
        }).finally(() => { setIsLoading(false); });
    } else {
      SoftwareList(accessToken, `/admin/software-assets/?type=m&page=${page || 1}&department=${hodDepartmentType.id || ''}&data_center=${dataCenterType || ''}&os=${OSType || ''}`)
        .then(({
          data,
          data: {
            results, previous, next, count,
          }, errors,
        }) => {
          setMobileApplicationData(results);
          setCount(count);
          setPreviousPage(previous);
          setNextPage(next);
        }).finally(() => { setIsLoading(false); });
    }
  };

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            {!(type === 'DEPARTMENT') && (
              <>
                <Col xs={12} md={3}>
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
                <Col xs={12} md={3}>
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
              </>
            )}
            <Col xs={12} md={3}>
              <Form.Label>Data center</Form.Label>
              <Form.Select
                id="dataCenterType"
                name="dataCenterType"
                value={dataCenterType}
                onChange={(e) => {
                  setDataCenterType(e.target.value);
                }}
              >
                <option value="">Select a Data center</option>
                {dataCenterOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>OS</Form.Label>
              <Form.Select
                id="OSType"
                name="OSType"
                value={OSType}
                onChange={(e) => {
                  setOSType(e.target.value);
                }}
              >
                <option value="">Select a OS</option>
                {OSOptions.map((option) => (
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
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Row>
            <Col xs={12} md={4}>
              <h2 className="your-cart">Software</h2>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end pb-3 px-0">
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
                      pathname: '/dashboard/assets/software',
                      query: { search: e.target.value },
                    });
                    setSearchText(e.target.value);
                  }}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={4} className="text-end px-0">

              <Button variant="primary" className="float-end me-2 " onClick={() => router.push('/dashboard/assets/software/add-software')}>
                <FontAwesomeIcon icon={faPlus} />
                {' '}
                Add Software
              </Button>
              <Button variant="primary" className="float-end me-2 " onClick={() => router.push('/dashboard/assets/software/add-mobile')}>
                <FontAwesomeIcon icon={faPlus} />
                {' '}
                Add Mobile App
              </Button>
              <Button variant="primary" className="float-end me-2" onClick={() => setShowFilter(!showFilters)}>
                <FontAwesomeIcon icon={faFilter} />
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Header>
      <SecurityAuditModal
        show={securityModal}
        onHide={() => {
          setSecurityModal(false);
          setSecurityData('');
        }}
        onClose={() => {
          setSecurityModal(false);
          setSecurityData('');
        }}
        securityAuditData={securityData}
      />
      <Tabs
        activeKey={key}
        id="uncontrolled-tab-example"
        className="mb-3 mx-3"
        onSelect={(k) => {
          setDepartmentType('');
          setHodDepartmentType('');
          setDataCenterType();
          setOSType();
          setKey(k);
        }}
      >
        <Tab eventKey="application" title="Application">
          <Card.Body>
            {showFilters && renderFilters()}
            <ApplicationTable
              applicationData={applicationData}
              isLoading={isLoading}
              count={count}
              previousPage={previousPage}
              nextPage={nextPage}
              handlePath={handlePath}
              setSecurityModal={(item) => {
                setSecurityModal(true);
                setSecurityData(item);
              }}
            />
          </Card.Body>
        </Tab>
        <Tab eventKey="mobile" title="Mobile Application">
          <Card.Body>
            {showFilters && renderFilters()}
            <MobileApplicationTable
              mobileApplicationData={mobileApplicationData}
              isLoading={isLoading}
              count={count}
              previousPage={previousPage}
              nextPage={nextPage}
              handlePath={handlePath}
              setSecurityModal={(item) => {
                setSecurityModal(true);
                setSecurityData(item);
              }}
            />
          </Card.Body>
        </Tab>
      </Tabs>
    </Card>
  );
}
