import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Row, Col, Button, Table, Modal, Form, Spinner, Pagination,
} from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import Axios from 'axios';
import {
  faTrash, faPencil, faPlus, faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';

import { createConsignee, createConsigneeAdminService, deleteQuotationConsignee } from '../../services/dashboard/rfc/rfc';
import DeleteModal from '../common/modals/DeleteModal';

function SelectedConsignee({
  quotation, toggleAll, headers, consignee, callConsigneesTable, setDeliveryDays, setQuantity,
  setSelectedConsignee, setSelectedItem, toggleShowAddOfficer, setAction,
  setEditConsigneeItemId, setShowDeleteModal,
}) {
  const [showSpecifications, setShowSpecifications] = useState(toggleAll);

  const addQuotationConsignee = (quantity) => {
    Axios.patch(Api.editQuotationConsignees(quotation.uid, consignee.id), { quantity }, { headers })
      .then((res) => {
        console.log(res);
        callConsigneesTable();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <>
      <tr key={consignee?.consignee?.id}>
        <td><Button variant="light" className="w-100" onClick={() => setShowSpecifications(!showSpecifications)}>{showSpecifications ? '-' : '+'}</Button></td>
        <td>{consignee.item?.category?.name}</td>
        <td>
          {consignee.consignee?.name}
          ,
          {' '}
          {consignee.consignee?.address_1}
          ,
          {' '}
          {consignee.consignee?.address_2}
          ,
          {' '}
          {consignee.consignee?.city}
          ,
          {' '}
          {consignee.consignee?.pincode}
          .
        </td>
        <td className="">
          <div className="mx-auto">
            <button
              type="button"
              disabled={consignee.quantity === 1}
              onClick={() => {
                addQuotationConsignee(consignee.quantity - 1);
              }}
              className="consignee-cart-quantity-incrementor cart-border-radius"
            >
              -
            </button>
            <span className="cart-quantity-placeholder">
              {consignee.quantity}
            </span>
            <button
              type="button"
              onClick={() => {
                addQuotationConsignee(consignee.quantity + 1);
              }}
              className="consignee-cart-quantity-incrementor cart-border-radius1"
            >
              <div className="mr-2">
                +
              </div>

            </button>
          </div>

        </td>

        <td>
          {consignee.delivery_days}
          {' '}
          days
        </td>
        <td>
          <div className="d-flex justify-content-between">
            <div>
              <Button
                variant="text"
                onClick={() => {
                  setSelectedItem(consignee?.item?.category.id);
                  setSelectedConsignee(consignee?.consignee?.id);
                  setQuantity(consignee.quantity);
                  setDeliveryDays(consignee.delivery_days);
                  setAction('patch');
                  setEditConsigneeItemId(consignee);
                  toggleShowAddOfficer(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  className="text-primary fa-x my-auto mx-auto"
                />
              </Button>
            </div>
            <div>
              <Button
                variant="text"
                onClick={() => {
                  setShowDeleteModal(true);
                  setEditConsigneeItemId(consignee);
                }}
              >

                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-danger fa-x my-auto mx-auto"
                />
              </Button>
            </div>
          </div>
        </td>
      </tr>
      {
      showSpecifications && (
        <tr key={consignee?.consignee?.id}>
          <td />
          <td colSpan="5" className="customized-product w-100">
            <Table striped hover className="table-line-highlighter">
              {
                consignee && consignee.item && consignee.item.attributes && consignee.item.attributes.map((attribute) => (
                  <tr key={attribute.id}>
                    <th className="w-50 px-5 ">{attribute.attribute.name}</th>
                    <td className="p-2">
                      {attribute.name}
                    </td>
                  </tr>
                ))
              }
            </Table>
          </td>
        </tr>

      )
    }
    </>
  );
}
function Officer({ setSelectedStep, quotation }) {
  const [validated, setValidated] = useState(false);
  const [validatedCreateConsigneeForm, setValidatedCreateConsigneeForm] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showAddOfficer, toggleShowAddOfficer] = useState(false);
  const [showConsigneeModal, setShowConsigneeModal] = useState(false);
  const [consignees, setConsignees] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedConsignee, setSelectedConsignee] = useState();
  const [quantity, setQuantity] = useState();
  const [deliveryDays, setDeliveryDays] = useState();
  const [action, setAction] = useState('post');
  const [editConsigneeItemId, setEditConsigneeItemId] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);

  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');

  const [quotationConsigneesTableData, setQuotationConsigneesTableData] = useState({});
  const [quotationConsigneesLoading, setQuotationConsigneesLoading] = useState(true);
  const [quotationCartItemsTableData, setQuotationCartItemsTableData] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState();
  const [addConsigneeLoading, setAddConsigneeLoading] = useState(false);
  const [addConsigneeFormErrors, setAddConsigneeFormErrors] = useState({});
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { query: { categoryId, page } } = router;
  const callConsigneesTable = () => {
    setQuotationConsigneesLoading(true);
    setTableLoading(true);
    const quotationConsigneesPromises = [];
    const quotationCartItemsPromises = [];
    if (quotation && quotation.uid) {
      quotationConsigneesPromises.push(Axios.get(
        Api.getQuotationConsignees(quotation.uid),
        { headers },
      ));
      quotationCartItemsPromises.push(Axios.get(
        Api.getQuotationCartItems(quotation.uid),
        { headers },
      ));
    }
    setQuotationConsigneesTableData({});
    setQuotationCartItemsTableData({});
    Axios.get(
      Api.getQuotationConsignees(quotation.uid, page || 1),
      { headers },
    )
      .then((res) => {
        setPreviousPage(res.previous);
        setNextPage(res.next);
        setQuotationConsigneesTableData(res.data.results);
        setQuotationConsigneesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setQuotationConsigneesLoading(false);
      });
    Promise.all(quotationCartItemsPromises)
      .then((res) => {
        res.map((mapItem, index) => {
          setTableLoading(true);
          setQuotationCartItemsTableData((prevState) => ({
            ...prevState,
            [`cartItem${index}`]: mapItem.data.results,
          }));
        });
        if (res && res.length) {
          setCartItems(res[0].data.results);
        }
        setTableLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setTableLoading(false);
      });
  };
  useEffect(() => {
    callConsigneesTable();
  }, []);
  useEffect(() => {
    if (!showAddOfficer) {
      setSelectedItem();
      setSelectedConsignee();
      setQuantity();
      setDeliveryDays();
      setAddConsigneeFormErrors({});
      setNonFieldErrors();
    }
  }, [showAddOfficer]);

  const getConsigneeOfficers = () => {
    Axios.get(Api.getConsignees, { headers }).then(({ data }) => {
      // console.log(data);
      setConsignees(data);
      if (data && data.length) {
        setSelectedConsignee(data[0].id);
      }
    }).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    getConsigneeOfficers();
  }, []);

  const handlePath = (path) => {
    console.log((path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]), 'mknnkn');
    router.push({
      pathname: '/dashboard/assets/hardware',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]) || 1,
      },
    });
    setTableLoading(true);
    const pageNum = (path.includes('page') && ((path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1])) || 1;

    Axios.get(Api.getQuotationConsignees(quotation.uid, pageNum || 1), { headers })
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setQuotationConsigneesTableData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .catch((err) => {
        console.log('err, err', err);
      })
      .finally(() => { setTableLoading(false); });
  };

  const RenderTableRows = ({ quotationConsigneeItem, toggleAll }) => quotationConsigneeItem && quotationConsigneeItem.map((consignee) => (
    <SelectedConsignee
      quotation={quotation}
      toggleAll={toggleAll}
      headers={headers}
      consignee={consignee}
      callConsigneesTable={callConsigneesTable}
      setDeliveryDays={setDeliveryDays}
      setQuantity={setQuantity}
      setSelectedConsignee={setSelectedConsignee}
      setSelectedItem={setSelectedItem}
      toggleShowAddOfficer={toggleShowAddOfficer}
      setAction={setAction}
      setEditConsigneeItemId={setEditConsigneeItemId}
      setShowDeleteModal={setShowDeleteModal}

    />
  ));

  const renderModalOptions = () => cartItems?.map((cart) => (
    <option value={cart.id}>
      {cart && cart.category && cart.category.name}
      {' '}
      -
      {' '}
      {cart && cart.uid}
    </option>
  ));

  const renderConsigneeModalOptions = () => consignees?.map((consignee) => (
    <option value={consignee?.id}>
      {consignee?.name}
      ,
      {' '}
      {consignee?.address_1}
      ,
      {' '}
      {consignee?.address_2}
      ,
      {' '}
      {consignee?.city}
      ,
      {' '}
      {consignee?.pincode}
      .
    </option>
  ));

  const addQuotationConsignee = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      setNonFieldErrors();
      setAddConsigneeFormErrors({});
      setAddConsigneeLoading(true);
      let values = {};
      if (action === 'post') {
        values = {
          item: selectedItem,
          consignee: selectedConsignee,
          quantity,
          delivery_days: deliveryDays,
        };
      } else {
        values = {
          consignee: selectedConsignee,
          quantity,
          delivery_days: deliveryDays,
        };
      }

      Axios[action](action === 'post' ? Api.addConsigneeToQuotations(quotation.uid, selectedItem) : Api.editQuotationConsignees(quotation.uid, editConsigneeItemId.id), values, { headers })
        .then(() => {
          setAddConsigneeLoading(false);
          callConsigneesTable();
          toggleShowAddOfficer(false);
          setAction('post');
          setValidated(false);
          setValidated(false);
        })

        .catch(({ response: { data } }) => {
          setAddConsigneeLoading(false);
          if (data) {
            setAddConsigneeFormErrors(data);
          }
          if (data && data.non_field_errors) {
            setNonFieldErrors(data.non_field_errors);
          }
        })
        .finally(() => setAddConsigneeLoading(false));
    }
  };
  const handleDelete = () => {
    deleteQuotationConsignee(accessToken, quotation.uid, editConsigneeItemId.id)
      .then(({ errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          console.log(applyErrors);
        } else {
          setShowDeleteModal(false);
          callConsigneesTable();
        }
      });
  };

  const renderAddOfficerModal = () => (
    <Modal
      size="lg"
      show={showAddOfficer}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        setAction('post');
        toggleShowAddOfficer(false);
        setValidated(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-header-text">
          {action === 'patch' ? 'Edit' : 'Add'}
          {' '}
          {' '}
          {' '}
          Consignees/Reporting Officer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {
            action === 'patch' && (
            <h4>
              {
              `Item: ${editConsigneeItemId && editConsigneeItemId.item && editConsigneeItemId.item.category && editConsigneeItemId.item.category && editConsigneeItemId.item.category.name}
              `
              }
            </h4>
            )
          }
        </div>
        <Form noValidate validated={validated} onSubmit={addQuotationConsignee}>
          <Row>
            {
            action === 'post' && (
              <Col>
                <Form.Group className="mb-3" controlId="Item">
                  <Form.Label className="officer-table-header-cell">Item</Form.Label>
                  <Form.Select required id="Item" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                    <option value="">Select an Item</option>
                    {renderModalOptions()}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please Select an Item.
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{addConsigneeFormErrors.item}</p>
                </Form.Group>
              </Col>

            )
          }
            <Col>
              <Form.Group className="mb-3" controlId="ConsigneeOfficer">
                <Form.Label className="officer-table-header-cell">Consignee Officer</Form.Label>
                <Form.Select required value={selectedConsignee} id="ConsigneeOfficer" onChange={(e) => setSelectedConsignee(e.target.value)}>
                  <option value="">Select an Item</option>
                  {renderConsigneeModalOptions()}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please Select an Consignee Officer.
                </Form.Control.Feedback>
                <p style={{ color: 'red' }}>{addConsigneeFormErrors.consignee}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="Quantity">
                <Form.Label className="officer-table-header-cell">Quantity</Form.Label>
                <Form.Control type="number" min={1} required value={quantity} id="Quantity" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                  Please enter Quantity.
                </Form.Control.Feedback>
                <p style={{ color: 'red' }}>{addConsigneeFormErrors.quantity}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="DeliveryDays">
                <Form.Label className="officer-table-header-cell">Delivery Days</Form.Label>
                <Form.Control type="number" min={1} required value={deliveryDays} id="DeliveryDays" placeholder="Enter Quantity" onChange={(e) => setDeliveryDays(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                  Please enter Delivery Days.
                </Form.Control.Feedback>
                <p style={{ color: 'red' }}>{addConsigneeFormErrors.delivery_days && addConsigneeFormErrors.delivery_days[0]}</p>
              </Form.Group>
            </Col>
          </Row>
          {
          nonFieldErrors && (
            <div className="alert alert-danger" role="alert">
              {nonFieldErrors}
            </div>

          )
        }
          <div className="d-flex justify-content-end">

            <Button type="submit">
              {
                addConsigneeLoading ? (
                  <Spinner animation="border" size="sm" style={{ zIndex: 0 }} />
                ) : action === 'post' ? 'Submit' : 'Update'
              }
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
  const submitConsignee = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidatedCreateConsigneeForm(true);
      e.stopPropagation();
    } else {
      e.preventDefault();
      const values = {};
      console.log(e);
      Object.keys(e.target).forEach((eachItem) => {
        if (e.target[eachItem].id) {
          values[e.target[eachItem].id] = e.target[eachItem].value;
        }
      });
      console.log('values', values);
      values.state = 1;

      const { data, errors } = await createConsigneeAdminService(accessToken, values);
      if (errors) {
        console.log(errors);
      }
      if (data) {
        console.log(data);
        setShowConsigneeModal(false);
        getConsigneeOfficers();
        setValidatedCreateConsigneeForm(false);
      }
    }
  };
  const renderCreateConsgneesModal = () => (
    <Modal
      size="lg"
      show={showConsigneeModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        setShowConsigneeModal(false);
        setValidatedCreateConsigneeForm(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-header-text">
          Create Consignee Officer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validatedCreateConsigneeForm} onSubmit={submitConsignee}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="officer-table-header-cell">Name</Form.Label>
                <Form.Control required id="name" placeholder="Enter consignee Name" />
                <Form.Control.Feedback type="invalid">
                  Please enter Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="address_1">
                <Form.Label className="officer-table-header-cell">Address 1</Form.Label>
                <Form.Control required id="address_1" placeholder="Enter address 1" />
                <Form.Control.Feedback type="invalid">
                  Please enter Address 1.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="address_2">
                <Form.Label className="officer-table-header-cell">Address 2</Form.Label>
                <Form.Control required id="address_2" placeholder="Enter address_2" />
                <Form.Control.Feedback type="invalid">
                  Please enter Address 2.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label className="officer-table-header-cell">City</Form.Label>
                <Form.Control required id="city" placeholder="Enter city" />
                <Form.Control.Feedback type="invalid">
                  Please enter City.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="pincode">
                <Form.Label className="officer-table-header-cell">Pincode</Form.Label>
                <Form.Control required id="pincode" placeholder="Enter pincode" />
                <Form.Control.Feedback type="invalid">
                  Please enter Pincode.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label className="officer-table-header-cell">Phone</Form.Label>
                <Form.Control required id="phone" placeholder="Enter phone" />
                <Form.Control.Feedback type="invalid">
                  Please enter Phone Number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="officer-table-header-cell">Email</Form.Label>
                <Form.Control required type="email" id="email" placeholder="Enter email" />
                <Form.Control.Feedback type="invalid">
                  Please enter Email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Create
            </Button>

          </div>
        </Form>
      </Modal.Body>

    </Modal>
  );

  return (
    <div className="bg-white p-3 rounded">
      {renderAddOfficerModal()}
      {renderCreateConsgneesModal()}
      <Row>
        {
          categoryId === 'checkout' ? (
            <Col className="mb-3 d-flex justify-content-end">
              <Button
                variant="primary"
                onClick={() => router.push({
                  pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
                  query: { step: 3 },
                })}
              >
                Next

              </Button>
            </Col>

          ) : (
            <Col className="mb-3 d-flex justify-content-between">
              <Button
                variant="primary"
                onClick={() => router.push({
                  pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
                  query: { categoryId, step: 1 },
                })}
              >
                Back

              </Button>
              <Button
                variant="primary"
                onClick={() => router.push({
                  pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
                  query: { categoryId, step: 3 },
                })}
              >
                Next

              </Button>
            </Col>

          )
        }
        { /* <div className="mb-3">
          <Button onClick={() => toggleShowAddOfficer(true)}>Add Consignee</Button>
          <Button onClick={() => setShowConsigneeModal(true)}>Create Consignee</Button>
        </div> */ }
        {
          (quotationConsigneesLoading || tableLoading) ? (
            <div style={{ height: '70vh' }}>
              <div className="cust-spinner h-100">
                <Spinner animation="border" />
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between">
                <Button
                  className="mb-2"
                  onClick={() => {
                    setCartItems(quotationCartItemsTableData.cartItem0);
                    toggleShowAddOfficer(true);
                  }}
                >
                  Assign Consignee
                </Button>
                <Button
                  className="mb-2"
                  onClick={() => {
                    setShowConsigneeModal(true);
                  }}
                >
                  Create Consignee Officer
                </Button>

              </div>

              <Table striped bordered>
                <thead>
                  <tr>
                    <th className="officer-table-header-cell">
                      <div className="d-flex justify-content-center">
                        {
                          toggleAll ? (
                            <FontAwesomeIcon style={{ cursor: 'pointer', width: '40px' }} onClick={() => setToggleAll(!toggleAll)} icon={faMinus} className="mx-2 " />

                          ) : (
                            <FontAwesomeIcon style={{ cursor: 'pointer', width: '40px' }} onClick={() => setToggleAll(!toggleAll)} icon={faPlus} className="mx-2" />

                          )
                        }
                      </div>

                    </th>
                    <th className=""><p className="my-auto">Items</p></th>
                    <th className="">
                      <p className="my-auto">Consignees/Reporting Officer</p>
                    </th>
                    <th className=""><p className="my-auto">Quantity</p></th>
                    <th className=""><p className="my-auto">Delivery Days(Max: 365 days)</p></th>
                    <th className=""><p className="my-auto">Actions</p></th>
                  </tr>
                </thead>
                <tbody>
                  {quotationConsigneesTableData && <RenderTableRows quotationConsigneeItem={quotationConsigneesTableData} toggleAll={toggleAll} />}
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

          )
        }
      </Row>

      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); }}
        id={editConsigneeItemId.id}
        title={`for ${editConsigneeItemId && editConsigneeItemId.item && editConsigneeItemId.item.category && editConsigneeItemId.item.category && editConsigneeItemId.item.category.name}`}
        type="Cart Item Consignee"
        handleDelete={handleDelete}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { quotation } = state;
  return { quotation };
}

export default connect(mapStateToProps, null)(Officer);
