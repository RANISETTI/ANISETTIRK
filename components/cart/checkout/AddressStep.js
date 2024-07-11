import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Modal, Row, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import getSecretariatDepartments, { getHODDepartments } from '../../../services/dashboard/departments';
import { updateOrderStatusService } from '../../../services/dashboard/orders';
import { updateCart } from '../slice/cartSlice';
import AddAddressStep from './AddAddressStep';
import { Context } from './CheckoutContext';
import SearchableDropdown from './SearchableDropdown';

export default function AddressStep() {
  const [address, setAddress] = useState([]);
  const contextData = useContext(Context);
  const router = useRouter();
  const {
    accessToken,
    userDetails: { type, department: { slug }, department },
    userDetails,
  } = useSelector((state) => state.user);

  const { query: { orderId } } = router;
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedBillingAddress, setSelectedBillingAddress] = useState();
  const [sameAsShippingAddress, setSameAsShippingAddress] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [showAddress, setShowAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState('');
  const [status, setStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const [errors, setErrors] = useState('');

  const [selectedDepartment, setSelectedDepartment] = useState(department && department.parent);
  const [hodDepartments, setHodDepartments] = useState();
  const [selectedHodDepartment, setSelectedHodDepartment] = useState(type === 'DEPARTMENT' ? (department && department) : '');
  const [departmentSlug, setDepartmentslug] = useState();

  const headers = getHeaders(accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const addressPromise = Axios.get(Api.getOrAddAddress(slug), { headers });
    Promise.all([addressPromise]).then(([{ data }]) => {
      setAddress(data);
    }).finally(() => setIsLoading(false));
  }, []);

  // Axios.get(Api.patchOrderDetails(orderId), { headers }).then(({ data }) => {
  //   setOrderDetails(data);
  //   setErrors(errors);
  // }).catch((err) => {
  //   setErrors(err);
  // })

  const getDepartments = (search) => {
    getSecretariatDepartments(search, headers).then(({ data }) => {
      setDepartments(data.results);
    });
  };

  const getHodDepartments = (parentId, searchValue) => {
    getHODDepartments(searchValue, parentId, headers).then(({ data }) => {
      setHodDepartments(data.results);
    });
  };
  useEffect(() => {
    getHodDepartments('');
    getDepartments('');
  }, []);

  useEffect(() => {
    if (departmentSlug) {
      getAddresses(departmentSlug);
    }
  }, [departmentSlug]);

  const onChangeShippingAddress = (data) => {
    setSelectedAddress(data);
    if (sameAsShippingAddress) {
      setSelectedBillingAddress(data);
    }
  };

  const onNext = async () => {
    setIsLoading(true);
    await Axios.post(Api.cartCheckout, {
      department: selectedHodDepartment ? selectedHodDepartment.id : selectedDepartment.id,
    }, { headers })
      .then(async ({ data, errors }) => {
        dispatch(updateCart({ cart: data }));
        if (data) {
          const totalPrice = data.total_price;
          await Axios.patch(
            Api.patchOrderDetails(data.order_id),
            { shipping_address: selectedAddress, billing_address: selectedBillingAddress },
            { headers },
          ).then(({ data }) => {
            const finalStep = totalPrice > 1000000 ? 'thankYou' : 'finalStep';
            if (totalPrice > 1000000) {
              updateOrderStatusService(accessToken, data?.uid, {
                comment: 'Order Request Submitted Successfully', status: null, file: null, received_amount: '', sent_amount: '',
              });
            }
            router.push({
              pathname: `/dashboard/procurement/new/checkout/${data?.uid}`,
              query: { step: finalStep },
            });
          })
            .catch((err) => console.log(err, 'hello err'))
            .finally(() => setIsLoading(false));
        }
      });
  };

  const onChangeSameAsShippingAddress = (checked) => {
    setSameAsShippingAddress(checked);
    if (checked) {
      setSelectedBillingAddress(selectedAddress);
    } else {
      setSelectedBillingAddress('');
    }
  };

  const getAddresses = (id) => {
    Axios.get(Api.getOrAddAddress(id), { headers })
      .then(({ data }) => {
        setAddress(data);
      });
  };

  const addAddressModal = () => (
    <Modal
      show={!!showAddress}
      size="lg"
      onHide={() => setShowAddress('')}
    >
      <AddAddressStep
        setShowAddress={setShowAddress}
        fromDashBoard={false}
        getAddress={getAddresses}
        department={departmentSlug}
        onHide={() => setShowAddress('')}
      />
    </Modal>
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

  // if (errors) {
  //   return (<Page404 />);
  // }

  return (
    <div>
      {/* {orderDetails.status === 'DRAFT' ? ( */}
      <div>
        {addAddressModal()}
        <Card className="pb-3">
          <Card.Header className="pt-3 bg-transparent">
            <Row>
              <Col xs={12} md={5}>
                <h2 className="your-cart">Checkout</h2>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row xs={2}>
              <Col>
                <Form.Group>
                  <Form.Label>Select Secretariat Department</Form.Label>
                  <Select
                    isDisabled={type === 'DEPARTMENT'}
                    defaultValue={selectedDepartment}
                    value={selectedDepartment}
                    options={departments}
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
                        setSelectedDepartment(newValue);
                        setDepartmentslug(newValue && newValue.slug && newValue.slug);
                        setSelectedHodDepartment('');
                        getHodDepartments(newValue && newValue.id);
                        setSelectedAddress('');
                      } else if (action === 'clear') {
                        setSelectedDepartment('');
                        getDepartments('');
                        setSelectedHodDepartment('');
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Select HOD Department</Form.Label>
                  <Select
                    name="dependant_on"
                    value={selectedHodDepartment}
                    isDisabled={type === 'DEPARTMENT'}
                    isClearable
                    defaultValue={selectedHodDepartment}
                    options={hodDepartments}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    isSearchable
                    closeMenuOnSelect
                    onChange={(newValue, actionMeta) => {
                      const { action } = actionMeta;
                      if (action === 'select-option' || action === 'remove-value' || action === 'clear') {
                        setSelectedHodDepartment(newValue);
                        setDepartmentslug(newValue && newValue.slug);
                        setSelectedAddress('');
                      }
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={12} md={9}>
                <Form.Group className="my-3">
                  <Form.Label>Select Shipping Address</Form.Label>
                  <Row>
                    <SearchableDropdown disabled={type === 'DEPARTMENT' ? !slug : !departmentSlug} onChange={onChangeShippingAddress} selectedValue={selectedAddress} items={address} label="Select Shipping Address" />
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={12} md={3} className="text-end">
                <Button className="address-btn px-4" disabled={!selectedDepartment} onClick={() => setShowAddress('shipping')}>Add Shipping Address</Button>
              </Col>
            </Row>
            <Row>
              <Col className="p-0 pl-0 m-3 form-group1">
                <Form.Group controlId="formBasicCheckbox" className="d-flex">
                  <Form.Check id="checkbox" type="checkbox" label="Same address for billing address" checked={sameAsShippingAddress} onChange={() => onChangeSameAsShippingAddress(!sameAsShippingAddress)} />
                </Form.Group>
              </Col>
            </Row>
            {!sameAsShippingAddress && (
            <Row className="mt-4">
              <Col xs={12} md={9}>
                <Form.Group className="my-3">
                  <Form.Label>Select Billing Address</Form.Label>
                  <Row>
                    <SearchableDropdown onChange={setSelectedBillingAddress} selectedValue={selectedBillingAddress} items={address} label="Select Billing Address" />
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={12} md={3} className="text-end">
                <Button className="address-btn px-4" onClick={() => setShowAddress('shipping')}>Add Billing Address</Button>
              </Col>
            </Row>
            )}

            <Row>
              <Col>
                <div className="marg-1rem">
                  <Button
                    className="next-btn px-4 float-end"
                    disabled={!selectedAddress}
                    onClick={() => onNext()}
                    // onClick={ async () => await handleCheckout(accessToken, onNext, selectedDepartment.id)}
                  >
                    Next

                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

    </div>
  );
}
