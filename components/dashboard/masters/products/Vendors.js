import {
  faChevronLeft, faCheck, faTimes, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Card, Col, Form, FormSelect, Row, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  MinusCircle, Trash2,
} from 'react-feather';
import {
  addProductVendorServices,
  deleteProductVendorServices,
  editProductVendorServices,
  getServices,
} from '../../../../services/dashboard/masters';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddVendors() {
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [vendorsData, setVendorsData] = useState([]);
  const [vendors, setVendors] = useState([{
    vendor: '',
    published: true,
    errors: {},
    default:true,
  }]);
  // const [vendor, setVendor] = useState([]);
  const router = useRouter();

  const { accessToken } = useSelector((state) => state.user);

  const { query: { id } } = router;

  const getProductVendorDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/products/${id}/vendors/`).then(({ data }) => {
      setVendors(data.results);
      setIsLoading(false);
    });
  };

  const getVendors = () => {
    setIsLoading(true);
    getServices(accessToken, '/admin/vendors/').then(({ data, errors }) => {
      if (data) {
        setVendorsData(data.results);
      } else {
        console.log(errors);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getVendors();
    if (id) {
      getProductVendorDetails();
    }
  }, []);

  const onSubmit = () => {
    const Promises = [];
    setFormLoading(true);
    if (vendors.filter(
      (vendors) => !vendors.vendor,
    ).length) {
      setVendors(vendors.map((item) => {
        if (!item.vendor) {
          return { ...item, errors: { vendor: 'Please select at least one vendor' } };
        }
        return item;
      }));
    } else {
      vendors.map((vendor) => {
        const formData = new FormData();
        if (vendor.id) {
          formData.append('vendor', vendor.vendor.id);
        } else {
          formData.append('vendor', vendor.vendor);
        }
        formData.append('published', vendor.published);
        formData.append('default', vendor.default ? vendor.default : false);
        if (vendor.id) {
          Promises.push(
            editProductVendorServices(accessToken, id, vendor.id, formData),
          );
        } else {
          Promises.push(
            addProductVendorServices(accessToken, id, formData),
          );
        }
      });
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setVendors(
              res.map((item, index) => {
                if (item.errors) {
                  return { ...vendors[index], errors: item.errors };
                }
                return vendors[index];
              }),
            );
            setFormLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
            router.push({
              pathname: '/dashboard/masters/products/',
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
            Add Vendors
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
      <div>
        {vendors.length > 0 && vendors.map((vendor, index) => (
          <Card className="mx-3 mt-2">
            <Card.Body className='py-3'>
              <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <Form.Group className="mb-3 px-2 w-50">
                  <Form.Label className="form-required">Vendor</Form.Label>
                  <Form.Select
                    type="select"
                    name="vendor"
                    id="vendor"
                    value={vendor && vendor.vendor && vendor.vendor.id}
                    onChange={(e) => {
                      setVendors(vendors.map((item, i) => (
                        i === index ? { ...item, vendor: e.target.value, errors: { ...item.errors, vendor: '' } } : item
                      )));
                    }}
                    required
                    isInvalid={vendor.errors && !!vendor.errors.vendor}
                  >
                    <option value="">Select a Vendor</option>
                    {vendorsData.length && vendorsData.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {vendor.errors && vendor.errors.vendor}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3 mx-3" controlId="formBasicCheckbox">
                  <Form.Check
                    name="default"
                    id="default"
                    checked={vendor.default}
                    onChange={(e) => setVendors(vendors.map((item, i) => (
                      i === index ? {
                        ...item, default:  i === index , errors: { ...item.errors, default: '' },
                      } : item
                    )))}
                    type="radio"
                    label="Default"
                  />
                </Form.Group>
                <Form.Group className="mt-3 mx-3" controlId="formBasicCheckbox">
                  <Form.Check
                    name="published"
                    id="published"
                    checked={vendor.published}
                    onChange={(e) => setVendors(vendors.map((item, i) => (
                      i === index ? {
                        ...item, published: e.target.checked, errors: { ...item.errors, published: '' },
                      } : item
                    )))}
                    type="checkbox"
                    label="Published"
                  />
                </Form.Group>
                <div className=" ">
                  {
                         vendor.id ? (
                          <FontAwesomeIcon icon={faTrash} size={20}
                             className="text-danger cursor-pointer"
                             onClick={() => { setEditData(vendor); setShowDeleteModal(true); }}
                           />

                         ) : (
                           <MinusCircle
                             size={20} className="text-danger cursor-pointer"
                             onClick={() => setVendors(vendors.filter(
                               (_, i) => i !== index,
                             ))}
                           />
                         )
                        }
                </div>
              </div>
            </Card.Body>
          </Card>
        )) }
      </div>
      <Row>
       
        <Col md={12} className="text-start px-4">
          <Button
            variant="primary"
            type="button"
            className="btn btn-success px-3 mb-3 text-nowrap"
            onClick={() => setVendors((prevState) => [...prevState, {
              vendor: null,
              published: false,
            }])}
          >
            {' '}
            <FontAwesomeIcon icon={faPlus} className="mt-1 mx-2" />
            Add Vendors
          </Button>
        </Col>
      </Row>
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
                    className="btn btn-success px-3 mb-3 mx-3"
                    onClick={() => onSubmit()}
                    disabled={!vendors.length}
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
                    className="btn btn-success px-3"
                    onClick={() => onSubmit()}
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
        onClose={() => { setShowDeleteModal(false); getProductVendorDetails(); }}
        id={editData.id}
        title={editData.name}
        type="vendor"
        deleteService={
         () => deleteProductVendorServices(accessToken, id, editData.id)
        }
      />
    </Card>
  );
}
