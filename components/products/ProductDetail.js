/* eslint-disable arrow-body-style */
import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Breadcrumb, Button, Card, Carousel, Col, Form, Image, Modal, Row, Spinner, Alert,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import { getVendorProductDetailService } from '../../services/dashboard/vendors';
import Page404 from '../common/customerrorpages/Page404';

function ProductDetail() {
  const [productDetail, setProductDetail] = useState();
  const [minQuantity, setMinQuantity] = useState();
  const [maxQuantity, setMaxQuantity] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const checkRef = useRef();

  const router = useRouter();
  const { query: { productId } } = router;

  const {
    accessToken,
    userDetails: { type, organization, roles },
  } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  useEffect(() => {
    setIsLoading(true);
    if (type === 'VENDOR') {
      getVendorProductDetailService(accessToken, productId, organization.id)
        .then(({ data, errors }) => {
          if (data) {
            setProductDetail(data);
            setMinQuantity(data.minimum_quantity);
            setMaxQuantity(data.maximum_quantity);
            setIsLoading(false);
          }
          if (errors) {
            setErrors(errors);
          }
        });
    } else {
      Axios.get(Api.getProductDetail(productId), { headers }).then(({ data }) => {
        if (data.product_vendors.length === 1) {
          setSelectedVendor(data.product_vendors[0].vendor.id);
        }
        setProductDetail(data);
        setMinQuantity(data.minimum_quantity);
        setMaxQuantity(data.maximum_quantity);
        setIsLoading(false);
      }).catch((err) => {
        const { response: { statusText } } = err;
        setErrors(statusText);
      });
    }
  }, [productId]);

  // console.log(Object.keys(productDetail).length );

  if (errors) {
    return (
      <Page404 errors={errors} />
    );
  }
  const addToCart = () => {
    const data = {
      product: productDetail.id,
      vendor: selectedVendor,
      quantity: selectedQuantity,
    };
    Axios.post(Api.addToCart, data, { headers }).then(({ data }) => {
      setAddToCartSuccess(true);
      setTimeout(() => {
        setAddToCartSuccess(false);
      },2000)
    }).catch((err) => console.log(err));
  };

  const renderImageCarousel = () => {
    const carousels = productDetail.images && productDetail?.images.map((image) => (
      <Carousel.Item key={image.id}>
        <Image src={image.image} className="w-75 h-auto m-auto text-center" fluid />
      </Carousel.Item>
    ));
    return (
      <Carousel>
        {carousels.length ? carousels : (<Image src="/images/no_image.jpg" className="w-100 h-100 rounded m-auto bordered bg-light" />)}
      </Carousel>
    );
  };

  const renderAttributeOptions = (options) => options.map((option, index) => <span key={option.id}>{`${option.name} ${index === options.length - 1 ? '' : ','}`}</span>);

  const returnAttributes = () => {
    const { attributes } = productDetail;
    return (
      <div className="mt-3">
        <p className="vender-text">Product Specifications</p>
        {
          attributes && attributes?.map((attribute) => {
            return (
              <table width="100%">
                <tr>
                  <td width="25%" className="product-attribute">{attribute?.attribute?.name}</td>
                  <td width="75%" className="description-text">{renderAttributeOptions(attribute?.attribute_options)}</td>
                </tr>
              </table>
            );
          })
        }
      </div>
    );
  };

  // const renderModal = () => {
  //   return (
  //     <Modal
  //       show={addToCartSuccess}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //       onHide={() => setAddToCartSuccess(false)}
  //     >

  //       <Modal.Body className="modal-body-border">
  //         <div className="d-flex flex-row ">
  //           <Image src={productDetail && productDetail.images.length > 0 && productDetail.images[0].image} fluid className="img-cust-style" />
  //           <div className="mx-3">
  //             <h5 className="font-weight-bold mt-3 mb-4">{productDetail?.title}</h5>
  //             <p className="product-added">Product Added Successfully</p>
  //           </div>
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer className="modal-footer-border">
  //         <Button variant="danger" className="mx-4 continue-browsing" onClick={() => router.push('/dashboard/procurement/new')}> Continue Browsing</Button>
  //         <Button className="go-to-cart" onClick={() => { setAddToCartSuccess(false); router.push('/dashboard/procurement/cart'); }}>Go To Cart</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  // const renderVendors = () => (
  //   <div className="rounded pt-4 bg-white">
  //     <p className="vender-text">Vendors</p>
  //     {productDetail.vendors.length && productDetail.vendors.map((vendor, index) => {
  //       return (
  //         <Form onClick={(e) => {
  //           setSelectedVendor(vendor.id);
  //         }}
  //         >
  //           <div key={vendor.id} className="mb-3">
  //             <Form.Check
  //               ref={checkRef}
  //               type="radio"
  //               name="toggle"
  //               checked={vendor.id === selectedVendor}
  //               label={vendor.name}
  //             />
  //           </div>
  //         </Form>
  //       );
  //     })}
  //   </div>
  // );

  const renderVendors = () => (
    <div className="rounded pt-4 bg-white">
      <p className="vender-text">Rate Contract Vendors</p>
      {productDetail.product_vendors.length && productDetail.product_vendors.map((vendor, index) => {
        if (type === 'APTS') {
          return (
            <Form onClick={(e) => {
              setSelectedVendor(vendor.vendor.id);
            }}
            >
              <div key={vendor.vendor.id} className="mb-3">
                <Form.Check
                  ref={checkRef}
                  type="radio"
                  name="toggle"
                  checked={selectedVendor ? vendor.vendor.id === selectedVendor : vendor.default}
                  label={vendor.vendor.name}
                />
              </div>
            </Form>
          );
        }
        if (type === 'DEPARTMENT' && vendor.default) {
          return (
            <Form onClick={(e) => {
              setSelectedVendor(vendor.vendor.id);
            }}
            >
              <div key={vendor.vendor.id} className="mb-3">
                <Form.Check
                  ref={checkRef}
                  type="radio"
                  name="toggle"
                  checked={vendor.default}
                  label={vendor.vendor.name}
                />
              </div>
            </Form>

          );
        }
      })}
    </div>
  );

  const renderProductDetailSection = () => (
    <div className="product-details">
      <h5 className="mt-1 font-size-2rem">{productDetail.title}</h5>
      <p className="part-number">{productDetail.part_number}</p>
      <p className="product-price">
        <span>
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(productDetail.price)}
        </span>
      </p>
      {type !== 'VENDOR' && (
        <div>
          <div className="d-flex flex-row">
            <button
              type="button"
              disabled={selectedQuantity === 1}
              onClick={() => setSelectedQuantity(selectedQuantity - 1)}
              className="border p-3 cursor-pointer bg-white fs-4"
            >
              -
            </button>
            <span className="border p-3 fs-4">
              {selectedQuantity}
            </span>
            <button type="button" onClick={() => setSelectedQuantity(selectedQuantity + 1)} className="border p-3 cursor-pointer bg-white fs-4">
              +
            </button>
          </div>
          {renderVendors()}
          <Button
            className="mt-4  mb-4 mx-3"
            variant="btn btn-primary add-to-cart"
            onClick={() => router.push('/dashboard/procurement/cart')}
          >
            MY CART
          </Button>
          <Button
            disabled={!selectedVendor}
            className="mt-4  mb-4 mx-3"
            variant="btn btn-warning add-to-cart"
            onClick={() => addToCart()}
          >
            ADD TO CART
          </Button>

        </div>
      )}
      <div className="mt-3 mb-3">
        <p className="vender-text mb-1">Description</p>
        <div className="description-text" dangerouslySetInnerHTML={{ __html: productDetail.description }} />
      </div>
    </div>
  );

  const renderBreadCrumb = () => (
    <Card className="p-3 admin-breadcrumb">
      <div className="d-flex justify-content-between" style={{lineHeight:'40px'}}>
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item>
            {type === 'VENDOR' ? (
              <Link href="/dashboard/procurement/products">
                <a>
                  <Button>
                    Back
                  </Button>
                </a>
              </Link>
            ) : (
              <Link href="/dashboard/procurement/new">
                <a>
                  <Button>
                    Back
                  </Button>
                </a>
              </Link>
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="product-breadcrumb font-weight-bold text-primary mt-auto">
            Product Name
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-dark mt-auto" active>{productDetail?.slug}</Breadcrumb.Item>
        </Breadcrumb>
        {addToCartSuccess && (
        <Alert variant="success" className="text-end py-1" onClose={() => setAddToCartSuccess(false)} dismissible>
          <p className='mt-2'>Product added Successfully </p>
        </Alert>
        )}
      </div>
    </Card>
  );

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
    <div className="pb-5">
      <div>

        {renderBreadCrumb()}

      </div>
      <div className="bg-white px-5 py-3 rounded">
        <Row>
          <Col className="alignSelf-center">
            {productDetail && renderImageCarousel()}
            {productDetail && productDetail.attributes && productDetail.attributes.length ? returnAttributes() : ''}
          </Col>
          <Col className="cust-border-123">
            {productDetail && renderProductDetailSection()}
          </Col>

        </Row>
      </div>
      {/* {renderModal()} */}
    </div>
  );
}

export default ProductDetail;
