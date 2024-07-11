import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import { addAddress, editAddress, getAdminDepartmentAddressService } from '../../../services/dashboard/addresses';
import { addDepartmentAddress } from '../../../services/dashboard/cart';
import getSecretariatDepartments, { getHODDepartments } from '../../../services/dashboard/departments';

function AddAddressStep({
  setShowAddress, getAddress, fromDashBoard, department, onHide,
}) {
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(1);
  const [address1Errors, setAddress1Errors] = useState([]);
  const [address2Errors, setAddress2Errors] = useState([]);
  const [pincodeErrors, setPincodeErrors] = useState([]);
  const [cityErrors, setCityErrors] = useState([]);
  const [gstNumber, setGstNumber] = useState();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState('');
  const [departmentType, setDepartmentType] = useState();
  const {
    accessToken,
    userDetails: { department: userDepartment },
  } = useSelector((state) => state.user);
  const router = useRouter();
  const headers = getHeaders(accessToken);
  const { query: { id: addressId }, asPath } = router;

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
    Axios.get(Api.getStates).then(({ data }) => {
      setStates(data);
    });
    if (addressId) {
      setIsLoading(true);
      Axios.get(
        Api.getOrPatchAddress(userDepartment && userDepartment.slug, addressId),
        { headers },
      ).then(({ data }) => {
        setAddress1(data.address_line_1);
        setAddress2(data.address_line_2);
        setCity(data.city);
        setPincode(data.pincode);
        setGstNumber(data.gst_number);
        setIsLoading(false);
      });
      getAdminDepartmentAddressService(accessToken, addressId).then(({ data }) => {
        setAddress1(data.address_line_1);
        setAddress2(data.address_line_2);
        setCity(data.city);
        setPincode(data.pincode);
        setGstNumber(data.gst_number);
        setDepartmentType(data.department.parent ? data.department.parent : data.department);
        setHodDepartmentType(data.department.parent && data.department);
        setIsLoading(false);
      });
    }
    getDepartments('');
    getHodDepartments('');
  }, []);

  const handleAddNew = () => {
    const departmentData = {
      address_line_1: address1,
      address_line_2: address2,
      city,
      state: selectedState,
      gst_number: gstNumber,
      pincode,
    };
    const adminData = {
      address_line_1: address1,
      address_line_2: address2,
      city,
      state: selectedState,
      gst_number: gstNumber,
      department: hodDepartmentType && hodDepartmentType.id,
      pincode,
    };
    if (addressId === undefined) {
      const slug = '';
      if (asPath.includes('add-address')) {
        addAddress(headers, adminData).then(({ data, errors }) => {
          if (data) {
            router.push('/dashboard/procurement/manage-address');
          }
          if (errors) {
            if (errors.address_line_1) {
              setAddress1Errors(errors.address_line_1);
            }
            if (errors.address_line_2) {
              setAddress2Errors(errors.address_line_2);
            }
            if (errors.city) {
              setCityErrors(errors.city);
            }
            if (errors.pincode) {
              setPincodeErrors(errors.pincode);
            }
          }
        });
      } else {
        addDepartmentAddress(headers, department, departmentData).then(({ data, errors }) => {
          if (errors) {
            if (errors.address_line_1) {
              setAddress1Errors(errors.address_line_1);
            }
            if (errors.address_line_2) {
              setAddress2Errors(errors.address_line_2);
            }
            if (errors.city) {
              setCityErrors(errors.city);
            }
            if (errors.pincode) {
              setPincodeErrors(errors.pincode);
            }
          }
          if (data) {
            setShowAddress();
            getAddress(department);
          }
        });
      }
    } else {
      editAddress(headers, addressId, adminData)
        .then(({ data }) => {
          console.log('AddAddressStep', data);
          router.push('/dashboard/procurement/manage-address');
        }).catch(({ response }) => {
          const { data, status, statusText } = response;
          if (status === 400 && data && Object.keys(data).length) {
            if (Object.prototype.hasOwnProperty.call(data, 'address_line_1')) {
              setAddress1Errors(data.address_line_1);
            }
            if (Object.prototype.hasOwnProperty.call(data, 'address_line_2')) {
              setAddress2Errors(data.address_line_2);
            }
            if (Object.prototype.hasOwnProperty.call(data, 'city')) {
              setCityErrors(data.city);
            }
            if (Object.prototype.hasOwnProperty.call(data, 'pincode')) {
              setPincodeErrors(data.pincode);
            }
          }
        });
    }
  };

  return (
    <Card className="p-2 pb-4">
      <Card.Header className="bg-transparent px-2">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            {addressId ? 'Edit' : 'Add' }
            {' '}
            Address
          </h3>
          <Button
            className="px-3"
            onClick={() => {
              fromDashBoard
                ? router.push('/dashboard/procurement/manage-address') : onHide();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="px-2">
        <Form className="" noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {fromDashBoard
 && (
 <Row className="mb-3">
   <Col xs={12} md={6}>
     <Form.Label className='form-required'>
       Secretariat Department
     </Form.Label>
     <Select
       name="departmentType"
       value={departmentType}
       options={departmentOptions.length && departmentOptions}
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
     <Form.Label className='form-required'>HOD Department</Form.Label>
     <Select
       name="dependant_on"
       isClearable
       value={hodDepartmentType}
       options={hodDepartmentOptions.length && hodDepartmentOptions}
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
         }
       }}
     />
   </Col>
 </Row>
 )}
            <Form.Label className="form-required">Address Line 1</Form.Label>
            <Form.Control
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
                setAddress1Errors('');
              }}
              placeholder="Enter address 1"
              isInvalid={!!(address1Errors.length && address1Errors)}
            />
            <Form.Control.Feedback type="invalid">
              { address1Errors.length && address1Errors }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Enter address 2" />
            <Form.Control.Feedback type="invalid">
              {address2Errors.length && address2Errors}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-required">City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setCityErrors('');
                  }}
                  placeholder="Enter city name"
                  isInvalid={!!(cityErrors.length && cityErrors)}
                />
                <Form.Control.Feedback type="invalid">
                  { cityErrors.length && cityErrors }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-required">State</Form.Label>
                <Form.Select
                  disabled
                  name="type"
                  id="type"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  required
                >
                  <option value="">Select a type</option>
                  {states.map((option) => (
                    <option value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>GST Number</Form.Label>
                <Form.Control value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="Enter GST Number" />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-required">Pincode</Form.Label>
                <Form.Control
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setPincodeErrors('');
                  }}
                  placeholder="Enter pincode"
                  isInvalid={!!(pincodeErrors.length && pincodeErrors)}
                />
                <Form.Control.Feedback type="invalid">
                  {pincodeErrors.length && pincodeErrors }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="pagenation-style">
            <Button
              className="me-2  px-3"
              onClick={() => {
                fromDashBoard
                  ? router.push('/dashboard/procurement/manage-address') : onHide();
              }}
              variant="danger"
            >
              <FontAwesomeIcon icon={faTimes} />
              {' '}
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleAddNew()} className="btn btn-success  px-3">
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Submit
            </Button>
          </div>

        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddAddressStep;
