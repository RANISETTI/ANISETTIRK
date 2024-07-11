import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { addCategoryDocuments, createDocumentTypeService, getServices, patchCategoryDocuments } from '../../../../services/dashboard/masters';

export default function AddCategoryDocument() {

const {
        accessToken,
        userDetails: { type, organization },
        userDetails,
      } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { id: documentId } } = router;

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubcategoryData] = useState([]);
  const [documentTypes,setDocumentTypes]=useState([]);
  const [categoryDocument, setCategoryDocument] = useState({
    sub_category: {},
    document_types:[],
  });
  const [applicationErrors, setApplicationErrors] = useState({})
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = (search) => {
    setFormLoading(true);
    getServices(accessToken, `/procurement/categories/?search=${search || ''}`).then(({ data }) => {
      if (data) {
        setCategoryData(data.results);
        if (documentId) {
getServices(accessToken, `/admin/category/required/documents/${documentId}/`).then(({ data : empanelmentData}) => {
      if (empanelmentData) {
        console.log('data: ', data.results.filter(item => item.id === empanelmentData.category.parent)[0]);
        setCategoryDocument({
          category: data.results.filter(item => item.id === empanelmentData.category.parent)[0],
          sub_category: empanelmentData.category,
          document_types: empanelmentData.document_types,
        });
      }
      })
        }

      }
    }).finally(() => setFormLoading(false))
  };


  const getSubCategories = (id) => {
    if (id) {
      getServices(accessToken, `/procurement/categories/${id}/`).then(({ data }) => {
        if (data) {
          setSubcategoryData(data.children);
        }
      });
    } else {
      setSubcategoryData([]);
    }
  }

  const getDocuments = (search) => {
    getServices(accessToken, `/admin/category/document/types/?search=${search}`).then(({ data }) => {
      if (data) {
        setDocumentTypes(data);
      }
    });
  };



  useEffect(() =>{
        getCategories('');
    getDocuments('');

  }, [])

  const createDeviceType = (item) => {
    setFormLoading(true);
    createDocumentTypeService(accessToken, {name:item}).then((res) => {
        if (res.errors) {
          setErrorMessage(res.errors);
        }
        if (res.data) {
          const { data } = res;
          setCategoryDocument((prevState) => (
            {
              ...prevState,
              document_types: data,
            }));
          getDocuments();
        }
      });
  }

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new  FormData();
    formData.append('category',categoryDocument.sub_category ?  categoryDocument.sub_category.id :'');
    if (categoryDocument.document_types.length >0) {
      categoryDocument.document_types.map(item =>  formData.append('document_types', item.id))
    }

    (documentId ? patchCategoryDocuments(accessToken, formData, documentId) :addCategoryDocuments(accessToken, formData)).then(({ data,errors }) => {
      if (data) {
        router.push(`/dashboard/masters/category-documents/`);
      } else{
         setApplicationErrors(errors)
      }
    }).finally((() =>  setIsLoading(false)))
  }

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }



    return(
        <Card className="pb-3">
            <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className=" float-end" onClick={() => router.push('/dashboard/masters/category-documents/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {documentId ? 'Edit' : 'Add'}
            {' '}
             Category Document
          </h3>
        </div>
      </Card.Header>

<Card.Body>
    <Row>
<Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Category</Form.Label>
                    <Select
                      name="category"
                isClearable
                isLoading={formLoading}
                      value={(documentId
                        && categoryDocument.category?.parent)
                        ? categoryDocument.category?.parent
                        : categoryDocument.category}
                      options={categoryData && categoryData}
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
                        setCategoryDocument({ ...categoryDocument, category: newValue, sub_category: '' });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                          getSubCategories(newValue.id);
                        } else if (action === 'clear') {
                          setCategoryDocument({ ...categoryDocument, category: '', sub_category: '' });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                          getSubCategories('');
                        }
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Sub Category</Form.Label>
                    <Select
                      name="sub_category"
                isClearable
                      isDisabled={!categoryDocument.category}
                      value={documentId &&  categoryDocument.sub_category}
                      options={subCategoryData.length ?subCategoryData:[]}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect
                      onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                        if (action === 'select-option' || action === 'remove-value') {
                          console.log('newValue: ', newValue);
                          setCategoryDocument({ ...categoryDocument, sub_category: newValue });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                        } else if (action === 'clear') {
                          setCategoryDocument({ ...categoryDocument, sub_category: '' });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                        }
                      }}
                    />
                    {applicationErrors.category && (
                      <p style={{ color: '#dc3545' }}>
                        {applicationErrors.category}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Document type</Form.Label>
                    <CreatableSelect
                      name="document_types"
                      isClearable
                      value={(documentId && categoryDocument.document_types) && categoryDocument.document_types}
                      options={documentTypes.length ? documentTypes:[]}
                      getOptionLabel={(options) => options.name || options.label}
                          getOptionValue={(options) => options.id || options.value}
                      // isSearchable
                      // closeMenuOnSelect
                      isMulti
                      onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                        if (action === 'create-option') {
                              if (actionMeta.option) {
                                createDeviceType(actionMeta.option.label);
                              }
                            }
                       else  if (action === 'select-option' || action === 'remove-value') {
                          setCategoryDocument({ ...categoryDocument, document_types: newValue });
                          setApplicationErrors({ ...applicationErrors, document_types: '' });
                        } else if (action === 'clear') {
                          setCategoryDocument({ ...categoryDocument, document_types: '' });
                          setApplicationErrors({ ...applicationErrors, document_types: '' });
                        }
                      }}
                    />
                    {applicationErrors.document_types && (
                      <p style={{ color: '#dc3545' }}>
                        {applicationErrors.document_types}
                      </p>
                    )}
            </Form.Group>
             {/* <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Security Deposit Amount	</Form.Label>
            <Form.Control
              type="text"
              name="sd_amount"
              id="sd_amount"
              value={categoryDocument.sd_amount}
              onChange={() => {
                  setCategoryDocument({ ...categoryDocument, sd_amount: newValue });
                          setApplicationErrors({ ...applicationErrors, sd_amount: '' });
                }}
              placeholder="Enter Price"
              required
              isInvalid={!!applicationErrors.sd_amount}
            />
            <Form.Control.Feedback type="invalid">
              {applicationErrors.sd_amount}
            </Form.Control.Feedback>
            </Form.Group>
             <Form.Group as={Col} className="mb-3">
            <Form.Label className="form-required">Processing fee</Form.Label>
            <Form.Control
              type="text"
              name="processing_fee"
              id="processing_fee"
              value={categoryDocument.processing_fee}
              onChange={onchange}
              placeholder="Enter Price"
              required
              isInvalid={!!applicationErrors.processing_fee}
            />
            <Form.Control.Feedback type="invalid">
              {applicationErrors.processing_fee}
            </Form.Control.Feedback>
          </Form.Group> */}
            {applicationErrors.non_field_errors && (
                      <p style={{ color: '#dc3545' }}>
                        {applicationErrors.non_field_errors}
                      </p>
                    )}
                </Row>

        </Card.Body>
         <div className="pagenation-style px-3">
              <Button className="me-2  px-3" onClick={() => router.push('/dashboard/masters/category-documents/')} variant="danger">
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
              <Button variant="success" className="btn btn-success  px-3" onClick={() => onSubmit()}>
                <FontAwesomeIcon icon={faCheck} />
                {' '}
                Submit
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {applicationErrors.nonfield_errors}
            </Form.Control.Feedback>
        </Card>
    )
}
