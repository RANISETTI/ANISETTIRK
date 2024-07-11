import {
  faCheck, faChevronLeft, faImage, faPlus, faTimes, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Row, Spinner
} from 'react-bootstrap';
import {
  MinusCircle, Trash2
} from 'react-feather';
import { useSelector } from 'react-redux';
import {
  addProductImageService, deleteProductImageService, editProductImageService, getServices
} from '../../../../services/dashboard/masters';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AddProductImages({ next }) {
  const [products, setProducts] = useState([{
    image: '',
    sort_order: null,
    featured: false,
    errors: {},
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});

  const router = useRouter();
  const { query: { id } } = router;
  const { accessToken } = useSelector((state) => state.user);

  const getProductDetails = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/products/${id}/images/`).then(({ data }) => {
      setProducts(data);
    }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    if (id) {
      getProductDetails();
    }
  }, []);

  const onSubmit = () => {
    if (!products.length) {
      next();
      router.push({
        pathname: `/dashboard/masters/products/add-product/${id}/`,
        query: { tab: 'attributes' },
      });
    }
    const Promises = [];
    setIsLoading(true);
    if (products.filter(
      (product) => !product.image || product.sort_order === null,
    ).length) {
      setProducts(products.map((item) => {
        console.log('item', item);
        let newitem = item;
        if (!item.image) {
          newitem = { ...newitem, errors: { ...newitem.errors, image: 'Please select an image' } };
        }
        if (item.sort_order === null) {
          newitem = { ...newitem, errors: { ...newitem.errors, sort_order: 'A valid integer required' } };
        }
        return newitem;
      }));
    } else {
      products.map((product) => {
        const formData = new FormData();
        formData.append('sort_order', product.sort_order);
        formData.append('featured', product.featured);

        if (product.imageURl) {
          formData.append('image', product.image);
        }
        if (product.id) {
          Promises.push(
            editProductImageService(accessToken, id, product.id, formData),
          );
        } else {
          Promises.push(
            addProductImageService(accessToken, id, formData),
          );
        }
      });
      Promise.all(Promises)
        .then((res) => {
          if (res.filter((mapItem) => mapItem.errors).length) {
            setProducts(
              res.map((item, index) => {
                if (item.errors) {
                  return { ...products[index], errors: item.errors };
                }
                return products[index];
              }),
            );
            setIsLoading(false);
          } else if (res.filter((mapItem) => mapItem.data).length !== 0
            && res.filter((mapItem) => mapItem.errors).length === 0) {
            next();
            router.push({
              pathname: `/dashboard/masters/products/add-product/${id}/`,
              query: { tab: 'attributes' },
            });
          }
        });
    }
    setIsLoading(false);
  };

  const renderImage = (productImage) => {
    if (productImage) {
      return (
        <img
          src={productImage}
          alt="team-member"
          className="img-thumbnail img-fluid mx-2 mb-2"
          style={{ width: '200px', height: '200px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faImage}
        className="img-thumbnail img-fluid p-100 mx-2"
        style={{ width: '200px', height: '200px' }}
      />
    );
  };

  // if (isLoading) {
  //   return (
  //     <div className="tender-loading">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

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
            Add Images
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

        {
    products.length > 0 && products.map((product, index) => (
      <Card className="mx-3 mt-2">
      <Card.Body className='py-3'>
        <div
          style={{
            alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          }}
          className=""
        >
          {product.imageURl ? renderImage(product.imageURl) : renderImage(product.image)}

          <Form.Group controlId="formFile" style={{ width: '350px' }} className="mx-3">
            <Form.Label className="form-required">Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => {
                e.preventDefault();
                setProducts(products.map((item, i) => (
                  i === index ? {
                    ...item,
                    image: (e.target.files[0] || ''),
                    imageURl: URL.createObjectURL(e.target.files[0]),
                    errors: { ...item.errors, image: '' },
                  } : item
                )));
              }}
              isInvalid={product && product.errors && product.errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {product && product.errors && product.errors.image}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ width: '350px' }} className="mx-3">
            <Form.Label className="form-required">Sort Order</Form.Label>
            <Form.Control
              type="number"
              name="sort_order"
              id="sort_order"
              value={product.sort_order}
              onChange={(e) => {
                console.log('sort order: ', typeof e.target.value);
                setProducts(products.map((item, i) => (
                  i === index ? { ...item, sort_order: e.target.value, errors: { ...item.errors, sort_order: '' } } : item
                )));
              }}
              required
              isInvalid={product && product.errors && product.errors.sort_order}
            />
            <Form.Control.Feedback type="invalid">
              {product && product.errors && product.errors.sort_order}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="mt-4 mx-2" controlId="attachmentPublished">
            <Form.Check
              type="checkbox"
              label="Is Featured"
              name="featured"
              id="featured"
              checked={product.featured}
              onChange={(e) => setProducts(products.map((item, i) => (
                i === index ? { ...item, featured: e.target.checked, errors: { ...item.errors, featured: '' } } : item
              )))}
              required
            />
          </Form.Group>
          <div className="mt-3">
            {product.id
              ? (
                <FontAwesomeIcon icon={faTrash} size={20}
                className="text-danger cursor-pointer"
                onClick={() => { setEditData(product); setShowDeleteModal(true); }} />
               
              )
              : (
                <MinusCircle
                  size={20} className="text-danger cursor-pointer"
                  onClick={() => setProducts(products.filter(
                    (_, i) => i !== index,
                  ))}
                />
              )}

          </div>
        </div>
      </Card.Body>
      </Card>
    ))
}
        <Row>
          
          <Col md={12} className="text-start px-4">
            <Button
              variant="primary"
              type="button"
              className="btn btn-success mb-2 text-nowrap"
              onClick={() => setProducts((prevState) => [...prevState, {
                image: '', sort_order: null, featured: false, errors: {},
              }])}
            >
              {' '}
              <FontAwesomeIcon icon={faPlus} className="mt-1 mx-2" />
              Add Product Images
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
                   className="btn btn-success  px-3 mb-3 mx-2"
                   onClick={() => onSubmit()}
                   
                 >
                   {' '}
                   <FontAwesomeIcon icon={faCheck} />
                   {' '}
                  &nbsp;
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
                   className="btn btn-success  px-3"
                   onClick={() => onSubmit()}
                 >
                   {
                      isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : 'Submit'
                    }
                 </Button>
               )
              }
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getProductDetails(); }}
        id={editData.id}
        title={editData.name}
        type="image"
        deleteService={
         () => deleteProductImageService(accessToken, id, editData.id)
        }
      />
    </Card>
  );
}
