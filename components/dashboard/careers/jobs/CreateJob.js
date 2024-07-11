import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react/';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import getSecretariatDepartments, { getHODDepartments } from '../../../../services/dashboard/departments';
import { createJobService, editJobService, getQualificationsService } from '../../../../services/dashboard/jobs';
import { genericGetService } from '../../../../services/GenericService';

export default function CreateJob(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [locations, setLocations] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [active, setActive] = useState(false);
  const [jobErrors, setJobErrors] = useState([]);
  const [jobId, setJobId] = useState('');
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [hodDepartment, setHodDepartment] = useState([]);
  const [departmentType, setDepartmentType] = useState();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const { action } = props;

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;

  const editorRef = useRef(null);

  const getDepartments = (searchValue) => {
    getSecretariatDepartments(searchValue, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDepartmentOptions(data.results);
        } else {
          setDepartmentOptions([]);
        }
      });
  };

  const getQualifications = () => {
    getQualificationsService(headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          const { results } = data;
          setQualificationOptions(results);
        } else {
          setQualificationOptions([]);
        }
      });
  };

  const getHodDepartments = (parentId, searchValue) => {
    getHODDepartments(searchValue, parentId, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setDepartmentTypeOptions(data.results);
        } else {
          setDepartmentTypeOptions([]);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDepartments('');
    getHodDepartments('');
    getQualifications();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (action) {
      const id = asPath.split('/')[5];
      genericGetService(`/admin/jobs/${id}/`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            setJobErrors(errors);
          }
          if (data) {
            const {
              id, description, title, department, department: { parent },
              locations, startDate, endDate, active, type: { id: typeId }, qualifications,
            } = data;
            setJobId(id);
            setTitle(title);
            setDescription(parse(description));
            setType(typeId);
            setHodDepartment(department);
            setDepartmentType(parent);
            setLocations(locations);
            setStartDate(startDate);
            setEndDate(endDate);
            setActive(active);
            setSelectedQualifications(qualifications);
          }
        });
    }
    genericGetService('/admin/job/types/', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
          setJobErrors(errors);
        }
        if (data) {
          setJobTypeOptions(data.results);
        } else {
          setJobTypeOptions([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  function htmlEncode(html) {
    const el = document.createElement('div');
    return html.replace(/\&#?[0-9a-z]+;/gi, (enc) => {
      el.innerHTML = enc;
      return el.innerText;
    });
  }

  const onSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', htmlEncode(description));
    formData.append('type', type);
    formData.append('department', hodDepartment ? hodDepartment.id : '');
    formData.append('locations', locations);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('active', active);
    if (selectedQualifications && selectedQualifications.length) {
      selectedQualifications.map((qualification) => formData.append('qualifications', qualification.id));
    } else {
      formData.append('qualifications', '');
    }
    if (action) {
      editJobService(headers, jobId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setJobErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/careers/jobs/');
          }
        }).finally(() => setIsLoading(false));
    } else {
      createJobService(formData, headers)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setJobErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/careers/jobs/');
          }
        }).finally(() => setIsLoading(false));
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

  return (
    <>
      <Script src="/tinymce/js/tinymce/tinymce.min.js" strategy="beforeInteractive" />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div>
            <Button className="float-end" onClick={() => router.push('/dashboard/careers/jobs/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
            <h3 className="your-cart">
              {action ? 'Edit' : 'Create a new'}
              {' '}
              Job
            </h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter Job Title"
                onChange={(e) => {
                  console.log(e);
                  setTitle(e.target.value);
                  setJobErrors({ ...jobErrors, title: '' });
                }}
                required
                isInvalid={!!jobErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {jobErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Description</Form.Label>
              <Editor
                tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => { editorRef.current = editor; }}
                init={{
                  height: 250,
                  menubar: false,
                  browser_spellcheck: true,
                  paste_as_text: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                  ],
                  toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter '
                    + 'alignright alignjustify | bullist numlist outdent indent | '
                    + 'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={(e) => {
                  setDescription(e);
                  setJobErrors({ ...jobErrors, description: '' });
                }}
                value={description}
                outputFormat="html"
              />
              {jobErrors.description ? (
                <Alert variant="danger">
                  {jobErrors.description}
                </Alert>
              ) : ''}
            </Form.Group>
            <Row>
              <Form.Group as={Col} sm={2} className="mb-3">
                <Form.Label className="form-required">Type</Form.Label>
                <Form.Select
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setJobErrors({ ...jobErrors, type: '' });
                  }}
                  required
                  isInvalid={!!jobErrors.type}
                >
                  <option value="">Select a type</option>
                  {jobTypeOptions.map((option) => (
                    <option value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {jobErrors.type}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm={4} className="mb-3">
                <Form.Label className="form-required">Locations</Form.Label>
                <Form.Control
                  type="text"
                  name="locations"
                  id="locations"
                  value={locations}
                  onChange={(e) => {
                    setLocations(e.target.value);
                    setJobErrors({ ...jobErrors, locations: '' });
                  }}
                  placeholder="Enter Locations"
                  required
                  isInvalid={!!jobErrors.locations}
                />
                <Form.Control.Feedback type="invalid">
                  {jobErrors.locations}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm={6} className="mb-3">
                <Form.Label className="form-required">
                  Educational Qualifications
                </Form.Label>
                <Select
                  name="qualifications"
                  value={selectedQualifications}
                  options={qualificationOptions}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  isSearchable
                  isMulti
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={(newValue, actionMeta) => {
                    const { action } = actionMeta;
                    if (action === 'select-option' || action === 'remove-value') {
                      setSelectedQualifications(newValue);
                      setJobErrors({
                        ...jobErrors,
                        qualifications: '',
                      })
                    } else if (action === 'clear') {
                      getQualifications();
                      setSelectedQualifications('');
                    }
                  }}
                />
                {jobErrors.qualifications && (
                <p style={{ color: '#dc3545' }}>
                  {jobErrors.qualifications}
                </p>
                )}
              </Form.Group>
              <Form.Group as={Col} sm={6} className="mb-3">
                <Form.Label>
                  Secretariat Department
                </Form.Label>
                <Select
                  name="department"
                  value={departmentType}
                  options={departmentOptions}
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
                      setDepartmentType(newValue);
                      setHodDepartment('');
                      getHodDepartments(newValue && newValue.id);
                    } else if (action === 'clear') {
                      getDepartments('');
                      setHodDepartment('');
                      setDepartmentType('');
                    }
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} sm={6} className="mb-3">
                <Form.Label className="form-required">Head of Department</Form.Label>
                <Select
                  name="hodDepartment"
                  isClearable
                  value={hodDepartment}
                  options={departmentTypeOptions}
                  getOptionLabel={(options) => options.name}
                  getOptionValue={(options) => options.id}
                  isDisabled={type === 'DEPARTMENT' || !departmentType}
                  onInputChange={(
                    inputValue,
                    { action, prevInputValue },
                  ) => {
                    switch (action) {
                      case 'set-value':
                        return prevInputValue;
                      case 'input-change':
                        if (inputValue) {
                          getHodDepartments(departmentType && departmentType.id, inputValue);
                        } else {
                          getHodDepartments(departmentType && departmentType.id, '');
                        }
                        return inputValue;
                      default:
                        return inputValue;
                    }
                  }}
                  isSearchable
                  closeMenuOnSelect
                  onChange={(newValue, actionMeta) => {
                    const { action } = actionMeta;
                    console.log(newValue);
                    if (action === 'select-option' || action === 'remove-value') {
                      setHodDepartment(newValue);
                      setJobErrors({ ...jobErrors, department: '' });
                    } else if (action === 'clear') {
                      setHodDepartment([]);
                    }
                  }}
                />
                {jobErrors.department && (
                <p style={{ color: '#dc3545' }}>
                  {jobErrors.department}
                </p>
                )}
              </Form.Group>
              <Form.Group as={Col} sm={6} className="mb-3">
                <Form.Label className="form-required">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setJobErrors({ ...jobErrors, start_date: '' });
                  }}
                  required
                  isInvalid={!!jobErrors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {jobErrors.start_date}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm={6} className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setJobErrors({ ...jobErrors, end_date: '' });
                  }}
                  required
                  isInvalid={!!jobErrors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {jobErrors.end_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="active"
                id="active"
                checked={active}
                onChange={(e) => setActive(!active)}
                type="checkbox"
                label="Active"
              />
            </Form.Group>
            {jobErrors.nonFieldErrors ? (
              <Alert variant="danger">
                {jobErrors.nonFieldErrors}
              </Alert>
            ) : ''}
            <div className="pagenation-style">
              <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/careers/jobs/')}>
                <FontAwesomeIcon icon={faTimes} />
                {' '}
                Cancel
              </Button>
              <Button variant="success" type="submit" className="btn btn-success px-3">
                <FontAwesomeIcon icon={faCheck} />
                {' '}
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
}
