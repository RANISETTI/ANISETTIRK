import {
  faCheck, faChevronLeft, faLink, faTimes, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {
  MinusCircle, Trash2,
} from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import getHeaders from '../../../libs/utils/getHeaders';
import {
  createTenderAttachmentService, createTenderService,
  createTendertype, editTenderAttachmentService,
  editTendersService, getTenderAttachmentService,
} from '../../../services/dashboard/tenders';
import { genericGetService } from '../../../services/GenericService';
import DeleteAttachment from './attachments/DeleteAttachment';

export default function AddTender(props) {
  const [tenderType, setTenderType] = useState();
  const [tenderTypeOptions, setTenderTypeOptions] = useState([]);
  const [tenderTitle, setTenderTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [published, setPublished] = useState(false);
  const [tenderId, setTenderId] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentFile, setAttachmentFIle] = useState('');
  const [attachmentLink, setAttachmentLink] = useState('');
  const [attachmentFileName, setAttachmentFileName] = useState('');
  const [attachmentPublished, setAttachmentPublished] = useState(false);
  const [attachmentErrors, setAttachmentErrors] = useState([]);
  const [attachmentCall, setAttachmentCall] = useState(false);
  const [tenderDetail, setTenderDetail] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [createdTenderId, setCreatedTenderId] = useState();
  const [tenderTypeLoading, setTenderTypeLoading] = useState(false);
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

  const [tenderErrors, setTenderErrors] = useState([]);
  const [tenderAddedSuccess, setTenderAddedSuccess] = useState(false);
  const [isTenderAdding, setIsTenderAdding] = useState(false);

  const { action } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { handleSubmit } = useForm();

  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;
  const { query: { id } } = router;

  const getTenderDetails = () => {
    const tenderDetailId = asPath.split('/')[5];
    genericGetService(`/admin/tenders/${tenderDetailId}/`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          console.log('data', data);
          const {
            id, title, notes, published, startDate, endDate,
            type,
          } = data;
          setTenderId(id);
          setTenderTitle(title);
          setNotes(notes);
          setTenderType(type);
          setStartDate(startDate);
          setEndDate(endDate);
          setPublished(published);
        }
      });
  };

  const getTenderTypes = (searchText) => {
    setTenderTypeLoading(true);
    genericGetService(`/admin/tender/types/?search=${searchText}`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTenderTypeOptions(data);
          setTenderTypeLoading(false);
        } else {
          setTenderTypeOptions([]);
        }
      }).finally(() => setIsLoading(false));
  };

  const getTenderAttachments = () => {
    getTenderAttachmentService(accessToken, id || tenderId)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          setFormLoading(false);
        } else {
          setAttachmentsFields(data);
          setFormLoading(false);
        }
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getTenderTypes('');
    if (action) {
      getTenderDetails();
    }

    if (id) {
      getTenderAttachments();
    }
  }, []);

  const onSubmitAttachment = (dataId) => {
    const Promises = [];
    setFormLoading(true);
    if (attachmentsFields.filter(
      (filterItem) => !filterItem.attachment && !filterItem.file,
    ).length) {
      setAttachmentsFields(attachmentsFields.map((item) => {
        if (!item.attachment && !item.file) {
          return { ...item, errors: { attachment: 'Please select an attachment', name: 'Name is required' } };
        }
        return item;
      }));
    } else if (attachmentsFields.length === 0) {
      router.push('/dashboard/tenders/list');
    } else {
      attachmentsFields.map((attachment) => {
        const attachmentFormData = new FormData();
        attachmentFormData.append('name', attachment.name);
        attachmentFormData.append('published', attachment.published);
        if (attachment.file) {
          attachmentFormData.append('attachment', attachment.file);
        }
        if (attachment.id) {
          Promises.push(
            editTenderAttachmentService(attachmentFormData, headers, dataId, attachment.id),
          );
        } else {
          Promises.push(
            createTenderAttachmentService(attachmentFormData, headers, dataId),
          );
        }
      });
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setAttachmentsFields(
              res.map((item, index) => {
                if (item.errors) {
                  return { ...attachmentsFields[index], errors: item.errors };
                }
                return attachmentsFields[index];
              }),
            );
            setFormLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
            getTenderAttachments();
            router.push('/dashboard/tenders/list');
          }
        }).finally(() => {
          setIsTenderAdding(false);
          setTenderAddedSuccess(true);
          setTimeout(() => {
            setTenderAddedSuccess(false);
          }, 2000);
        });
    }
    setFormLoading(false);
  };

  const onSubmit = () => {
    setFormLoading(true);
    setIsTenderAdding(true);
    const formData = new FormData();
    formData.append('title', tenderTitle);
    formData.append('description', '');
    formData.append('notes', notes);
    formData.append('type', tenderType && tenderType.id);
    formData.append('start_date', moment(startDate).format('YYYY-MM-DD'));
    formData.append('end_date', moment(endDate).format('YYYY-MM-DD'));
    formData.append('published', published);
    if (action || tenderId) {
      editTendersService(formData, headers, tenderId)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setTenderErrors(addErrors);
            setFormLoading(false);
          } else if (data) {
            onSubmitAttachment(data.id);
          }
        }).finally(() => setFormLoading(false));
    } else {
      createTenderService(formData, headers)
        .then(({ data, errors: addErrors }) => {
          if (addErrors && Object.keys(addErrors).length) {
            setTenderErrors(addErrors);
            setFormLoading(false);
          } else if (data) {
            setTenderId(data.id);
            setTenderDetail(data);
            onSubmitAttachment(data.id);
          }
        });
    }
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const tenderTypePost = async (tenderName) => {
    setTenderTypeLoading(true);
    const { data, errors } = await createTendertype({ name: tenderName, published: true }, headers);
    if (data) {
      setTenderType(data);
      getTenderTypes('');
    } else {
      console.log(errors);
    }
  };

  return (
    <div>
      <DeleteAttachment
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        data={editData}
        onClose={() => { getTenderAttachments(); setShowDeleteModal(false); }}
        action="DELETE"
        tenderId={tenderId}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="d-flex justify-content-between">
            <h3 className="your-cart">
              {action ? 'Edit' : 'Add'}
              {' '}
              Tender
            </h3>
            <Button className="px-3" onClick={() => router.push('/dashboard/tenders/list')}>
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
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Tender Type</Form.Label>
              <CreatableSelect
                isClearable
                isLoading={tenderTypeLoading}
                isSearchable
                value={tenderType}
                onInputChange={(
                  inputValue,
                  { action, prevInputValue },
                ) => {
                  switch (action) {
                    case 'set-value':
                      getTenderTypes('');
                      return '';
                    case 'input-change':
                      if (inputValue) {
                        getTenderTypes(inputValue);
                      } else {
                        getTenderTypes('');
                      }
                      return inputValue;
                    default:
                      return '';
                  }
                }}
                onChange={(newValue, actionMeta) => {
                  console.log(newValue);
                  const { action } = actionMeta;
                  if (action === 'create-option') {
                    if (actionMeta.option) {
                      tenderTypePost(actionMeta.option.label);
                    }
                  }
                  if (action === 'select-option' || action === 'remove-value' || action === 'clear') {
                    setTenderType(newValue);
                    setTenderErrors({ ...tenderErrors, type: '' });
                  }
                }}
                options={tenderTypeOptions}
                getOptionLabel={(options) => options.name || options.label}
                getOptionValue={(options) => options.id || options.value}
              />
              <p style={{ color: '#dc3545' }}>
                {tenderErrors.type}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Tender Title</Form.Label>
              <Form.Control
                type="text"
                name="tenderTitle"
                id="tenderTitle"
                value={tenderTitle}
                onChange={(e) => {
                  setTenderTitle(e.target.value);
                  setTenderErrors({
                    ...tenderErrors,
                    title: '',
                  });
                }}
                placeholder="Enter Tender Title"
                required
                isInvalid={!!tenderErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {tenderErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes (Scroll text)</Form.Label>
              <Form.Control
                type="textarea"
                name="notes"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                isInvalid={!!tenderErrors.notes}
              />
              <Form.Control.Feedback type="invalid">
                {tenderErrors.notes}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="form-required">Start Date</Form.Label>
                  <DatePicker
                    selected={startDate ? new Date(startDate) : null}
                    onChange={(e) => {
                      setStartDate(e);
                      setTenderErrors({ ...tenderErrors, start_date: '' });
                    }}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Start Date"
                    className="date-picker-input"
                  />
                  {tenderErrors.start_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {tenderErrors.start_date}
                    </p>
                  ) : ''}
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="form-required">End Date</Form.Label>
                  <DatePicker
                    selected={endDate ? new Date(endDate) : null}
                    onChange={(e) => {
                      setEndDate(e);
                      setTenderErrors({ ...tenderErrors, end_date: '' });
                    }}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="End Date"
                    className="date-picker-input"
                  />
                  {tenderErrors.end_date ? (
                    <p style={{ color: '#dc3545', fontSize: '14px' }}>
                      {tenderErrors.end_date}
                    </p>
                  ) : ''}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="published"
                id="published"
                checked={published}
                onChange={() => setPublished(!published)}
                type="checkbox"
                label="Publish"
              />
            </Form.Group>
            <h3 className="your-cart my-4">
              Attachments
            </h3>
            <div>
              {
                attachmentsFields && attachmentsFields.map((attachment, index) => (
                  <Card>
                    <Card.Body className="pt-3">
                      <Row>
                        <Col xs={12} md={3}>
                          <Form.Group className="mb-3 px-2">
                            <Form.Label className="form-required">Attachment Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              id="name"
                              value={attachment.name}
                              onChange={(e) => setAttachmentsFields(
                                attachmentsFields.map((item, i) => (
                                  i === index ? { ...item, name: e.target.value, errors: { ...item.errors, name: '' } } : item
                                )),
                              )}
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
                            <Link href={attachmentLink}>
                              <a>
                                {attachmentFileName}
                              </a>
                            </Link>
                            <Form.Control
                              type="file"
                              name="attachmentFile"
                              onChange={(e) => setAttachmentsFields(
                                attachmentsFields.map((item, i) => (
                                  i === index ? {
                                    ...item, file: e.target.files[0], errors: { ...item.errors },
                                  } : item
                                )),
                              )}
                              isInvalid={(attachment.errors && !!attachment.errors.attachment)
                                || (attachment.errors && attachment.errors.non_field_errors)}
                            />
                            {
                              attachment.attachment && (
                                <Link href={attachment.attachment}>
                                  <a target="_blank">
                                    {attachment.attachment.split('/').pop()}
                                  </a>
                                </Link>

                              )
                            }
                            <Form.Control.Feedback type="invalid">
                              {attachment.errors && attachment.errors.non_field_errors}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              {attachment.errors && attachment.errors.attachment}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={3} style={{ display: 'inline-flex' }} className="my-auto">
                          <Form.Group className="px-2" controlId="attachmentPublished">
                            <Form.Check
                              type="checkbox"
                              label="Publish Attachment"
                              name="attachmentPublished"
                              id="attachmentPublished"
                              checked={attachment.published}
                              onChange={(e) => setAttachmentsFields(attachmentsFields.map(
                                (item, i) => (
                                  i === index ? { ...item, published: e.target.checked, errors: { ...item.errors, published: '' } } : item
                                ),
                              ))}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={1} className="text-end mb-3">
                          <div className="delete-block text-danger">
                            {
                              attachment.attachment ? (
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
            {isTenderAdding && (
            <Alert variant="primary" className="text-end py-1" onClose={() => setIsTenderAdding(false)} dismissible>
              <p className="mt-2">Submitting the tender along with added documents</p>
            </Alert>
            )}
            {tenderAddedSuccess && (
            <Alert variant="success" className="text-end py-1" onClose={() => setTenderAddedSuccess(false)} dismissible>
              <p className="mt-2">Tender submitted successfully</p>
            </Alert>
            )}
            <div className="pagenation-style">
              <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/tenders/list')}>
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
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCheck} />
                    {
                      formLoading ? (
                        <div className="button-loading">
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : ' Submit'
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
                    {
                      formLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : ' Submit'
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
