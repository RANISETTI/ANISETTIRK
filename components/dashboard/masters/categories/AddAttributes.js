import {
  faChevronLeft, faPlus, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Container, Form, Spinner, Col, Row,
} from 'react-bootstrap';
import {
  MinusCircle, Trash2,
} from 'react-feather';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import {
  addAttributeOptionsService, createAttributeService, deleteAttributeOptionsService, editAttributeOptionsService, editAttributeService, getServices,
} from '../../../../services/dashboard/masters';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddAttribute() {
  const [attributes, setAttributes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState({});

  const [attributeErrors, setAttributeErrors] = useState([]);
  const [attributeFields, setAttributeFields] = useState(
    [{
      name: '',
      sort_order: '',
      dependent_on: [],
      errors: {},
    },
    ],
  );
  const [attribute, setAttribute] = useState(
    {
      name: '',
      sort_order: '',
      is_mandatory: true,
      dependent_on:[],
      errors: {},
    },
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formLoding, setFormLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;
  const { query: { categoryId, attributeId } } = router;

  const getAttributes = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories/${categoryId}/attributes/`).then(({ data, errors }) => {
      if (data) {
        setAttributes(data.results);
      } else {
        setAttributes([]);
      }
    }).finally(() => setIsLoading(false));
  };

  const getAttributeDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories/${categoryId}/attributes/${attributeId}/`).then(({ data, errors }) => {
      if (data) {
        setAttribute(data);
      } else {
        console.log(errors);
        setAttribute([]);
      }
    });
  };

  const getAttributeDropdownOptions = () => {
    const attributeIds = attribute.dependent_on && attribute.dependent_on.length && attribute.dependent_on.map((i) => i.id).join(',');
    setFormLoading(true);
    getServices(accessToken, `/procurement/attribute/options/?attribute_ids=${attributeIds || ''}`).then(({ data, errors }) => {
      if (data) {
        setAttributeOptions(data);
      } else {
        setAttributeOptions([]);
      }
    }).finally(() => setFormLoading(false));
  };

  const getAttributeOptions = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/attributes/${attributeId}/options/`).then(({ data, errors }) => {
      if (data) {
        setAttributeFields(data.results);
      } else {
        console.log(errors);
        setAttributeFields([]);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAttributes();
    if (attributeId) {
      getAttributeOptions();
      getAttributeDetails();
    }
  }, []);

  useEffect(() => {
    if (attribute.dependent_on && attribute.dependent_on.length) {
      getAttributeDropdownOptions();
    }
  }, [attribute.dependent_on]);

  const onSubmit = () => {
    setFormLoading(true);
    const attachmentFormData = new FormData();
    if (attribute.name) {
      attachmentFormData.append('name', attribute.name);
    } else {
      setAttribute({ ...attribute, errors: { name: 'Name is required' } });
    }
    attachmentFormData.append('is_mandatory', attribute.is_mandatory);
    attachmentFormData.append('sort_order', attribute.sort_order);
    if (attribute.dependent_on.length) {
      attribute.dependent_on.map((attributeItem) => attachmentFormData.append('dependent_on', attributeItem.id));
    }
    if (attribute.id) {
      editAttributeService(attachmentFormData, headers, categoryId, attribute.id)
        .then(({ data, errors }) => {
          if (errors) {
            setAttribute({ ...attribute, errors });
          } else if (data && attributeFields.length > 0) {
            onSubmitOptions(data.id);
          } else {
            router.push(`/dashboard/masters/categories/${categoryId}/attributes`);
          }
        }).finally(() => setFormLoading(false));
    } else {
      createAttributeService(attachmentFormData, headers, categoryId).then(({ data, errors }) => {
        if (errors) {
          setAttribute({ ...attribute, errors });
        } else if (data && attributeFields.length > 0) {
          onSubmitOptions(data.id);
          setAttribute({
            ...attribute,
            id: data.id,
          });
        } else {
          router.push(`/dashboard/masters/categories/${categoryId}/attributes`);
        }
      }).finally(() => setFormLoading(false));
    }
    setFormLoading(false);
  };

  const onSubmitOptions = (dataId) => {
    const Promises = [];
    setFormLoading(true);
    if (attributeFields.filter(
      (filterItem) => !filterItem.name || (filterItem.sort_order < 0) || (filterItem.sort_order === ''),
    ).length) {
      setAttributeFields(attributeFields.map((item) => {
        let newitem = item;
        if (!item.name) {
          newitem = { ...newitem, errors: { ...newitem.errors, name: 'Name is required' } };
        }
        if ((item.sort_order < 0) || (item.sort_order === '')) {
          newitem = { ...newitem, errors: { ...newitem.errors, sort_order: 'Sort order is required' } };
        }
        return newitem;
      }));
    } else {
      attributeFields.map((option) => {
        const formData = new FormData();
        formData.append('name', option.name);
        console.log('option.dependent_on', option.dependent_on);
        if (option.dependent_on && option.dependent_on.length) {
          option.dependent_on.map((dependentOption) => formData.append('dependent_on', dependentOption.id));
        }
        // else {
        //   formData.append(`dependent_on`, null);
        // }
        formData.append('sort_order', option.sort_order);
        if (option.id) {
          Promises.push(
            editAttributeOptionsService(formData, accessToken, attributeId, option.id),
          );
        } else {
          Promises.push(
            addAttributeOptionsService(formData, accessToken, dataId),
          );
        }
      });
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setAttributeFields(
              res.map((item, index) => {
                if (item.errors) {
                  return { ...attributeFields[index], errors: item.errors };
                }
                return attributeFields[index];
              }),
            );
            setFormLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
            router.push(`/dashboard/masters/categories/${categoryId}/attributes/`);
          }
        });
    }
    setFormLoading(false);
  };

  return (
    <div>
      <Card>
        <Card.Header className="pshsh-3 bg-transparent">
          <div className="d-flex justify-content-between">
            <h3 className="your-cart">
              {attributeId ? 'Edit' : 'Add'}
              {' '}
              Attribute
            </h3>
            <Button className=" px-3" onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes`)}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <Card.Body>
              <Form.Group className="mb-3 w-100 px-2">
                <Form.Label className="form-required">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  value={attribute.name}
                  onChange={(e) => setAttribute({ ...attribute, name: e.target.value, errors: { ...attribute.errors, name: '' } })}
                  required
                  isInvalid={attribute.errors && !!attribute.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {attribute.errors && attribute.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100 px-2">
                <Form.Label className="form-required">Sort Order</Form.Label>
                <Form.Control
                  type="number"
                  name="sort_order"
                  id="sort_order"
                  min="0"
                  value={attribute.sort_order}
                  onChange={(e) => setAttribute({
                    ...attribute,
                    sort_order: e.target.value,
                    errors: { ...attribute.errors, sort_order: '' },
                  })}
                  required
                  isInvalid={attribute.errors && !!attribute.errors.sort_order}
                />
                <Form.Control.Feedback type="invalid">
                  {attribute.errors && attribute.errors.sort_order}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 w-100 px-2">
                <Form.Label className="form-required">Attribute Dependent On</Form.Label>

                <Select
                  name="dependent_on"
                  value={attribute.dependent_on}
                  options={attributes.length && attributes || []}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  isMulti
                  isSearchable
                  closeMenuOnSelect={false}
                  onChange={(e) => {
                    setAttribute({
                      ...attribute,
                      dependent_on: e,
                      errors: { ...attribute.errors, sort_order: '' },
                    });
                    // setAttributeFields(attributeFields.map((item, i) => (
                    //   { ...item, dependent_on: [] }
                    // )));
                  }}
                />
              </Form.Group>
              <Form.Group className="w-50 pt-3 px-2 my-auto" controlId="attachmentPublished">
                <Form.Check
                  type="checkbox"
                  label="Is Mandatory"
                  name="is_mandatory"
                  id="is_mandatory"
                  value={attribute.is_mandatory}
                  checked={attribute.is_mandatory}
                  onChange={(e) => setAttribute({ ...attribute, is_mandatory: e.target.checked })}
                  required
                />
              </Form.Group>
            </Card.Body>
          </div>
        </Card.Body>
        <div className="m-4">
          <h3 className="your-cart">
            {attributeId ? 'Edit' : 'Add'}
            {' ' }
            Attribute Options
          </h3>
        </div>

        <div style={{}}>
          {
                attributeFields.length > 0 && attributeFields.map((attribute, index) => (
                  <Card className="mx-4">
                    <Card.Body className="">
                      <Row>
                        <Form.Group className="mb-3 px-2" as={Col} md={4} xs={12}>
                          <Form.Label className="form-required">Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            id="name"
                            value={attribute.name}
                            onChange={(e) => setAttributeFields(attributeFields.map((item, i) => (
                              i === index ? { ...item, name: e.target.value, errors: { ...item.errors, name: '' } } : item
                            )))}
                            required
                            isInvalid={attribute.errors && !!attribute.errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {attribute.errors && attribute.errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-2" as={Col} md={4} xs={12}>
                          <Form.Label className="form-required">Sort Order</Form.Label>
                          <Form.Control
                            type="number"
                            name="sort_order"
                            id="sort_order"
                            value={attribute.sort_order}
                            onChange={(e) => setAttributeFields(attributeFields.map((item, i) => (
                              i === index ? { ...item, sort_order: e.target.value, errors: { ...item.errors, sort_order: '' } } : item
                            )))}
                            required
                            isInvalid={attribute.errors && !!attribute.errors.sort_order}
                          />
                          <Form.Control.Feedback type="invalid">
                            {attribute.errors && attribute.errors.sort_order}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 px-2" as={Col} md={3} xs={12}>
                          <Form.Label className="form-required">Dependant On</Form.Label>
                          <Select
                            name="dependent_on"
                            isLoading={formLoding}
                            value={attribute.dependent_on}
                            options={attributeOptions.length && attributeOptions}
                            getOptionLabel={(options) => options.name}
                            getOptionValue={(options) => options.id}
                            isMulti
                            isSearchable
                            closeMenuOnSelect={false}
                            onChange={(newValue) => {
                              console.log('newValue', newValue);
                              if (newValue.length) {
                                setAttributeFields((prevState) => prevState.map((item, i) => (
                                  i === index ? { ...item, dependent_on: newValue, errors: { ...item.errors, dependent_on: '' } } : item
                                )));
                              } else {
                                setAttributeFields((prevState) => prevState.map((item, i) => (
                                  i === index ? { ...item, dependent_on: [], errors: { ...item.errors, dependent_on: '' } } : item
                                )));
                              }
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mt-4 px-5" as={Col} md={1} xs={12}>
                          {
                          attribute.id ? (
                            <FontAwesomeIcon
                              icon={faTrash}
                              size={20}
                              className="text-danger cursor-pointer"
                              onClick={() => { setEditData(attribute); setShowDeleteModal(true); }}
                            />

                          ) : (
                            <MinusCircle
                              size={20}
                              className="text-danger cursor-pointer"
                              onClick={() => setAttributeFields(attributeFields.filter(
                                (_, i) => i !== index,
                              ))}
                            />
                          )
                        }
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
            }

        </div>

        <div className="text-start ms-4">
          <Button
            variant="primary"
            type="button"
            className="btn btn-success px-3 my-4 "
            onClick={() => setAttributeFields((prevState) => [...prevState, {
              name: '', file: null, isMandatory: false, errors: {}, sort_order: '',
            }])}
          >
            {' '}
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Attribute Options
          </Button>
        </div>
        <div className="pagenation-style me-3 mb-4">
          <Button variant="danger" className="me-2  px-3" onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes`)}>
            Cancel
          </Button>
          {
                categoryId ? (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success  px-3"
                    onClick={() => onSubmit()}
                  >
                    {
                      formLoding ? (
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
                  >
                    {
                      formLoding ? (
                        <Spinner animation="border" size="sm" />
                      ) : 'Submit'
                    }
                  </Button>
                )
              }
        </div>
      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={editData.id}
        title={editData.name}
        type="attribute option"
        deleteService={
          () => deleteAttributeOptionsService(accessToken, attributeId, editData.id)
        }
      />
    </div>
  );
}
