import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { addVendorService, editVendorService } from '../../../../services/dashboard/masters';
import { genericGetService } from '../../../../services/GenericService';

export default function CreateVendor(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstFile, setGstFile] = useState('');
  const [gstFileName, setGstFileName] = useState('');
  const [gstFileLink, setGstFileLink] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [panFile, setPanFile] = useState('');
  const [panFileName, setPanFileName] = useState('');
  const [panFileLink, setPanFileLink] = useState('');
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [isEdited, setIsEdited] = useState(false);

  const { handleSubmit } = useForm();
  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { vendorId } = router.query;

  const editorRef = useRef(null);

  useEffect(() => {
    if (vendorId) {
      setIsLoading(true);
      genericGetService(`/admin/vendors/${vendorId}`, headers)
        .then(({ data, errors }) => {
          if (errors) {
            setErrors(errors);
          }
          if (data) {
            const {
              name, address1, address2, city,
              description, email, gst, gstProof,
              isVerified, pan, panProof, phoneNumber, postcode,
            } = data;
            setName(name);
            setDescription(parse(description));
            setAddress(address1);
            setAddress2(address2);
            setCity(city);
            setEmail(email);
            setGstNumber(gst);
            setGstFileLink(gstProof);
            setGstFileName(gstProof && gstProof.split('/').pop());
            setPanNumber(pan);
            setPanFileName(panProof && panProof.split('/').pop());
            setPanFileLink(panProof);
            setPhone(phoneNumber);
            setPostcode(postcode);
            setVerified(isVerified);
          }
        }).finally(() => setIsLoading(false));
    }
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
    formData.append('name', name);
    if (description && description.length) {
      formData.append('description', htmlEncode(description));
    } else {
      formData.append('description', '');
    }
    formData.append('email', email);
    formData.append('phone_number', phone);
    formData.append('gst', gstNumber);
    formData.append('gst_proof', gstFile);
    formData.append('pan', panNumber);
    formData.append('pan_proof', panFile);
    formData.append('address_1', address);
    formData.append('address_2', address2);
    formData.append('city', city);
    formData.append('postcode', postcode);
    formData.append('is_verified', verified);
    if (vendorId) {
      setIsLoading(false);
      editVendorService(accessToken, vendorId, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setErrors(applyErrors);
          } else if (data) {
            console.log('added');
            router.push('/dashboard/masters/vendors/');
          }
        }).finally(() => setIsLoading(false));
    } else {
      addVendorService(accessToken, formData)
        .then(({ data, errors: applyErrors }) => {
          if (applyErrors && Object.keys(applyErrors).length) {
            setErrors(applyErrors);
          } else if (data) {
            router.push('/dashboard/masters/vendors/');
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
            <Button className="float-end" onClick={() => router.push('/dashboard/masters/vendors/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
            <h3 className="your-cart">
              {vendorId ? 'Edit' : 'Add'}
              {' '}
              Vendor
            </h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="form-required">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Enter Vendor Name"
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({
                    ...errors,
                    name: '',
                  });
                }}
                required
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="description"
                name="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({
                    ...errors,
                    description: '',
                  });
                }}
                placeholder="Enter Description"
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({
                      ...errors,
                      email: '',
                    });
                  }}
                  placeholder="Enter Email"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  min="0"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({
                      ...errors,
                      phone_number: '',
                    });
                  }}
                  placeholder="Enter Phone Number"
                  isInvalid={!!errors.phone_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone_number}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">GST Number</Form.Label>
                <Form.Control
                  type="text"
                  name="gstNumber"
                  id="gstNumber"
                  value={gstNumber}
                  onChange={(e) => {
                    setGstNumber(e.target.value);
                    setErrors({
                      ...errors,
                      gst: '',
                    });
                  }}
                  placeholder="Enter GST Number"
                  isInvalid={!!errors.gst}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gst}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formFile" className="mb-3" xs={12} md={6}>
                <Form.Label className="form me-3">GST Document</Form.Label>
                {(gstFileLink && gstFileName) && (
                  <Link href={gstFileLink}>
                    <a>
                      {gstFileName}
                    </a>
                  </Link>
                )}
                <Form.Control
                  type="file"
                  name="gstFile"
                  onChange={(e) => {
                    setGstFile(e.target.files[0]);
                    if (gstFileName) {
                      setIsEdited(true);
                    }
                    setErrors({
                      ...errors,
                      gst_proof: '',
                    });
                  }}
                  isInvalid={!!errors.gst_proof}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gst_proof}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="panNumber"
                  id="panNumber"
                  value={panNumber}
                  onChange={(e) => {
                    setPanNumber(e.target.value);
                    setErrors({
                      ...errors,
                      pan: '',
                    });
                  }}
                  placeholder="Enter PAN Number"
                  isInvalid={!!errors.pan}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pan}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formFile" className="mb-3" xs={12} md={6}>
                <Form.Label className="form me-3">PAN Document</Form.Label>
                {(panFileLink && panFileName) && (
                  <Link href={panFileLink}>
                    <a>
                      {panFileName}
                    </a>
                  </Link>
                )}
                <Form.Control
                  type="file"
                  name="panFile"
                  onChange={(e) => {
                    setPanFile(e.target.files[0]);
                    if (panFileName) {
                      setIsEdited(true);
                    }
                    setErrors({
                      ...errors,
                      pan_proof: '',
                    });
                  }}
                  isInvalid={!!errors.pan_proof}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pan_proof}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="address_1"
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setErrors({
                      ...errors,
                      address_1: '',
                    });
                  }}
                  placeholder="Enter Address 1"
                  isInvalid={!!errors.address_1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address_1}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address_2"
                  id="address2"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                    setErrors({
                      ...errors,
                      address_2: '',
                    });
                  }}
                  placeholder="Enter Address 2"
                  isInvalid={!!errors.address_2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address_2}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setErrors({
                      ...errors,
                      city: '',
                    });
                  }}
                  placeholder="Enter City"
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                <Form.Label className="form">Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postcode"
                  id="postcode"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setErrors({
                      ...errors,
                      postcode: '',
                    });
                  }}
                  placeholder="Enter Postcode"
                  isInvalid={!!errors.postcode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.postcode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="verified"
                id="verified"
                checked={verified}
                onChange={(e) => setVerified(!verified)}
                type="checkbox"
                label="Verified"
              />
            </Form.Group>
            {
              errors.non_field_errors
              && (
                <Alert variant="danger">
                  {' '}
                  {errors.non_fielde_rrors}
                </Alert>
              )
            }
            <div className="pagenation-style">
              <Button variant="danger" className="me-2 px-3" onClick={() => router.push('/dashboard/masters/vendors')}>
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
