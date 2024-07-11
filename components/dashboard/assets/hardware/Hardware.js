import { faFilter, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Row, Tab, Tabs
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { getHardwareAssetsService } from '../../../../services/dashboard/assets/hardware';
import getSecretariatDepartments, { getHODDepartments, getHODDepartmentsById } from '../../../../services/dashboard/departments';
import { genericGetService } from '../../../../services/GenericService';
import HardwareTable from './HardwareTable';
import ServerTable from './ServerTable';

export default function Hardware() {
  const router = useRouter();
  const {
    query: {
      // queruiesforDesktopFilters
      page,
      department,
      os,
      device,
      district,
      municipality,
      search_hardware,
      // queruiesforServerFilters
      department_name,
      operating_system,
      pageNo,
      make,
      type,
      host_location,
      search_server,
    },
  } = router;
  const { accessToken, userDetails: { type : userType } } = useSelector((state) => state.user);


  const headers = getHeaders(accessToken);

  const [key, setKey] = useState('hardware');
  const [hardwareData, setHardwareData] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchHardwareText, setSearchHardwareText] = useState(search_hardware);
  const [searchServerText, setSearchServerText] = useState(search_server);
  const [showFilters, setShowFilter] = useState(false);

  // DesktopFilterOptions
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [OSOptions, setOSOptions] = useState([]);

  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department || department_name);
  const [departmentType, setDepartmentType] = useState();
  const [OSType, setOSType] = useState(os);

  const [districtOption, setDistrict] = useState(district);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [municipalities, setMunicipalities] = useState(municipality);
  const [mandalOptions, setMandalOptions] = useState([]);

  const [deviceType, setDeviceType] = useState(device);
  const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

  // ServerFilteroptions
  const [departmentTypeforServer, setDepartmentTypeforServer] = useState();

  const [OSTypeforServer, setOSTypeforServer] = useState(operating_system);

  const [serverType, setServerType] = useState(type);
  const [serverTypeOptions, setServerTypeOptions] = useState([]);

  const [serverMake, setServerMake] = useState(make);
  const [serverMakeOptions, setServerMakeOptions] = useState([]);

  const [hostLocation, setHostLocation] = useState(host_location);
  const [hostLocationOptions, setHostLocationOptions] = useState([]);

  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState();

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
    getHodDepartments('');
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        if (department_name) {
          setDepartmentTypeforServer(data);
          setKey("server");
        } else {
          setHodDepartmentType(data);
          setKey("hardware");
        }
      });
    }
  }, []);

  useEffect(() => {
    const newQuery = {
      page,
      department: hodDepartmentType && hodDepartmentType.id || '',
      district: districtOption || '',
      device: deviceType || '',
      os: OSType || '',
      municipality: municipalities || '',
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
      pathname: '/dashboard/assets/hardware/',
      query: newQuery,
    });

    if (searchHardwareText) {
      setIsLoading(true);
      router.push({
        pathname: '/dashboard/assets/hardware',
        query: { search_hardware: searchHardwareText },
      });
      const delayDebounceFn = setTimeout(() => {
        getHardwareAssetsService(accessToken, `/admin/hardware-assets?search=${searchHardwareText}`)
          .then(({
            data: {
              results, count, previous, next,
            }, error,
          }) => {
            setHardwareData(results);
            setPreviousPage(previous);
            setNextPage(next);
          }).finally(() => { setIsLoading(false); });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    getHardwareAssetsService(accessToken, `/admin/hardware-assets/?page=${page || 1}&department=${hodDepartmentType && hodDepartmentType.id || ''}&os=${OSType || ''}&device=${deviceType || ''}&district=${districtOption || ''}&municipality=${municipalities || ''}`)
      .then(({ data, error }) => {
        if (data) {
          const {
            results, count, previous, next,
          } = data;
          setHardwareData(results);
          setPreviousPage(previous);
          setNextPage(next);
        }
      })
      .finally(() => setIsLoading(false));
  }, [districtOption,
    deviceType, OSType, municipalities,
    searchHardwareText, hodDepartmentType]);

  useEffect(() => {
    setIsLoading(true);
    if (district) {
      getMunicipalities(district);
    }
    genericGetService('/hardware-devices/', headers)
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

    genericGetService('/districts/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDistrictOptions(data);
        } else {
          setDistrictOptions([]);
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
      });

    genericGetService('/admin/data-centers/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setHostLocationOptions(data.results);
        } else {
          setHostLocationOptions([]);
        }
      });

    genericGetService('/server-makes/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setServerMakeOptions(data);
        } else {
          setServerMakeOptions([]);
        }
      });

    genericGetService('/server-types/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setServerTypeOptions(data);
        } else {
          setServerTypeOptions([]);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getMunicipalities = (value) => {
    genericGetService(`/municipalities/?type=MD&district=${value}`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setMunicipalityOptions(data.results);
        } else {
          setMunicipalityOptions([]);
        }
      });

    genericGetService(`/municipalities/?type=MA&district=${value}`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setMandalOptions(data.results);
        } else {
          setMandalOptions([]);
        }
      });
  };

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/assets/hardware',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][5]).split('=')[1]) || 1,
        department: hodDepartmentType.id,
        district: districtOption,
        device: deviceType,
        os: OSType,
        municipalities,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && ((path.split('?').map((i) => i.split('&'))[1][5]).split('=')[1])) || 1;
    getHardwareAssetsService(accessToken, `/admin/hardware-assets/?page=${pageNum || 1}&department=${hodDepartmentType || ''}&os=${OSType || ''}&device=${deviceType || ''}&district=${districtOption || ''}&municipality=${municipalities || ''}`)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setHardwareData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  const renderHardwareFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            {!(userType === 'DEPARTMENT')
              && (
              <>
                <Col xs={12} md={4}>
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
                    setDepartmentType('');
                    setHodDepartmentType('');
                    getDepartments('');
                    getHodDepartments('', '');
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
                    setDefaultdepartmentId('');
                    setHodDepartmentType('');
                  }
                }}
              />
            </Col></>)}
            <Col xs={12} md={4}>
              <Form.Label>Type of Device</Form.Label>
              <Form.Select
                id="deviceType"
                name="deviceType"
                value={deviceType}
                onChange={(e) => {
                  setDeviceType(e.target.value);
                }}
              >
                <option value="">Select a Device</option>
                {deviceTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
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
            <Col xs={12} md={4}>
              <Form.Label>District</Form.Label>
              <Form.Select
                id="districtOption"
                name="districtOption"
                value={districtOption}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  getMunicipalities(e.target.value);
                }}
              >
                <option value="">Select a District</option>
                {districtOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Municipalities/Mandals</Form.Label>
              <Form.Select
                id="municipalities"
                name="municipalities"
                disabled={!district}
                value={municipalities}
                onChange={(e) => {
                  setMunicipalities(e.target.value);
                }}
              >
                <option value="">Select a Municipalities/Mandals</option>
                <optgroup label="Municipalities">
                  {municipalityOptions.map((option) => (
                    <option value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Mandals">
                  {mandalOptions.map((option) => (
                    <option value={option.id}>
                      {option.name}
                    </option>
                  ))}

                </optgroup>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

      </Form>
    </Card>
  );

  const renderServerFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            {!(userType === 'DEPARTMENT')
              && (
                <>
                  <Col xs={12} md={4}>
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
                          setDepartmentTypeforServer('');
                          setDepartmentType(newValue);
                          getHodDepartments(newValue && newValue.id);
                        } else if (action === 'clear') {
                          setDepartmentTypeforServer('');
                          setHodDepartmentType('');
                          getDepartments('');
                          getHodDepartments('', '');
                        }
                      }}
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Label>Head of Department</Form.Label>
                    <Select
                      name="dependant_on"
                      isClearable
                      value={departmentTypeforServer}
                      options={hodDepartmentOptions}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect
                      onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                        if (action === 'select-option' || action === 'remove-value') {
                          setDepartmentTypeforServer(newValue);
                        } else if (action === 'clear') {
                          setDefaultdepartmentId('');
                          setDepartmentTypeforServer('');
                        }
                      }}
                    />
                  </Col></>)}
            <Col xs={12} md={4}>
              <Form.Label>OS</Form.Label>
              <Form.Select
                id="OSTypeforServer"
                name="OSTypeforServer"
                value={OSTypeforServer}
                onChange={(e) => {
                  setOSTypeforServer(e.target.value);
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

            <Col xs={12} md={4}>
              <Form.Label>Server Type</Form.Label>
              <Form.Select
                id="serverType"
                name="serverType"
                value={serverType}
                onChange={(e) => {
                  setServerMake(e.target.value);
                }}
              >
                <option value="">Select Server Type </option>
                {serverTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Host Location</Form.Label>
              <Form.Select
                id="hostLocation"
                name="hostLocation"
                value={hostLocation}
                onChange={(e) => {
                  setHostLocation(e.target.value);
                }}
              >
                <option value="">Select</option>
                {hostLocationOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Make</Form.Label>
              <Form.Select
                id="serverMake"
                name="serverMake"
                value={serverMake}
                onChange={(e) => {
                  setServerMake(e.target.value);
                }}
              >
                <option value="">Select</option>
                {serverMakeOptions.map((option) => (
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
              <Col xs={12} md={4}>
                <h2 className="your-cart">Hardware</h2>
              </Col>
              <Col xs={12} md={3} className="d-flex justify-content-end pb-3 px-0">
                {key === 'server' ? (
                  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchServerText}
                      onChange={(e) => {
                        router.push({
                          pathname: '/dashboard/assets/hardware',
                          query: { search_server: e.target.value },
                        });
                        setSearchServerText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                ) : (
                  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchHardwareText}
                      onChange={(e) => {
                        router.push({
                          pathname: '/dashboard/assets/hardware',
                          query: { search: e.target.value },
                        });
                        setSearchHardwareText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                )}
              </Col>
              <Col xs={12} md={5} className="text-end px-0">

                <Button variant="primary" className="float-end me-2" onClick={() => router.push('/dashboard/assets/hardware/add-desktop')}>
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add Desktop/Other Details
                </Button>
                <Button variant="primary" className="float-end me-2" onClick={() => router.push('/dashboard/assets/hardware/add-server')}>
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add Server
                </Button>
                <Button variant="primary" className="float-end me-2" onClick={() => setShowFilter(!showFilters)}>
                  <FontAwesomeIcon icon={faFilter} />
                </Button>
              </Col>
            </Row>

          </div>
        </div>
      </Card.Header>
      <Tabs activeKey={key} id="uncontrolled-tab-example" className="mb-3 mx-3" onSelect={(k) => setKey(k)}>
        <Tab eventKey="hardware" title="Desktop/Other Devices">
          <Card.Body className="">
            {showFilters && renderHardwareFilters()}
            <HardwareTable
              hardwareData={hardwareData}
              isLoading={isLoading}
              previousPage={previousPage}
              nextPage={nextPage}
              handlePath={handlePath}
            />
          </Card.Body>
        </Tab>
        <Tab eventKey="server" title="Server">
          <Card.Body>
            {showFilters && renderServerFilters()}
            <ServerTable
              departmentType={departmentTypeforServer && departmentTypeforServer.id}
              OSType={OSTypeforServer}
              page={pageNo}
              serverType={serverType}
              hostLocation={hostLocation}
              serverMake={serverMake}
              searchText={searchServerText}
            />
          </Card.Body>
        </Tab>
      </Tabs>
    </Card>

  );
}
