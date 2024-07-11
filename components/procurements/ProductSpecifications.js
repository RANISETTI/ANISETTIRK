import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Accordion, Badge, Button, Col, Form, Row, Spinner, Toast, Table,
} from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import AddCategories from './AddCategory';
import CartItems from './CartItems';
import { updateQuotation } from './slice/QuotationSlice';

function ProductSpecifications({ setSelectedStep, updateQuotation: dispatchQuotation }) {
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [isItemsAddedToCart, setIsItemsAddedToCart] = useState(false);
  const [showErrorMessage, toggleErrorMessage] = useState(false);
  const [toggleMessage, setToggleMessage] = useState('');
  const [customizedProductLoading, setCustomizedProductLoading] = useState(false);
  const router = useRouter();
  const { query: { categoryId } } = router;
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const getAttributes = () => {
    const attributesPromise = Axios.get(Api.getAttributes(categoryId, selectedFilter), { headers });
    setLoader(true);
    Promise.all([attributesPromise]).then(([{ data: attributes }]) => {
      setFilters(attributes);
    }).finally(() => setLoader(false));
  };
  useEffect(() => {
    getAttributes();
  }, [selectedFilter, categoryId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showAddedToCartMessage]);

  const getCategory = () => {
    Axios.get(Api.getCategoryByID(categoryId), { headers })
      .then(({ data }) => {
        setSelectedCategory(data);
      }).catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (typeof Number(categoryId) === 'number') {
      getCategory();
      setSelectedFilter([]);
    }
  }, [categoryId]);

  const onSelectFilter = (options, option) => {
    const selectedAttributes = [...selectedFilter];
    const commonAttributes = options.filter((filterItem) => selectedAttributes.includes(filterItem.id)).map((mapItem) => mapItem.id);
    if (selectedAttributes.includes(option.id)) {
      selectedAttributes.splice(selectedAttributes.indexOf(option.id), 1);
    } else {
      selectedAttributes.push(option.id);
    }
    setSelectedFilter(selectedAttributes);
  };

  const renderOptions = (options) => (
    <Form>
      {
        options.map((option) => (
          <Form.Check type="checkbox" id={option.id} name={option.name} onClick={() => onSelectFilter(options, option)} checked={selectedFilter.includes(option.id)} label={option.name} className="procurement-filter-item" />
        ))
      }
    </Form>
  );

  const renderMandetoryColor = (item, isMandatory) => {
    if (isMandatory) {
      if (item.length) {
        return { backgroundColor: '#e6ffe6', borderLeft: '2px solid green' };
      }
      return { backgroundColor: '#ffad99', borderLeft: '2px solid orange' };
    }
    return { backgroundColor: 'white' };
  };

  const checkIfAlreadyMandetorySpecsSelected = () => {
    let isMandatoryFieldsSelected = false;
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i].is_mandatory) {
        const selectedSpecs = filters[i].options.filter((spec) => selectedFilter.includes(spec.id));
        if (selectedSpecs.length) {
          isMandatoryFieldsSelected = true;
        } else {
          isMandatoryFieldsSelected = false;
          break;
        }
      }
    }
    return isMandatoryFieldsSelected;
  };
  const checkIfMoreThanOneItemIsSelected = () => {
    let isMoreThanOneItemSelected = false;
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i].is_mandatory) {
        const selectedSpecs = filters[i].options.filter((spec) => selectedFilter.includes(spec.id));
        if (selectedSpecs.length > 1) {
          isMoreThanOneItemSelected = true;
          break;
        } else {
          isMoreThanOneItemSelected = false;
        }
      }
    }
    return isMoreThanOneItemSelected;
  };

  const addToCart = () => {
    setCustomizedProductLoading(true);
    if (checkIfAlreadyMandetorySpecsSelected()) {
      setCustomizedProductLoading(true);
      Axios.post(Api.addQuotationsInProcurement, { category: categoryId, attributes: selectedFilter }, { headers }).then(({ data }) => {
        setShowAddedToCartMessage(true);
        setIsItemsAddedToCart(true);
        setSelectedFilter([]);
        setCustomizedProductLoading(false);
      }).catch((err) => {
        console.log(err, 'hello err');
        setCustomizedProductLoading(false);
      });
    } else {
      toggleErrorMessage(true);
      setToggleMessage('Please select all mandatory specifications');
      setCustomizedProductLoading(false);
      setTimeout(() => {
        toggleErrorMessage(false);
      }, 10000);
    }
  };

  const handleCheckout = () => {
    Axios.post(Api.checkout, { }, { headers }).then((res) => {
      console.log(res);
      setShowCheckout(true);
    })
      .catch((err) => {
        console.log(err);
      });
  };
  const rendersFilters = () => {
    const filterComponents = filters.map((filter, index) => (
      <Accordion defaultActiveKey="0" className="product-specification-filter rounded">
        <Accordion.Item eventKey={index} style={{ borderLeft: filter.is_mandatory ? '2px solid orange' : 'none' }}>
          <Accordion.Header><p className="text-capitalize .ml-md-3 .ml-lg-0 product-filter-name m-0 fw-bold">{filter.name}</p></Accordion.Header>
          <Accordion.Body>
            <div className="mb-3">
              {renderOptions(filter.options)}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ));

    return filterComponents;
  };

  const displaySelectedOptions = (items) => items.map((item) => (
    <Badge className="p-2 mx-1" style={{ fontSize: '10px' }}>
      {item.name}
      <FontAwesomeIcon className="mx-2" style={{ cursor: 'pointer' }} icon={faX} onClick={() => setSelectedFilter((prevState) => prevState.filter((filterItem) => filterItem !== item.id))} />
    </Badge>
  ));

  const renderSelectedFilters = () => {
    const selectedSpecifications = filters.map((filter) => {
      const isMandatory = filter.is_mandatory;
      const selectedSpecs = filter.options.filter((option) => selectedFilter.includes(option.id));
      return (
        <Col lg={3} md={3} xs={12} className="mb-3">
          <div
            className="rounded w-100 p-3 h-100 selected-specification"
            style={renderMandetoryColor(selectedSpecs, isMandatory)}
          >
            <p className="m-0">
              {filter.name}
              :
              {' '}
            </p>
            {displaySelectedOptions(selectedSpecs)}

          </div>
        </Col>
      );
    });
    return selectedSpecifications;
  };

  const renderToastMessage = () => (
    <Toast className="toast-style" show={showErrorMessage} onClose={() => toggleErrorMessage(false)}>
      <Toast.Header className="toast-header-style">
        <strong className="me-auto text-white">Error!</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{toggleMessage}</Toast.Body>
    </Toast>
  );

  const renderEmptyCheckoutMessage = () => (
    <Toast className="toast-style" show={!isItemsAddedToCart} onClose={() => toggleErrorMessage(false)}>
      <Toast.Header className="toast-header-style">
        <strong className="me-auto text-white">Error!</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{!isItemsAddedToCart ? '' : 'Please select all mandatory fields.'}</Toast.Body>
    </Toast>
  );

  const renderAddedToCartMessage = () => (
    <Toast className="toast-style " bg="success" show={showAddedToCartMessage} onClose={() => setShowAddedToCartMessage(false)}>
      <Toast.Header>
        <strong className="me-auto">Success!</strong>
      </Toast.Header>
      <Toast.Body>Item is added to cart successfully.</Toast.Body>
    </Toast>
  );

  return (
    <div>
      <div className="position-relative">
        {showErrorMessage && renderToastMessage()}
        {showErrorMessage && isItemsAddedToCart && renderEmptyCheckoutMessage()}
        {showAddedToCartMessage && renderAddedToCartMessage()}
      </div>

      <Row>
        <Col xs={0} md={3} lg={3}>
          <div className="w-100">
            <p className="fw-bold fs-6">
              Product:
              {' '}
              {selectedCategory && selectedCategory.name}
            </p>
            {loader ? (
              <div style={{ height: '70vh' }}>
                <div className="cust-spinner h-100">
                  <Spinner animation="border" />
                </div>
              </div>
            )
              : rendersFilters()}
          </div>
        </Col>
        <Col xs={16} md={9} lg={9}>
          <Row>
            <Col className="mb-3 d-flex justify-content-end">
              <AddCategories buttonName="Add Product" />

              <Button variant="primary" className=" mx-2" onClick={() => addToCart()}>
                {
                customizedProductLoading ? (
                  <Spinner animation="border" size="sm" style={{ zIndex: 0 }} />
                ) : 'Add To Cart'
              }
              </Button>
              <Button variant="primary" onClick={() => { router.push('/dashboard/procurement/new/customized-product/cart'); }}>Go To Cart</Button>
            </Col>
          </Row>
          <Row>
            {renderSelectedFilters()}
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default connect(null, { updateQuotation })(ProductSpecifications);
