import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Breadcrumb, Button, Card, Col, Image, Row, Spinner, Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../../services/config';
import { getServices, uploadDocumentService } from '../../../services/dashboard/orders';
import { getVendorOrderDetailService } from '../../../services/dashboard/vendors';
import Page404 from '../../common/customerrorpages/Page404';
import MultipleVendorModal from './MultipleVendorModal';
import ApproveModals from './OrderApproveModal';

export default function OrderDetails() {
  const [orderDetail, setOrderDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [approveType, setApproveType] = useState('');
  const [approveOrderId, setApproveOrderId] = useState('');
  const [showApproveOrderModal, setShowApproveOrderModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState();

  const router = useRouter();
  const { query: { orderId } } = router;

  const { accessToken, userDetails, userDetails: { type, roles } } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const getOrderDetails = async (orderId) => {
    setIsLoading(true);
    await Axios.get(Api.patchOrderDetails(orderId), { headers }).then(({ data }) => {
      setOrderDetail(data);
    }).catch((error) => {
      const { response: { data } } = error;
      setErrors(data.detail);
    });
    await Axios.get(Api.orderHistory(orderId), { headers }).then(({ data }) => {
      console.log(data, 'data');
    });
    await getServices(accessToken, `procurement/orders/${orderId}/vendors/`).then(({ data, errors }) => {
      if (data) {
        setVendors(data);
      } else {
        console.log('errors');
      }
    }).finally(() => setIsLoading(false));
  };

  const getVendorOrderDetail = (vendorId, orderId) => {
    setIsLoading(true);
    getVendorOrderDetailService(accessToken, vendorId, orderId).then(({ data, errors }) => {
      if (errors) {
        setErrors(errors);
        // console.log(Object.keys(errors).length > 0, 'errorsorder');
      } else {
        setOrderDetail(data);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (type === 'VENDOR') {
      const { organization: { id: organizationId } } = userDetails;
      getVendorOrderDetail(organizationId, orderId);
    } else {
      getOrderDetails(orderId);
    }
  }, [orderId]);

  const downloadDocument = (id, name) => {
    axiosInstance.get(`/procurement/order/history/${id}/file/`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${name}`);
      });
  };

  const renderBreadCrumb = () => (
    <Card className="p-3 admin-breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item className="product-breadcrumb font-weight-bold text-primary">
          <Link href="/dashboard/procurement/orders">
            <a>
              Orders
            </a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-dark" active>{orderId}</Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );

  if (errors && Object.keys(errors).length > 0) {
    return (
      <Page404 errors={errors} />
    );
  }

  if (isLoading || !orderDetail?.order_products.length) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderOrderHistoryTable = () => (
    <div>
      <Table className="order-details mb-0" responsive>
        <thead>
          <tr>
            <th>
              Comment
            </th>
            <th>
              Date
            </th>
            <th>
              Status
            </th>
            <th>
              Approved By
            </th>
            <th>
              Amount Sent/Received
            </th>
            <th>
              Documents
            </th>
          </tr>
        </thead>
        <tbody>
          {
            orderDetail.order_history.map((item) => (
              <tr>
                <td
                  className="w-30"
                >
                  <p className="text-success text-start m-2">
                    {item.comment}
                  </p>
                </td>
                <td>
                  {moment(item.modified_ts).format('MMM Do YYYY, h:mm:ss a')}
                </td>
                <td>{item.status_display_name}</td>
                <td>{item.modified_by && item.modified_by.first_name}</td>
                <td>
                  {item.sent_amount && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.sent_amount)}
                  {item.sent_amount && ' (sent)'}
                  {item.received_amount && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.received_amount)}
                  {item.received_amount && ' (recevied)'}
                </td>
                <td>
                  {
                    item.file ? (
                      <p
                        style={{ width: '200px', cursor: 'pointer', marginTop: '10px' }}
                        onClick={() => downloadDocument(item.id, item.file)}
                      >
                        {item.file.split('/').pop() }
                      </p>
                    ) : (
                      <p>
                        -
                      </p>
                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );

  const {
    uid,
    status,
    status_display_name: statusName,
    department: { name: departmentName },
    shipping_address: {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city,
      state: { name: stateName },
      pincode,
    },
    billing_address: {
      address_line_1: billingAddress1,
      address_line_2: billingAddress2,
      city: billingCity,
      state: {
        name:
        billingStateName,
      },
      pincode: billingPincode,
    },
    reference_no: referenceNo,
    purchase_order_no: purchaseOrderNo,
    total_price: totalPrice,
    sent_amount,
    recevied_amount,
    sgst,
    cgst,
    igst,
    apts_charge,
    grand_total,
    tax_amount,
    apts_charge_rate,
  } = orderDetail;

  const approveOrder = (id) => {
    const formData = new FormData();
    formData.append('file', '');
    formData.append('comment', 'order Accepted');
    formData.append('status', 'ACCEPTED');
    uploadDocumentService(accessToken, id, formData)
      .then(({ data, errors }) => {
        if (data) {
          router.reload();
        } else {
          console.log('errors', errors);
        }
      });
  };

  const renderTable = () => (
    <div>
      <Table className="order-details mb-0" responsive bordered>
        <thead>
          <tr>
            <th>
              Image
            </th>
            <th>
              Product Name
            </th>
            <th>
              Price
            </th>
            <th>
              Quantity
            </th>
            <th>
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {
          orderDetail.order_products && orderDetail.order_products.map((item) => (
            <tr>
              <td className="p-4 order-details-style">
                {item.image ? <Image className="w-50 h-50 m-auto bordered" src={item.image && item.image} style={{ objectFit: 'contain' }} /> : <Image src="/images/no_image.jpg" className="w-50 h-50 m-auto bordered bg-light" />}
              </td>
              <td>
                <div>
                  <p className="product-title">
                    {item.product && item.product.title}
                  </p>
                  <p className="part-number1">
                    {item.vendor ? (item.vendor.name) : ''}
                  </p>
                </div>
              </td>
              <td className="product-price1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}
              </td>
              <td className="text-center">{item.quantity}</td>
              <td className="product-price1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.total)}
              </td>
            </tr>
          ))
          }
        </tbody>
        <tbody>
          { !(status === 'PENDING_PI' || (status === 'ACCEPTED' && type=== 'VENDOR')) && (
            <tr>
              <td colSpan={3} />
              <td>
                <p>
                  Sub Total
                </p>
              </td>
              <td>
                <p className="product-price1">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}
                </p>
              </td>
            </tr>
          )}
          {apts_charge && (
          <tr>
            <td colSpan={3} />
            <td>
              <p>
                APTSL Service Charges
                {' '}
                {apts_charge_rate && apts_charge_rate ? `@ ${apts_charge_rate}%` : ''}
                {' '}
                :
                {' '}
              </p>
            </td>
            <td>
              <p className="product-price1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(apts_charge)}
              </p>
            </td>
          </tr>
          )}
          {(cgst && sgst) && (
          <>
            <tr>
              <td colSpan={3} />
              <td>
                <p>
                  CGST Output A/c @
                  {' '}
                  {cgst}
                  {' '}
                  %
                  :
                  {' '}
                </p>
              </td>
              <td>
                <p className="product-price1">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((apts_charge * cgst) / 100)}
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan={3} />
              <td>
                <p>
                  SGST Output A/c @
                  {' '}
                  {sgst}
                  {' '}
                  %
                  :
                  {' '}
                </p>
              </td>
              <td>
                <p className="product-price1">
                  { }
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((apts_charge * sgst) / 100)}
                </p>
              </td>
            </tr>
          </>
          )}
          {igst && (
          <tr>
            <td colSpan={3} />
            <td>
              <p>
                IGST Output A/c @
                {' '}
                {igst}
                {' '}
                %
                :
                {' '}
              </p>
            </td>
            <td>
              <p className="product-price1">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((apts_charge * igst) / 100)}
              </p>
            </td>
          </tr>
          )}
          <tr>
            <td colSpan={3} />
            <td className="vender-text">
              <p>Total Value : </p>
            </td>
            <td>
              <p className="product-price1">{type === 'VENDOR' ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice) : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(grand_total)}</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  return (
    <div>
      {status === 'PENDING_PI' ? (
        <MultipleVendorModal
          show={showApproveOrderModal}
          onHide={() => {
            setShowApproveOrderModal(false);
            setOrderStatus('');
          }}
          onClose={() => {
            setShowApproveOrderModal(false);
            setOrderStatus('');
            getOrderDetails(orderId);
          }}
          action={approveType}
          approveOrderId={approveOrderId}
          status={orderStatus}
          selectedvendors={vendors}
          totalPrice={totalPrice}
        />
      )
        : (
          <ApproveModals
            show={showApproveOrderModal}
            onHide={() => {
              setShowApproveOrderModal(false);
              setOrderStatus('');
            }}
            onClose={() => {
              setShowApproveOrderModal(false);
              setOrderStatus('');
              getOrderDetails(orderId);
            }}
            action={approveType}
            approveOrderId={approveOrderId}
            status={orderStatus}
          />
        ) }

      {/* {renderBreadCrumb()} */}
      <Card className="px-3 py-2 admin-breadcrumb">
        <div className="order-details-style1">
          <h5 className="sub-total"> Order Details</h5>
          <div className="d-inline-flex">
            {type === 'APTS' && roles && roles.includes('Procurement') ? (
              <div>
                {
                status === 'PENDING_PI' && (
                  <Button
                    variant="outline-success"
                    className="me-2 next-btn"
                    onClick={() => {
                      // approveOrder(uid);
                      setShowApproveOrderModal(true);
                      setApproveOrderId(uid);
                      setOrderStatus('PENDING_PI');
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                    Generate PI
                  </Button>
                )
              }
              </div>
            ) : ''}

            {type === 'APTS' && roles && roles.includes('Procurement') ? (
              <div>
                {
                status === 'PENDING_PO' && (
                  <Button
                    variant="outline-success"
                    className="me-2 next-btn"
                    onClick={() => {
                      // approveOrder(uid);
                      setShowApproveOrderModal(true);
                      setApproveOrderId(uid);
                      setOrderStatus('PENDING_PO');
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                    Generate PO
                  </Button>
                )
              }
              </div>
            ) : ''}
            {type === 'APTS' && ((status === 'PENDING_PAYMENT') || (status === 'PENDING')) && roles && roles.includes('Finance') ? (
              <Button variant="outline-success" className="me-2 next-btn" onClick={() => { setApproveOrderId(uid); setShowApproveOrderModal(true); setApproveType('Payment'); setOrderStatus('PENDING_PAYMENT'); }}>
                <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                Approve Payment
              </Button>
            ) : ''}
            {type === 'DEPARTMENT' && status === 'PENDING_PAYMENT' ? (
              <Button
                disabled={sent_amount === grand_total}
                variant="outline-success"
                className="me-2 next-btn"
                onClick={() => {
                  setOrderStatus('PENDING_PAYMENT');
                  setApproveOrderId(uid);
                  setShowApproveOrderModal(true);
                  setApproveType('Payment');
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                Upload Document
              </Button>
            ) : ''}

            {((type === 'APTS' && roles && roles.includes('Admin')) || (type === 'DEPARTMENT')) && (status === 'ORDERED' || status === 'ACCEPTED') ? (
              <Button
                variant="outline-success"
                className="me-2 next-btn"
                onClick={() => {
                  setOrderStatus('ORDERED');
                  setApproveOrderId(uid);
                  setShowApproveOrderModal(true);
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                Received
              </Button>
            ) : ''}
            {type === 'VENDOR' && status === 'ORDERED' ? (
              <Button
                variant="outline-success"
                className="me-2 next-btn"
                onClick={() => {
                  // approveOrder(uid);
                  setOrderStatus('ACCEPTED');
                  setApproveOrderId(uid);
                  setShowApproveOrderModal(true);
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} className="me-1 color-white" />
                Accept
              </Button>
            ) : ''}
            <h5 className="m-auto product-added">
              {' '}
              Status :
              {' '}
              {statusName}
            </h5>
          </div>
        </div>
      </Card>
      {(!(status === 'ORDERED' || status === 'ACCEPTED') && totalPrice <= 1000000) && (
        <div className="order-details-style1 d-flex justify-content-center">
          <Alert key="warning" variant="warning">
            Since the total order amounts for the last 30 days exceeded the monthly limit, you are
            viewing this order.
          </Alert>
        </div>
      )}
      <Card className="p-3 rounded">
        <Row>
          <Col xs={12} md={4}>
            <div className="order-details-style2">
              <p className="mb-0">
                <span className="vender-text">Reference No : </span>
                {' '}
                {referenceNo}
              </p>
            </div>
            <div className="order-details-style2">
              <p className="mb-0">
                <span className="vender-text mr-5">Order No : </span>
                {' '}
                {uid}
              </p>
            </div>
            <div className="address-style">
              <p className="mb-0">
                <span className="vender-text">Grand Total </span>
                <span>(incl all taxes)</span>
                <span className="vender-text"> :</span>
                {' '}
                <span className="fw-bold text-success">
                  {type === 'VENDOR' ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice) : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(grand_total)}
                </span>
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <p className="vender-text  mb-1">Shipping Address</p>
            <p className="mb-0">
              {departmentName}
            </p>
            <p className="mb-0">
              {addressLine1}
              {addressLine2 ? `${addressLine2}` : ''}
            </p>
            <p className="mb-0">
              {city}
              ,
              {' '}
              {stateName}
              {' '}
              -
              {' '}
              {pincode}
            </p>
          </Col>
          <Col xs={12} md={4}>
            <p className="vender-text mb-1">Billing Address</p>
            <p className="mb-0">
              {departmentName}
            </p>
            <p className="mb-0">
              {billingAddress1}
              {billingAddress2 ? `${billingAddress2}` : ''}
            </p>

            <p className="mb-0">
              {billingCity}
              ,
              {' '}
              {billingStateName}
              {' '}
              -
              {' '}
              {billingPincode}
            </p>
          </Col>

        </Row>
      </Card>
      <Card>
        {renderTable()}
      </Card>
      <Card>
        <Card.Header className="bg-transparent">
          <h5 className="sub-total"> Order History</h5>
        </Card.Header>
        {renderOrderHistoryTable()}
      </Card>
    </div>
  );
}
