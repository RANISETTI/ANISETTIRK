import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { addProductService, editProductService, getServices } from '../../../../services/dashboard/masters';

export default function ProductDetails({ categories, brands, next, getCategories, getBrands }) {
  const [product, setProduct] = useState({
    title: '',
    model: '',
    start_date: '',
    end_date: '',
    code: '',
    part_number: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    active: false,
    verified: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [productErrors, setProductErrors] = useState({});

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id } } = router;

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('model', product.model);
    formData.append('code', product.code);
    formData.append('part_number', product.part_number);
    formData.append('price', product.price);
    formData.append('category', product.category.id);
    formData.append('brand', product.brand.id);
    formData.append('description', product.description);
    formData.append('active', product.active);
    formData.append('start_date', moment(product.start_date).format('YYYY-MM-DD'));
    formData.append('end_date', moment(product.end_date).format('YYYY-MM-DD'));
    formData.append('verified', product.verified);
    if (id) {
      editProductService(accessToken, id, formData).then(({ data, errors }) => {
        if (errors) {
          setProductErrors(errors);
        } else {
          next();
          router.push({
            pathname: `/dashboard/masters/products/add-product/${id}/`,
            query: { tab: 'images' },
          });
        }
      }).finally(() => { setIsLoading(false); });
    } else {
      addProductService(accessToken, formData).then(({ data, errors }) => {
        if (errors) {
          setProductErrors(errors);
        } else {
          next();
          router.push({
            pathname: `/dashboard/masters/products/add-product/${data.id}/`,
            query: { tab: 'images' },
          });
        }
      }).finally(() => { setIsLoading(false); });
    }
  };

  const getProductDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/products/${id}`).then(({ data }) => {
      setProduct(data);
    }).finally(() => { setIsLoading(false); });
  };
  useEffect(() => {
    if (id) {
      getProductDetails();
    }
  }, []);

  const onchange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setProductErrors({ ...productErrors, [e.target.name]: '' });
  };
console.log('productErrors: ', productErrors);
  return (
    <Card className="p-2">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            { id ? 'Edit' : 'Add'}
            {' '}
            Product Details
          </h3>
          <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/masters/products')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      {isLoading && (
        (
        <div className="tender-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        ))}
      <Card.Body>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={onchange}
              placeholder="Enter Title"
              required
              isInvalid={!!productErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {productErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row xs={1} md={3}>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form">Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              id="model"
              value={product.model}
              onChange={onchange}
              placeholder="Enter Model No"
              isInvalid={!!productErrors.model}
            />
            <Form.Control.Feedback type="invalid">
              {productErrors.model}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form">Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              id="code"
              value={product.code}
              onChange={onchange}
              placeholder="Enter Code"
              required
              isInvalid={!!productErrors.code}
            />
            <Form.Control.Feedback type="invalid">
              {productErrors.code}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form">Part Number</Form.Label>
            <Form.Control
              type="text"
              name="part_number"
              id="part_number"
              value={product.part_number}
              onChange={onchange}
              placeholder="Enter Part Number"
              isInvalid={!!productErrors.part_number}
            />
            <Form.Control.Feedback type="invalid">
              {productErrors.part_number}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              id="price"
              value={product.price}
              onChange={onchange}
              placeholder="Enter Price"
              required
              isInvalid={!!productErrors.price}
            />
            <Form.Control.Feedback type="invalid">
              {productErrors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Category</Form.Label>
            {/* <Form.Select
              id="category"
              name="category"
              value={product.category}
              onChange={onchange}
              required
              isInvalid={!!productErrors.category}
              style={{ position: 'relative' }}
            >
              <option style={{ position: 'relative' }} value="">Select a Category</option>
              {categories.length && categories.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </Form.Select> */}
              <Select
                      name="category"
                      isClearable
                      value={(id
                        && product.category)}
                      options={categories && categories}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect
                      onInputChange={(
                        inputValue,
                        { action, prevInputValue },
                      ) => {
                        switch (action) {
                          case 'set-value':
                            return inputValue;
                          case 'input-change':
                            if (inputValue) {
                              getCategories(inputValue);
                            } else {
                                getCategories('');
                            }
                            return inputValue;
                          default:
                            return inputValue;
                        }
                      }}
                    onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                     if (action === 'select-option' || action === 'remove-value') {
                        setProduct({ ...product, category: newValue, });
                          setProductErrors({ ...productErrors, category: '' });
                     } else if (action === 'clear') {
                          getCategories('');
                          setProduct({ ...product, category: '', });
                          setProductErrors({ ...productErrors, category: '' });
                        }
                    }}
              isInvalid={!!productErrors.category}
            />
            {productErrors.category &&
            <p className='text-danger'> {productErrors.category}</p>}
            <Form.Control.Feedback type="invalid">
              {productErrors.category}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Brand</Form.Label>
            {/* <Form.Select
              id="brand"
              name="brand"
              value={product.brand}
              onChange={onchange}
              required
              isInvalid={!!productErrors.brand}
            >
              <option value="">Select a Brand</option>
              {brands.length && brands.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Select> */}
            <Select
                      name="brand"
                      isClearable
                      value={(id
                        && product.brand)}
                      options={brands && brands}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect
                      onInputChange={(
                        inputValue,
                        { action, prevInputValue },
                      ) => {
                        switch (action) {
                          case 'set-value':
                            return inputValue;
                          case 'input-change':
                            if (inputValue) {
                              getBrands(inputValue);
                            } else {
                                getBrands('');
                            }
                            return inputValue;
                          default:
                            return inputValue;
                        }
                      }}
                    onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                     if (action === 'select-option' || action === 'remove-value') {
                        setProduct({ ...product, brand: newValue, });
                          setProductErrors({ ...productErrors, brand: '' });
                     } else if (action === 'clear') {
                                getBrands('');
                          setProduct({ ...product, category: '', });
                          setProductErrors({ ...productErrors, brand: '' });
                        }
                    }}
              isInvalid={!!productErrors.brand}
            />
            {productErrors.brand &&
            <p className='text-danger'> {productErrors.brand}</p>}
            <Form.Control.Feedback type="invalid">
              {productErrors.brand}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="my-2" xs={12} md={6}>
            <Form.Label className="form-required">
              Start Date
            </Form.Label>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              placeholderText="Start Date"
              selected={product.start_date ? new Date(product.start_date) : null}
              value={product.start_date}
              className="date-picker-input"
              onChange={(e) => {
                setProduct({ ...product, start_date: e });
                setProductErrors({ ...productErrors, start_date: '' });
              }}
              minDate={moment().toDate()}
            />
            {productErrors.start_date ? (
              <p style={{ color: '#dc3545', fontSize: '14px' }}>
                {productErrors.start_date}
              </p>
            ) : ''}
          </Form.Group>
          <Form.Group as={Col} className="my-2" xs={12} md={6}>
            <Form.Label className="form-required">
              End Date
            </Form.Label>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              placeholderText="End Date"
              selected={product.end_date ? new Date(product.end_date) : null}
              value={product.end_date}
              className="date-picker-input"
              onChange={(e) => {
                setProduct({ ...product, end_date: e });
                setProductErrors({ ...productErrors, end_date: '' });
              }}
              minDate={moment().toDate()}
            />
            {productErrors.end_date ? (
              <p style={{ color: '#dc3545', fontSize: '14px' }}>
                {productErrors.end_date}
              </p>
            ) : ''}
          </Form.Group>
        </Row>
        <Form.Group as={Col} className="mb-3">
          <Form.Label className="form">Description</Form.Label>
          <Form.Control
            type="textarea"
            as="textarea"
            name="description"
            id="description"
            value={product.description}
            onChange={onchange}
            placeholder="Enter Description"
            required
            isInvalid={!!productErrors.description}
          />
          <Form.Control.Feedback type="invalid">
            {productErrors.description}
          </Form.Control.Feedback>
        </Form.Group>
        {productErrors.non_field_errors ? (
              <p style={{ color: '#dc3545', fontSize: '14px' }}>
                {productErrors.non_field_errors}
              </p>
            ) : ''}
        {roles && roles.includes('Product Manager') ? '' : (
          <div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="verfied"
                id="verfied"
                checked={product.verified}
                onChange={(e) => setProduct({ ...product, verified: e.target.checked })}
                type="checkbox"
                label="Verfied"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="active"
                id="active"
                checked={product.active}
                onChange={(e) => setProduct({ ...product, active: e.target.checked })}
                type="checkbox"
                label="Active"
              />
            </Form.Group>
          </div>
        )}
        <div className="pagenation-style">
          <Button variant="danger" className="me-2 px-3 mb-3" onClick={() => router.push('/dashboard/masters/products')}>
            <FontAwesomeIcon icon={faTimes} />
            {' '}
            Cancel
          </Button>
          {
                id ? (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success px-3 mb-3 mx-2"
                    onClick={() => onSubmit()}
                  > <FontAwesomeIcon icon={faCheck} /> &nbsp;
                    {
                      isLoading ? (
                        <div className="button-loading">
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : 'Submit'
                    }
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success px-3 mb-3 mx-2"
                    onClick={() => onSubmit()}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCheck} />
                    {' '}
&nbsp;
                    {
                      isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : 'Submit'
                    }
                  </Button>
                )
              }
        </div>
      </Card.Body>
    </Card>
  );
}
