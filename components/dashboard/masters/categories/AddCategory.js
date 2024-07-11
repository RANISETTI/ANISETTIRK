import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import { createCategoryService, deleteAttributeService, editCategoryService, getServices } from '../../../../services/dashboard/masters';
import { genericGetService } from '../../../../services/GenericService';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddCategory(props) {
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [isProductsAllowed, setIsProductsAllowed] = useState(true);

  const [categeoryId, setCategeoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [categeoryErrors, setCategeoryErrors] = useState([]);
  const [attachmentCall, setAttachmentCall] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [createdTenderId, setCreatedTenderId] = useState();
  const [attributeFields, setAttributeFields] = useState(
    [
      {
        name: '',
        sortOrder: '',
        isMandatory: false,
        errors: {},
      },
    ],
  );

  const { action } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [sdAmount, setSdAmount] = useState();
  const [processingFee, setProcessingFee] = useState('');
  const { handleSubmit } = useForm();

  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;
  const { query: { id } } = router;

  const getCategories = (search) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories?search=${search}`)
      .then(({
        data,
      }) => {
        setCategories(data.results);
      }).finally(() => setIsLoading(false))
  };

  const getCategoryDetails = () => {
    genericGetService(`/admin/categories/${id}/`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          const {
            name, parent, seoTitle, seoDescription, seoKeywords,
            isProductsAllowed, sortOrder, isMandatory,securityDeposit
,processingFee
          } = data;
          console.log('data: ', data);
          setCategeoryId(id);
          setName(name);
          if (parent) {
          setParent(parent);
          }
          setSeoTitle(seoTitle);
          setProcessingFee(processingFee);
          setSdAmount(securityDeposit);
          setSeoDescription(seoDescription);
          setSeoKeywords(seoKeywords);
          setSeoDescription(seoDescription);
          setIsProductsAllowed(isProductsAllowed);
        }
      });
  };

  const getAttributes = () => {
    genericGetService(`/admin/categories/${id}/attributes/`, headers)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          setFormLoading(false);
        } else {
          setAttributeFields(data.results);
          setFormLoading(false);
        }
      });
  };

  useEffect(() => {
    getCategories('');
    getCategoryDetails();
    if (action === 'edit') {
      getAttributes();
    }
  }, []);


  const onSubmit = () => {
    setFormLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('parent', parent.id || '');
    formData.append('seo_title', seoTitle);
    formData.append('seo_description', seoDescription);
    formData.append('seo_keywords', seoKeywords);
    formData.append('security_deposit', sdAmount);
    formData.append('processing_fee', processingFee);
    formData.append('is_products_allowed', isProductsAllowed);

    if (action === 'edit') {
      editCategoryService(categeoryId, formData, headers)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setCategeoryErrors(addErrors);
            setFormLoading(false);
          } else if (data) {
            setCategeoryId(data.id);
            setFormLoading(false);
            router.push('/dashboard/masters/categories');
          }
        });
    } else {
      createCategoryService(formData, headers)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setCategeoryErrors(addErrors);
            setFormLoading(false);
          } else if (data) {
            setCategeoryId(data.id);
            setFormLoading(false);
            router.push('/dashboard/masters/categories');
          }
        });
    }
  };

  if (formLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={editData.id}
        title={editData.name}
        type="attribute"
        deleteService={
          () => deleteAttributeService(accessToken, categeoryId, editData.id)
        }
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="d-flex justify-content-between">
            <h3 className="your-cart">
              {action ? 'Edit' : 'Add'}
              {' '}
              Category
            </h3>
            <Button className="px-3" onClick={() => router.push('/dashboard/masters/categories')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form
            onSubmit={attachmentCall ? handleSubmit(onSubmitAttachment)
              : handleSubmit(onSubmit)}
            noValidate
          >
            <Row xs={1} md={2}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label className="form-required">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setCategeoryErrors({ ...categeoryErrors, name: '' });
                  }}
                  placeholder="Enter Name"
                  required
                  isInvalid={!!categeoryErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {categeoryErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label className="form">Parent</Form.Label>
                 <Select
                      name="category"
                isClearable
                      isLoading={isLoading}
                      value={parent}
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
                        setParent(newValue);
                    setCategeoryErrors({ ...categeoryErrors, parent: '' });
                        } else if (action === 'clear') {
                          setParent('');
                    setCategeoryErrors({ ...categeoryErrors, parent: '' });
                        }
                      }}
                    />
                {/* <Form.Select
                  id="parent"
                  name="parent"
                  value={parent}
                  onChange={(e) => {
                    setParent(e.target.value);
                    setCategeoryErrors({ ...categeoryErrors, parent: '' });
                  }}
                  required
                  isInvalid={!!categeoryErrors.parent}
                >
                  <option value="">Select a Parent</option>
                  {categories.length && categories.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}
                    </option>
                  ))}
                </Form.Select> */}
                <Form.Control.Feedback type="invalid">
                  {categeoryErrors.parent}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group as={Col} className="mb-3">
                <Form.Label className="form">SEO Title</Form.Label>
                <Form.Control
                  type="text"
                  name="seo_title"
                  id="seo_title"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setCategeoryErrors({ ...categeoryErrors, seo_title: '' });
                  }}
                  placeholder="Enter Seo Title"
                  isInvalid={!!categeoryErrors.seo_title}
                />
                <Form.Control.Feedback type="invalid">
                  {categeoryErrors.seo_title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label className="form">SEO Keywords</Form.Label>
                <Form.Control
                  type="text"
                  name="seo_keywords"
                  id="seo_keywords"
                  value={seoKeywords}
                  onChange={(e) => {
                    setSeoKeywords(e.target.value);
                    setCategeoryErrors({ ...categeoryErrors, seo_keywords: '' });
                  }}
                  placeholder="Enter Seo Keywords"
                  isInvalid={!!categeoryErrors.seo_keywords}
                />
                <Form.Control.Feedback type="invalid">
                  {categeoryErrors.seo_keywords}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Row>
            {/* <Form.Group as={Col} className="mb-3">
              <Form.Label className="form">SEO Description</Form.Label>
              <Form.Control
                type="textarea"
                as="textarea"
                name="seo_description"
                id="seo_description"
                value={seoDescription}
                onChange={(e) => {
                  setSeoDescription(e.target.value);
                  setCategeoryErrors({ ...categeoryErrors, seo_description: '' });
                }}
                placeholder="Enter Seo Description"
                isInvalid={!!categeoryErrors.seo_description}
              />
              <Form.Control.Feedback type="invalid">
                {categeoryErrors.seo_description}
              </Form.Control.Feedback>
            </Form.Group> */}
            <Row>
               <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Security Deposit Amount	<span>(in lacs)</span></Form.Label>
            <Form.Control
              type="text"
              name="security_deposit"
              id="security_deposit"
              value={sdAmount}
              onChange={(e) => {
                setSdAmount(e.target.value);
                setCategeoryErrors({
                  ...categeoryErrors, security_deposit:''})
                }}
              placeholder="Enter Security Deposit Amount	"
              required
              isInvalid={!!categeoryErrors.security_deposit}
            />
            <Form.Control.Feedback type="invalid">
              {categeoryErrors.security_deposit}
            </Form.Control.Feedback>
            </Form.Group>
             <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Processing fee (in Rs)</Form.Label>
            <Form.Control
              type="text"
              name="processing_fee"
              id="processing_fee"
              value={processingFee}
              onChange={(e) => {
                setProcessingFee(e.target.value);
                setCategeoryErrors({
                  ...categeoryErrors, processing_fee:''})
                }}
              placeholder="Enter Price"
              required
              isInvalid={!!categeoryErrors.processing_fee}
            />
            <Form.Control.Feedback type="invalid">
              {categeoryErrors.processing_fee}
            </Form.Control.Feedback>
          </Form.Group>
           </Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="is_products_allowed"
                id="is_products_allowed"
                checked={isProductsAllowed}
                onChange={() => setIsProductsAllowed(!isProductsAllowed)}
                type="checkbox"
                label="Is Products Allowed"
              />
            </Form.Group>
            {
             (categeoryErrors.non_field_errors)
              && (
              <p style={{
                color: '#d9534f', fontSize: '16px', fontWeight: '400', marginTop: '4px',
              }}
              >
                {' '}
                {categeoryErrors.non_fielde_rrors }
              </p>
              )
            }
            <div className="pagenation-style">
              <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/masters/categories')}>
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
              {
                id ? (
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success px-3"

                  > <FontAwesomeIcon icon={faCheck} /> &nbsp;
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
                    className="btn btn-success px-3"
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
          </Form>
        </Card.Body>
      </Card>

    </div>
  );
}
