import {
  faCheck, faChevronLeft, faTimes, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Card, Form, Spinner, Row, Col,
} from 'react-bootstrap';
import {
  MinusCircle, Trash2,
} from 'react-feather';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import {
  addProductAttributeService,
  deleteProductAttributeService,
  editProductAttributeService,
  getServices,
} from '../../../../services/dashboard/masters';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddProductAttributes({ next }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [attributesData, setAttributesData] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const router = useRouter();

  const { accessToken } = useSelector((state) => state.user);

  const { query: { id } } = router;

  const getCategoryDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/products/${id}`).then(({ data }) => {
      getAttributes(data.category.id);
    }).finally(() => { setIsLoading(false); });
  };

  const getProductDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/products/${id}/attributes/`).then(({ data }) => {
      setAttributes(data.results);
    }).finally(() => { setIsLoading(false); });
  };

  const getAttributes = (categoryId) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories/${categoryId}/attributes/`).then(({ data, errors }) => {
      if (data) {
        setAttributesData(data.results);
      } else {
        console.log(errors);
        setAttributes([]);
      }
    }).finally(() => setIsLoading(false));
  };

  const getAttributeOptions = (attributeId) => {
    setOptionsLoading(true);
    getServices(accessToken, `/admin/attributes/${attributeId}/options/`).then(({ data }) => {
      setAttributeOptions(data.results);
      setOptionsLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      getCategoryDetails();
      getProductDetails();
    }
  }, []);

  const onSubmit = () => {
    const Promises = [];
    setFormLoading(true);
    if (attributes.filter(
      (attribute) => !attribute.attribute || attribute.sort_order === null || !attribute.attribute_options,
    ).length) {
      setAttributes(attributes.map((item) => {
        let newitem = item;
        if (!item.attribute) {
          newitem = { ...newitem, errors: { ...newitem.errors, attribute: 'Please select an attribute' } };
        }
        if (item.sort_order === null) {
          newitem = { ...newitem, errors: { ...newitem.errors, sort_order: 'A valid integer required' } };
        }
        if (!item.attribute_options) {
          newitem = { ...newitem, errors: { ...newitem.errors, attribute_options: 'Please select atleast one attribute option' } };
        }
        return newitem;
      }));
    } else {
      attributes.map((attribute) => {
        const formData = new FormData();
        if (attribute.id) {
          formData.append('attribute', attribute.attribute.id);
        } else {
          formData.append('attribute', attribute.attribute);
        }
        if (attribute.attribute_options) {
          attribute.attribute_options.map((option) => {
            formData.append('attribute_options', option.id);
          });
        }
        formData.append('sort_order', attribute.sort_order);
        formData.append('verified', attribute.verified);
        if (attribute.id) {
          Promises.push(
            editProductAttributeService(accessToken, id, attribute.id, formData),
          );
        } else {
          Promises.push(
            addProductAttributeService(accessToken, id, formData),
          );
        }
      });
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setAttributes(
              res.map((item, index) => {
                if (item.errors) {
                  return {
                    ...attributes[index],
                    errors: item.errors,
                  };
                }
                return attributes[index];
              }),
            );
            setFormLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
            router.push({
              pathname: `/dashboard/masters/products/add-product/${id}/`,
              query: { tab: 'vendors' },
            });
          }
        });
    }
    setFormLoading(false);
  };

  if (!id) {
    return (
      <Card className="p-2">
        <Card.Header className="pt-3 bg-transparent">
          <div className="d-flex justify-content-between">
            <h3 className="your-cart">
              Please add the product details
            </h3>
            <Button className="px-3 text-nowrap" onClick={() => router.push('/dashboard/masters/products')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </Card.Header>
      </Card>
    );
  }
  return (
    <Card className="p-2">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            Add Attributes
          </h3>
          <Button className=" px-3 text-nowrap" onClick={() => router.push('/dashboard/masters/products')}>
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
      <div>

        {attributes.length > 0 && attributes.map((attribute, index) => (

          <Card className="m-3">

            <Card.Body>
              <Row className='py-3'>
                <Form.Group as={Col} md={3} xs={12}>
                  <Form.Label className="form-required">Attribute Name</Form.Label>
                  <Form.Select
                    type="select"
                    name="attribute"
                    id="attribute"
                    value={attribute && attribute.attribute && attribute.attribute.id}
                    onChange={(e) => {
                      getAttributeOptions(e.target.value);
                      setAttributes(attributes.map((item, i) => (
                        i === index ? { ...item, attribute: e.target.value, errors: { ...item.errors, attribute: '', non_field_errors: '' } } : item
                      )));
                    }}
                    required
                    isInvalid={attribute.errors && !!attribute.errors.attribute}
                  >
                    <option value="">Select a Attribute</option>
                    {attributesData.length && attributesData.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {attribute.errors && attribute.errors.attribute }
                  </Form.Control.Feedback>
                  {attribute.errors && attribute.errors.non_field_errors ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {attribute.errors.non_field_errors}
                    </p>
                  ) : ''}
                </Form.Group>
                <Form.Group as={Col} md={3} xs={12}>
                  <Form.Label className="form-required">Attribute Options</Form.Label>
                  <Select
                    name="attribute_options"
                    defaultValue={attribute.attribute_options}
                    options={attributeOptions}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    isMulti
                    isLoading={optionsLoading}
                    closeMenuOnSelect={false}
                    isDisabled={!attribute.attribute}
                    isSearchable
                    onChange={(e) => {
                      setAttributes(attributes.map((item, i) => (
                        i === index ? {
                          ...item,
                          attribute_options: e,
                          errors: {
                            ...item.errors,
                            attribute_options: '',
                          },
                        } : item
                      )));
                    }}
                  />
                  {attribute.errors ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {attribute.errors && attribute.errors.attribute_options}
                    </p>
                  ) : ''}
                </Form.Group>
                <Form.Group as={Col} md={3} xs={12}>
                  <Form.Label className="form-required">Sort Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="sort_order"
                    id="sort_order"
                    value={attribute.sort_order}
                    onChange={(e) => setAttributes(attributes.map((item, i) => (
                      i === index ? {
                        ...item, sort_order: e.target.value, errors: { ...item.errors, sort_order: '' },
                      } : item
                    )))}
                    required
                    isInvalid={attribute.errors && !!attribute.errors.sort_order}
                  />
                  <Form.Control.Feedback type="invalid">
                    {attribute.errors && attribute.errors.sort_order}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md={2} xs={12} controlId="formBasicCheckbox">
                  <Form.Check
                    name="verified"
                    id="verified"
                    checked={attribute.verified}
                    onChange={(e) => setAttributes(attributes.map((item, i) => (
                      i === index ? {
                        ...item, verified: e.target.checked, errors: { ...item.errors, verified: '' },
                      } : item
                    )))}
                    type="checkbox"
                    label="Verified"
                  />
                </Form.Group>

                <Form.Group as={Col} md={1} xs={12} className='text-end pt-4'>

                  {
                          attribute.id ? (
                            <FontAwesomeIcon icon={faTrash} size={20}
                              className="text-danger cursor-pointer"
                              onClick={() => { setEditData(attribute); setShowDeleteModal(true); }}
                            />

                          ) : (
                            <MinusCircle
                              size={20} className="text-danger cursor-pointer"
                              onClick={() => setAttributes(attributes.filter(
                                (_, i) => i !== index,
                              ))}
                            />
                          )
                        }

                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

        ))}
      </div>
      <Row className="my-3">
       
        <Col md={12} className="text-start  px-4">
          <Button
            variant="primary"
            type="button"
            className="btn btn-success  mb-2 text-nowrap"
            onClick={() => setAttributes((prevState) => [...prevState, {
              attribute: null,
              attribute_options: null,
              sort_order: null,
              verified: false,
              errors: {},
            }])}
          >
            {' '}
            <FontAwesomeIcon icon={faPlus} className="mt-1 mx-2" />
            Add Attributes
          </Button>
        </Col>
      </Row>
      <div className="pagenation-style">
        <Button variant="danger" className="me-2  px-3 mb-3" onClick={() => router.push('/dashboard/masters/products')}>
          <FontAwesomeIcon icon={faTimes} />
          {' '}
          Cancel
        </Button>
        {
                id ? (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success  px-3 px-3 mb-3 mx-3"
                    onClick={() => onSubmit()}
                    disabled={!attributes.length}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    {' '}
&nbsp;
                    {
                      formLoading ? (
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
                    className="btn btn-success  px-3"
                    onClick={() => onSubmit()}
                    disabled={!attributes.length}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCheck} />
                    {' '}
&nbsp;
                    {
                      formLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : 'Submit'
                    }
                  </Button>
                )
      }
      </div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => {
          setShowDeleteModal(false);
          getProductDetails();
          getCategoryDetails();
        }}
        id={editData.id}
        title={editData.name}
        type="attribute"
        deleteService={
         () => deleteProductAttributeService(accessToken, id, editData.id)
        }
      />
    </Card>
  );
}
