import {
  faCheck, faChevronLeft, faLink, faTimes, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner, Stack } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { MinusCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getServices, {
  addDocumentsCategoryService, addVendorCategoryServiceByVendor, addVendorEmpanelmentService, deleteDocumentsCategoryService, editDocumentsCategoryService, editVendorEmpanelmentService
} from '../../../../services/dashboard/vendorempannelment/vendorProductEmapanelment';
import Page404 from '../../../common/customerrorpages/Page404';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddVendorEmpanelmentList(props) {
  const {
    accessToken,
    userDetails: { type, organization },
    userDetails,
  } = useSelector((state) => state.user);

  const [otherDetails, setOtherDetails] = useState('');
  const [errors, setErrors] = useState();
  const [securityAuditErrors, setSecurityAuditErrors] = useState();
  const [quantity, setQuantity] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [vendorData, setVendorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubcategoryData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requiredDocument, setRequiredDocuments] = useState([]);
  const [editData, setEditData] = useState('');
  const { handleSubmit } = useForm();
  const [vendorEmpanelment, setVendorEmpanelment] = useState({
    sd_dd_no: '',
    sd_dd_date: null,
    sd_bank: '',
    sd_branch: '',
    sd_dd: '',
    sd_amount: null,
    dd: null,
    dd_no: '',
    dd_date: null,
    bank: '',
    branch: '',
    amount: '',
    remarks: '',
    maf: '',
    pts_receipt_no: '',
    receipt: null,
    receipt_date: null,
    approval_date: null,
    validity_date: null,
    mom_date: null,
    vendor: null,
    category: null,
    sub_category: '',
  });
  const [attachmentsFields, setAttachmentsFields] = useState(
    [
      {
        name: '',
        file: null,
        published: false,
        errors: {},
      },
    ],
  );
  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingFeePaymenttype, setProcessingFeePaymenttype] = useState('dd');
  const [securityPaymenttype, setSecurityPaymenttype] = useState('dd');

  const headers = getHeaders(accessToken);

  const { action } = props;

  const router = useRouter();

  const { query: { id: vendorEmapanelmentId } } = router;

  const getEmpanelmentCategoryDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/vendor/categories/${vendorEmapanelmentId}/`).then(({ data }) => {
      if (data) {
        setVendorEmpanelment(data);
        setVendorEmpanelment({ ...data, sub_category: data.category });
        setProcessingFeePaymenttype(data.dd_no ? 'dd' : '');
        setSecurityPaymenttype(data.sd_amount ? 'dd' : '');
        setIsLoading(false);
        getSubCategories(data.category.parent.id);
        getServices(accessToken, `/vendors/${data.vendor.id}/categories/${vendorEmapanelmentId}/documents/`).then(({ data }) => {
          if (data) {
            setAttachmentsFields(data);
          }
        });
      }
    });
  };
  const getVendors = (search) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/vendors/?is_verified=${true}&search=${search || ''}`).then(({ data }) => {
      if (data) {
        setVendorData(data.results);
        setIsLoading(false);
      }
    });
  };
  const getCategories = (search) => {
    getServices(accessToken, `/procurement/categories/?search=${search || ''}`).then(({ data }) => {
      if (data) {
        setCategoryData(data.results);
      }
    });
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

  const getDocuments = (catId) => {
    if (catId) {
      getServices(accessToken,`/categories/${catId}/required/documents` ).then(({ data }) => {
        if (data) {
          setRequiredDocuments(data);
        }else {
          console.log(errors)
          setRequiredDocuments([]);
        }
      });
    getServices(accessToken, `/procurement/categories/${catId}`).then(({ data }) => {
      if (data) {
 setVendorEmpanelment( prevState=> ({...prevState, sd_amount: data.security_deposit||'' ,amount : data.processing_fee || ''}));
      }
    })
    }
  }

   const getDetails = (id) => {

  };


  useEffect(() => {
    if (!(type === 'VENDOR')) {
      getVendors('');
    }
    getCategories('');
    if (vendorEmapanelmentId) {
      getEmpanelmentCategoryDetails();
    }
  }, []);

  function renderFileTypes(fileType) {
    switch (fileType) {
      case 'pdf': {
        return true;
      }
      case 'png': {
        return true;
      }
      case 'jpg': {
        return true;
      }
      case 'jpeg': {
        return true;
      }
      default:
        return false;
    }
  }

 console.log('applicationErrors: ', applicationErrors);

  const onSubmitAttachment = (dataId) => {
    const Promises = [];
    setIsLoading(true);
    if (attachmentsFields.filter(
      (filterItem) => !filterItem.document && !filterItem.file,
    ).length) {
      setAttachmentsFields(attachmentsFields.map((item) => {
        if (!item.document && !item.file) {
          return { ...item, errors: { document: 'Please select an attachment', name: 'Name is required' } };
        }
        return item;
      }));
    } else if (attachmentsFields.length === 0) {
      router.push('/dashboard/vendor-empanelment/empanelment-category-list/');
    } else {
      attachmentsFields.map((attachment) => {
        const attachmentFormData = new FormData();
        attachmentFormData.append('name', attachment.name);
        if (attachment.file) {
          attachmentFormData.append('document', attachment.file);
        }
        if (attachment.id) {
          Promises.push(
            editDocumentsCategoryService(accessToken, type !== 'VENDOR' ? vendorEmpanelment.vendor.id : organization.id, dataId, attachment.id, attachmentFormData),
          );
        } else {
          Promises.push(
            addDocumentsCategoryService(accessToken, type !== 'VENDOR' ? vendorEmpanelment.vendor.id : organization.id, dataId, attachmentFormData),
          );
        }
      }),
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setAttachmentsFields(
              res.map((item, index) => {
                console.log('item.errors: ', item.errors);
                // if (item.errors) {
                //   router.push(`/dashboard/vendor-empanelment/empanelment-category-list/edit-vendor-empanelment/${dataId}`);
                //   return { ...attachmentsFields[index], errors: item.errors };
                // }
                return attachmentsFields[index];
              }),
            );
            setIsLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
              router.push(`/dashboard/vendor-empanelment/empanelment-category-list`)
          }
        });
    }
    setIsLoading(false);
  };

  const onSubmit = () => {
    setIsLoading(true);
    const newVendorEmpanelment = vendorEmpanelment;
    const formData = new FormData();
    if (!(typeof newVendorEmpanelment.dd === 'string')) {
      formData.append('dd', newVendorEmpanelment.dd);
    }
    if (!(typeof newVendorEmpanelment.sd_dd === 'string')) {
      formData.append('sd_dd', newVendorEmpanelment.sd_dd);
    }

    formData.append('sd_dd_no', newVendorEmpanelment.sd_dd_no);
    formData.append('sd_dd_date', moment(newVendorEmpanelment.sd_dd_date).format('YYYY-MM-DD'));
    formData.append('sd_bank', newVendorEmpanelment.sd_bank);
    formData.append('sd_branch', newVendorEmpanelment.sd_branch);
    formData.append('sd_amount', newVendorEmpanelment.sd_amount);
    formData.append('dd_no', newVendorEmpanelment.dd_no);
    formData.append('dd_date', moment(newVendorEmpanelment.dd_date).format('YYYY-MM-DD'));
    formData.append('bank', newVendorEmpanelment.bank);
    formData.append('branch', newVendorEmpanelment.branch);
    formData.append('amount', newVendorEmpanelment.amount);
    formData.append('remarks', newVendorEmpanelment.remarks);
    formData.append('maf', newVendorEmpanelment.maf);
    formData.append('apts_receipt_no', newVendorEmpanelment.apts_receipt_no);

    formData.append('receipt_date', moment(newVendorEmpanelment.receipt_date).format('YYYY-MM-DD'));
    formData.append('approval_date', moment(newVendorEmpanelment.approval_date).format('YYYY-MM-DD'));
    formData.append('validity_date', moment(newVendorEmpanelment.validity_date).format('YYYY-MM-DD'));
    formData.append('mom_date', moment(newVendorEmpanelment.mom_date).format('YYYY-MM-DD'));
    formData.append('vendor', type === 'VENDOR' ? organization.id : newVendorEmpanelment.vendor ? newVendorEmpanelment.vendor.id : '');
    formData.append('category', newVendorEmpanelment.sub_category ? newVendorEmpanelment.sub_category && newVendorEmpanelment.sub_category.id : newVendorEmpanelment.category && newVendorEmpanelment.category.id || '');

    if (vendorEmapanelmentId) {
      editVendorEmpanelmentService(accessToken, vendorEmapanelmentId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setApplicationErrors(applyErrors);
          } else if (data) {
            onSubmitAttachment(vendorEmapanelmentId);
          }
        }).finally(() => setIsLoading(false));
    } else {
      (type === 'VENDOR' ? addVendorCategoryServiceByVendor(accessToken, organization.id, formData) : addVendorEmpanelmentService(accessToken, formData)).then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          setApplicationErrors(applyErrors);
        } else if (data) {
          console.log('file: AddVendorEmpanelment.js ~ line 245 ~ data', data);
          setVendorEmpanelment(data);
          onSubmitAttachment(data.id);
        }
      }).finally(() => setIsLoading(false));
    }
  };

  const deleteDocument = () => {
    deleteDocumentsCategoryService(
      accessToken,
      vendorEmpanelment.vendor.id,
      vendorEmapanelmentId,
      editData.id,
    ).then(({ data, errors: deleteErrors }) => {
      if (deleteErrors && Object.keys(deleteErrors).length) {
        console.log('Delete Errors', deleteErrors);
      } else {
        getEmpanelmentCategoryDetails();
        setIsLoading(false);
        setShowDeleteModal(false);
      }
    });
  };

  if (errors) {
    return (
      <Page404 errors={errors.nonFieldErrors} />
    );
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
  const onChange = (e) => {
    setVendorEmpanelment({ ...vendorEmpanelment, [e.target.name]: e.target.value });
    setApplicationErrors({ ...applicationErrors, [e.target.name]: '' });
  };

  const paymentTypes = [
    {
      id: 1,
      value: 'dd',
      name: 'DD',
    },
    {
      id: 2,
      value: 'online',
      name: 'Online',
    },
  ];
  return (
    <Card className="pb-3">
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        data={editData}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        handleDelete={() => deleteDocument()}
      />
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button className=" float-end" onClick={() => router.push('/dashboard/vendor-empanelment/empanelment-category-list/')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
          <h3 className="your-cart">
            {vendorEmapanelmentId ? 'Edit' : 'Add'}
            {' '}
            Empanelment Category
          </h3>
        </div>
      </Card.Header>
      <Card.Body className="p-0 mt-3">
        <Form noValidate>
          <Stack gap={2}>
            <Card className="mx-3">
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Vendor</Form.Label>
                    <Select
                      name="vendor"
                      isClearable
                      isDisabled={type === 'VENDOR'}
                      value={type === 'VENDOR' ? organization : vendorEmpanelment.vendor}
                      options={vendorData.length && vendorData}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect

                      onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                        if (action === 'select-option' || action === 'remove-value') {
                          setVendorEmpanelment({ ...vendorEmpanelment, vendor: newValue });
                          setApplicationErrors({ ...applicationErrors, vendor: '' });
                        } else if (action === 'clear') {
                          setVendorEmpanelment({ ...vendorEmpanelment, vendor: '' });
                          setApplicationErrors({ ...applicationErrors, vendor: '' });
                        }
                      }}
                    />
                    {applicationErrors.vendor && (
                      <p style={{ color: '#dc3545' }}>
                        {applicationErrors.vendor}
                      </p>
                    )}
                    {applicationErrors.non_field_errors ? (
              <p style={{ color: '#dc3545', fontSize: '14px' }}>
                {applicationErrors.non_field_errors}
              </p>
            ) : ''}

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Category</Form.Label>
                    <Select
                      name="category"
                      isClearable
                      value={(vendorEmapanelmentId
                        && vendorEmpanelment.category?.parent)
                        ? vendorEmpanelment.category.parent
                        : vendorEmpanelment.category}
                      options={categoryData.length && categoryData}
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
                          setVendorEmpanelment({ ...vendorEmpanelment, category: newValue, sub_category: '' });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                          getSubCategories(newValue.id);
                        } else if (action === 'clear') {
                          setVendorEmpanelment({ ...vendorEmpanelment, category: '', sub_category: '' });
                          setApplicationErrors({ ...applicationErrors, category: '' });
                            getCategories('');
                          getSubCategories('');
                        }
                      }}
                    />
                    {applicationErrors.category && (
                      <p style={{ color: '#dc3545' }}>
                        {applicationErrors.category}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Sub Category</Form.Label>
                    <Select
                      name="sub_category"
                      isClearable
                      isDisabled={!vendorEmpanelment.category}
                      value={vendorEmpanelment.sub_category}
                      options={subCategoryData.length ?subCategoryData:[]}
                      getOptionLabel={(options) => options.name}
                      getOptionValue={(options) => options.id}
                      isSearchable
                      closeMenuOnSelect
                      onChange={(newValue, actionMeta) => {
                        const { action } = actionMeta;
                        if (action === 'select-option' || action === 'remove-value') {
                          setVendorEmpanelment({ ...vendorEmpanelment, sub_category: newValue });
                        getDocuments(newValue.id);
                          setApplicationErrors({ ...applicationErrors, category: '' });
                        } else if (action === 'clear') {
                          setVendorEmpanelment({ ...vendorEmpanelment, sub_category: '' });
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
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent mt-0">
                Security Deposit
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Payment Type</Form.Label>
                    <Form.Select
                      name="securityPaymenttype"
                      id="securityPaymenttype"
                      value={securityPaymenttype}
                      onChange={(e) => setSecurityPaymenttype(e.target.value)}
                      isInvalid={!!applicationErrors.payment_type}
                      required
                      disabled
                    >
                      <option value="">Select a payment type</option>
                      {paymentTypes.map((option) => (
                        <option value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.application_type}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {securityPaymenttype === 'dd' && (
                  <>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label className="my-2">DD No</Form.Label>
                      <Form.Control
                        name="sd_dd_no"
                        id="sd_dd_no"
                        placeholder="Enter DD No"
                        onChange={onChange}
                        required
                        value={vendorEmpanelment.sd_dd_no}
                        isInvalid={!!applicationErrors.sd_dd_no}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_dd_no}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label className="form-required my-2">DD Date</Form.Label>
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select DD Date"
                        selected={vendorEmpanelment.sd_dd_date
                          ? new Date(vendorEmpanelment.sd_dd_date) : null}
                        value={vendorEmpanelment.sd_dd_date}
                        onChange={(date) => {
                          setVendorEmpanelment({ ...vendorEmpanelment, sd_dd_date: date });
                          setApplicationErrors({ ...applicationErrors, sd_dd_date: '' });
                        }}
                        className="date-picker-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_dd_date}
                      </Form.Control.Feedback>
                      {
                      applicationErrors.sd_dd_date ?  <p variant={'danger'} className='text-danger text-sm'> {applicationErrors.sd_dd_date}</p> : ''
                    }
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                      <Form.Label className="my-2">Bank</Form.Label>
                      <Form.Control
                        name="sd_bank"
                        id="sd_bank"
                        placeholder="Enter Bank Name"
                        onChange={onChange}
                        required
                        value={vendorEmpanelment.sd_bank}
                        isInvalid={!!applicationErrors.sd_bank}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_bank}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={3}>
                      <Form.Label className="form my-2">Branch</Form.Label>
                      <Form.Control
                        name="sd_branch"
                        id="sd_branch"
                        placeholder="Enter Branch"
                        onChange={onChange}
                        required
                        value={vendorEmpanelment.sd_branch}
                        isInvalid={!!applicationErrors.sd_branch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_branch}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={3}>
                      <Form.Label className="form-required my-2">Amount (in Lacs)</Form.Label>
                      <Form.Control
                        name="sd_amount"
                        id="sd_amount"
                        placeholder="Enter Amount"
                        onChange={onChange}
                          required
                          disabled
                        value={vendorEmpanelment.sd_amount}
                        isInvalid={!!applicationErrors.sd_amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_amount}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="formFile">
                      <Form.Label className="form-required my-2">Security Deposit DD</Form.Label>
                      <span>(pdf/png/jpg/jpeg)</span>
                      {vendorEmapanelmentId && (
                      <span>
                        {' '}
                        (
                          {(typeof vendorEmpanelment.sd_dd === 'string') && vendorEmpanelment.sd_dd.split('/').pop()}
                        )
                      </span>
                      )}
                      <Form.Control
                        type="file"
                        name="sd_dd"
                        onChange={(e) => {
                          setVendorEmpanelment({ ...vendorEmpanelment, sd_dd: e.target.files[0] });
                          const fileType = e.target.files[0].name.split('.').pop();
                          if (renderFileTypes(fileType)) {
                            setApplicationErrors({ ...applicationErrors, sd_dd: '' });
                          } else {
                            setApplicationErrors({ ...applicationErrors, sd_dd: 'Please select a Valid File type (pdf/png/jpg/jpeg)' });
                          }
                        }}
                        isInvalid={!!applicationErrors.sd_dd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicationErrors.sd_dd}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                  )}
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent mt-0">
                Processing Fee
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2"> Processing Fee Payment Type</Form.Label>
                    <Form.Select
                      name="processingFeePaymenttype"
                      id="processingFeePaymenttype"
                      value={processingFeePaymenttype}
                      onChange={(e) => setProcessingFeePaymenttype(e.target.value)}
                      isInvalid={!!applicationErrors.processing_fee_payment_type}
                      required
                      disabled
                    >
                      <option value="">Select a payment type</option>
                      {paymentTypes.map((option) => (
                        <option value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.processing_fee_payment_type}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {processingFeePaymenttype === 'dd' && (
                    <>
                      <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label className="form-required my-2">Processing Fee DD No</Form.Label>
                        <Form.Control
                          name="dd_no"
                          id="dd_no"
                          placeholder="Enter DD No"
                          onChange={onChange}
                          required
                          value={vendorEmpanelment.dd_no}
                          isInvalid={!!applicationErrors.dd_no}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.dd_no}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label className="form-required my-2">DD Date</Form.Label>
                        <DatePicker
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select DD Date"
                          selected={vendorEmpanelment.dd_date
                            ? new Date(vendorEmpanelment.dd_date) : null}
                          value={vendorEmpanelment.dd_date}
                          onChange={(date) => {
                            setVendorEmpanelment({ ...vendorEmpanelment, dd_date: date });
                            setApplicationErrors({ ...applicationErrors, dd_date: '' });
                          }}
                          className="date-picker-input"
                        />
                         {
                      applicationErrors.dd_date ?  <p variant={'danger'} className='text-danger text-sm'> {applicationErrors.dd_date}</p> : ''
                    }

                      </Form.Group>
                      <Form.Group as={Col} xs={12} md={6}>
                        <Form.Label className="form-required my-2">Bank</Form.Label>
                        <Form.Control
                          name="bank"
                          id="bank"
                          placeholder="Enter Bank Name"
                          onChange={onChange}
                          required
                          value={vendorEmpanelment.bank}
                          isInvalid={!!applicationErrors.bank}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.bank}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} md={3}>
                        <Form.Label className="form my-2">Branch</Form.Label>
                        <Form.Control
                          name="branch"
                          id="branch"
                          placeholder="Enter Branch"
                          onChange={onChange}
                          required
                          value={vendorEmpanelment.branch}
                          isInvalid={!!applicationErrors.branch}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.branch}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} md={3}>
                        <Form.Label className="form-required my-2">Amount (in Rs)</Form.Label>
                        <Form.Control
                          name="amount"
                          id="amount"
                          placeholder="Enter Amount"
                          onChange={onChange}
                          required
                          disabled
                          value={vendorEmpanelment.amount}
                          isInvalid={!!applicationErrors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.amount}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} md={6} controlId="formFile">
                        <Form.Label className="form-required my-2">Processing Fee DD </Form.Label>
                        <span>(pdf/png/jpg/jpeg)</span>
                        {vendorEmapanelmentId && (
                        <span>
                          {' '}
                          (
                          {(typeof vendorEmpanelment.dd === 'string') && vendorEmpanelment.dd.split('/').pop()}
                          )
                        </span>
                        )}
                        <Form.Control
                          type="file"
                          name="dd"
                          onChange={(e) => {
                            setVendorEmpanelment({ ...vendorEmpanelment, dd: e.target.files[0] });
                            const fileType = e.target.files[0].name.split('.').pop();
                            if (renderFileTypes(fileType)) {
                              setApplicationErrors({ ...applicationErrors, dd: '' });
                            } else {
                              setApplicationErrors({ ...applicationErrors, dd: 'Please select a Valid File type (pdf/png/jpg/jpeg)' });
                            }
                          }}
                          isInvalid={!!applicationErrors.dd}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicationErrors.dd}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  )}
                </Row>
              </Card.Body>
            </Card>
            {/* <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent mt-3">
                Upload Documents
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  {securityPaymenttype === 'dd' && (

                  )}
                  <Form.Group as={Col} xs={12} md={6} controlId="formFile" className="mb-3">
                    <Form.Label className="form-required">APTS Receipt</Form.Label>
                    {vendorEmapanelmentId && (
                      <span>
                        {' '}
                        (
                        {(typeof vendorEmpanelment.receipt === 'string') && vendorEmpanelment.receipt.split('/').pop()}
                        )
                      </span>
                    )}
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(e) => {
                        setVendorEmpanelment({ ...vendorEmpanelment, receipt: e.target.files[0] });
                        setApplicationErrors({ ...applicationErrors, receipt: '' });
                      }}
                      isInvalid={!!applicationErrors.receipt}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.receipt}
                    </Form.Control.Feedback>
                  </Form.Group>

                </Row>
              </Card.Body>
            </Card> */}
            <Card className="mx-3">
              <Card.Header className="vender-text bg-transparent mt-0">
                APTS Details
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Remarks</Form.Label>
                    <Form.Control
                      name="remarks"
                      id="remarks"
                      as="textarea"
                      placeholder="Enter Remarks"
                      onChange={onChange}
                      required
                      value={vendorEmpanelment.remarks}
                      isInvalid={!!applicationErrors.remarks}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.remarks}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">MAF</Form.Label>
                    <Form.Control
                      name="maf"
                      id="maf"
                      as="textarea"
                      placeholder="Enter MAF"
                      onChange={onChange}
                      required
                      value={vendorEmpanelment.maf}
                      isInvalid={!!applicationErrors.maf}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.maf}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">APTS Receipt No</Form.Label>
                    <Form.Control
                      name="apts_receipt_no"
                      id="apts_receipt_no"
                      placeholder="Enter APTS Receipt No"
                      onChange={onChange}
                      required
                      value={vendorEmpanelment.apts_receipt_no}
                      isInvalid={!!applicationErrors.apts_receipt_no}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.apts_receipt_no}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label className="form-required my-2">Receipt Date</Form.Label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Receipt Date"
                      selected={vendorEmpanelment.receipt_date
                        ? new Date(vendorEmpanelment.receipt_date) : null}
                      value={vendorEmpanelment.receipt_date}
                      onChange={(date) => {
                        setVendorEmpanelment({ ...vendorEmpanelment, receipt_date: date });
                        setApplicationErrors({ ...applicationErrors, receipt_date: '' });
                      }}
                      className="date-picker-input"
                      isInvalid={!!applicationErrors.receipt_date}
                    />
                     {
                      applicationErrors.receipt_date ?  <p variant={'danger'} className='text-danger text-sm'> {applicationErrors.receipt_date}</p> : ''
                    }

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Approval Date</Form.Label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Approval Date"
                      selected={vendorEmpanelment.approval_date
                        ? new Date(vendorEmpanelment.approval_date) : null}
                      value={vendorEmpanelment.approval_date}
                      onChange={(date) => {
                        setVendorEmpanelment({ ...vendorEmpanelment, approval_date: date });
                        setApplicationErrors({ ...applicationErrors, approval_date: '' });
                      }}
                      className="date-picker-input"
                    />
                    {
                      applicationErrors.approval_date ?  <p variant={'danger'} className='text-danger text-sm'> {applicationErrors.approval_date}</p> : ''
                    }

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">Validity  Date</Form.Label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Validity Date"
                      selected={vendorEmpanelment.validity_date
                        ? new Date(vendorEmpanelment.validity_date) : null}
                      value={vendorEmpanelment.validity_date}
                      onChange={(date) => {
                        setVendorEmpanelment({ ...vendorEmpanelment, validity_date: date });
                        setApplicationErrors({ ...applicationErrors, validity_date: '' });
                      }}
                      className="date-picker-input"
                    />
                     {
                      applicationErrors.validity_date ?  <p className='text-danger text-sm'> {applicationErrors.validity_date}</p> : ''
                    }
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">MOM Date</Form.Label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText="MOM Date"
                      selected={vendorEmpanelment.mom_date
                        ? new Date(vendorEmpanelment.mom_date) : null}
                      value={vendorEmpanelment.mom_date}
                      onChange={(date) => {
                        setVendorEmpanelment({ ...vendorEmpanelment, mom_date: date });
                        setApplicationErrors({ ...applicationErrors, mom_date: '' });
                      }}
                      className="date-picker-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicationErrors.mom_date}
                    </Form.Control.Feedback>
                    {
                      applicationErrors.mom_date ?  <p variant={'danger'} className='text-danger text-sm'> {applicationErrors.mom_date}</p> : ''
                    }

                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mx-3">
              <div className='d-flex justify-content-start align-items-center mx-3 my-3'>
              <p className="vender-text bg-transparent">
                Documents
              </p>
              <p className='text-center mx-2'>(pdf/png/jpg/jpeg)</p>
              </div>
              <Card.Body>
              {
              requiredDocument.length >0 ?
              <Alert variant="info" >
                <div>
      <p className='fs-5 text-bold text-secondary'>Required Documents</p>
      {
        requiredDocument.map((item,index) =>(
          <p className="mb-2">{index+ 1} . {item.name}
      </p>
        )
        )
      }
      </div>
    </Alert>
              :null
            }
                <div style={{}}>
                  {
                attachmentsFields && attachmentsFields.map((attachment, index) => (
                  <Card style={{}}>
                    <Card.Body className="pt-3">
                      <Row>
                        <Col xs={12} md={5}>
                          <Form.Group className="mb-3 px-2">
                            <Form.Label className="form-required">Attachment Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              id="name"
                              value={attachment.name}
                              onChange={(e) => setAttachmentsFields(attachmentsFields.map((item, i) => (
                                i === index ? { ...item, name: e.target.value, errors: { ...item.errors, name: '' } } : item
                              )))}
                              required
                              isInvalid={attachment.errors && !!attachment.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {attachment.errors && attachment.errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={5}>
                          <Form.Group controlId="formFile" className="mb-3 px-2">
                            <Form.Label className="form-required me-3">
                              Document
                              {' '}
                            </Form.Label>

                            {
                              attachment.document && (
                                <Link href={attachment.document}>
                                  <a target="_blank">
                                    (
                                    {' '}
                                    {attachment.document.split('/').pop()}
                                    {' '}
                                    )
                                  </a>
                                </Link>

                              )
                            }
                            <Form.Control
                              type="file"
                              name="attachmentFile"
                              onChange={(e) => {
                                const fileType = e.target.files[0].name.split('.').pop();

                                setAttachmentsFields(attachmentsFields.map((item, i) => (
                                i === index ? {
                                  ...item,
                                  file: e.target.files[0],
                                  errors: { ...item.errors,document: renderFileTypes(fileType) ?  '' :'Please select a Valid File type (pdf/png/jpg/jpeg)'}
                                } : item
                              )))
                              }}
                              isInvalid={(attachment.errors && !!attachment.errors.document) || (attachment.errors && attachment.errors.non_field_errors)}
                            />

                            <Form.Control.Feedback type="invalid">
                              {attachment.errors && attachment.errors.non_field_errors}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              {attachment.errors && attachment.errors.document}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={2} className="text-end mb-3">
                          <div className="delete-block text-danger">
                            {
                              attachment.document ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  size={20}
                                  className="text-danger cursor-pointer"
                                  onClick={() => { setEditData(attachment); setShowDeleteModal(true); }}
                                />

                              ) : (
                                <MinusCircle
                                  href="#"
                                  className="pe-auto text-danger cursor-pointer mt-4"
                                  size={20}
                                  onClick={() => setAttachmentsFields(attachmentsFields.filter(
                                    (_, i) => i !== index,
                                  ))}
                                />
                              )
                            }
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              }
                </div>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-success px-3 mb-4"
                  onClick={() => setAttachmentsFields((prevState) => [...prevState, {
                    name: '', file: null, published: false, errors: {},
                  }])}
                >
                  <FontAwesomeIcon icon={faLink} />
                  {' '}
                  Add Attachments
                </Button>
              </Card.Body>
            </Card>

            <div className="pagenation-style px-3">
              <Button className="me-2  px-3" onClick={() => router.push('/dashboard/vendor-empanelment/empanelment-category-list/')} variant="danger">
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
          </Stack>
        </Form>
      </Card.Body>
    </Card>

  );
}
