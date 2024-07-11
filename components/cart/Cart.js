import { faTrashAlt   } from '@fortawesome/free-regular-svg-icons';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Image, Spinner, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import getCartProductsService, { deleteCartProductsService, editCartProductsService, handleCheckout } from '../../services/dashboard/cart';
import { updateCart } from './slice/cartSlice';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [itemsQuantity, setItemQuantity] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productId, setProductId] = useState(0);
  const [cartTotal, setCartTotal] = useState('');
  const [action, setAction] = useState('');
  const [cartProductsData, setCartProductsData] = useState([]);
  const router = useRouter();
  const { query: { step } } = router;
  const [activeTab, setActiveTab] = useState(step || 'cart');
  const { accessToken,userDetails } = useSelector((state) => state.user);
  const cart = useSelector((reduxStore) => reduxStore.cart);
  const dispatch = useDispatch();

  const getCartProducts = () => {
    getCartProductsService(accessToken)
      .then(({ data: { items, quantity, total } }) => {
        setItemQuantity(quantity);
        setCartTotal(total);
        setCartProductsData(items);
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    router.push({
      pathname: '/dashboard/procurement/cart',
      query: { step: activeTab },
    });
  }, [activeTab]);

  useEffect(() => {
    if (productQuantity && productId) {
      editCartProductsService(accessToken, productQuantity, productId)
        .then(({ data }) => {
          getCartProducts();
        });
    }
    if (action) {
      deleteCartProductsService(accessToken, productId)
        .then(({ data }) => {
          getCartProducts();
        });
    }
  }, [productId, productQuantity]);

  const updateCartStepToAddress = (data) => {
    dispatch(updateCart({ cart: data }));
    router.push({
      pathname: '/dashboard/procurement/new/checkout/[orderId]',
      query: { orderId: data.order_id, total_price: data.total_price },
    });
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

  console.log('file: Cart.js ~ line 82 ~ Cart ~ cartTotal', cartTotal);

  const renderCartItems = () => {
    const items = cartProductsData.map((item) => (
      <tr>
        <td className="p-2 cust-width-cart">
          {item.product.featured_image ? <Image className="w-100 m-auto bordered bg-light obj-fit" src={item.product.featured_image && item.product.featured_image} /> : <Image src="/images/no_image.jpg" className="w-100 h-100 m-auto bordered bg-light" />}
        </td>
        <td className="wid-35-per">
          <div>
            <Link href={`/dashboard/procurement/new/product/${item.product.id}`}>
              <a>
                <p className="font-weight-bold cart-title product-title m-0">{item.product && item.product.title}</p>
              </a>
            </Link>
            <p className="product-price1 m-0">
              {item.product &&  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.product.price)}
            </p>
            <p className="part-number1 m-0">{item.vendor && item.vendor.name}</p>
          </div>
        </td>
        <td className="wid-25-per">
          <button
            type="button"
            disabled={item.quantity === 1}
            onClick={() => {
              setProductQuantity(item.quantity - 1);
              setProductId(item.id);
            }}
            className="cart-quantity-incrementor cart-border-radius"
          >
            -
          </button>
          <span className="cart-quantity-placeholder">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => {
              setProductQuantity(item.quantity + 1);
              setProductId(item.id);
            }}
            className="cart-quantity-incrementor cart-border-radius1"
          >
            +
          </button>
        </td>
        <td className="product-price1 wid-20-per">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.total)}
        </td>
        <td className="wid-5-per text-center">
          <FontAwesomeIcon className="text-danger" type="button" icon={faTrash} onClick={() => { setAction('Delete'); setProductId(item.id); }} />
        </td>
      </tr>
    ));

    return (
      <Card className="bg-white w-100 pt-2 rounded mb-5">
        <Card.Header className="bg-transparent">
          <h2 className="your-cart">Your Cart</h2>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table bordered className="mb-4">
              <thead>
                <tr>
                  <th>Product Picture</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </Table>
          </div>
          <div className="d-flex flex-column  w-100 font-weight-bold">
            <p className="sub-total font-20 text-end">
              Sub Total : &nbsp;&nbsp;
              <span>
                 {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartTotal)}
              </span>
            </p>
            {cartTotal >= 50000000
              ? (
                <div className="py-3 text-center">
                  <h4 className="py-3 text-center product-attribute">Your total is grater than 5crores please contact APTS  department</h4>
                </div>
              ) : (
                cartTotal > 1000000
                  ? (
                    <Button
                      variant="primary"
                      className="align-self-end go-to-cart my-3"
                      onClick={() => router.push('/dashboard/procurement/cart/request-approval')}
                    >
                      Checkout
                    </Button>
                  )
                  : (
                    <Button
                      variant="primary"
                      className="align-self-end go-to-cart my-3"
                      // onClick={() => handleCheckout(accessToken, updateCartStepToAddress)}
                      onClick={() => router.push('/dashboard/procurement/cart/address-step')}
                    >
                      Checkout
                    </Button>
                  )
              )}
          </div>
        </Card.Body>
      </Card>
    );
  };

  const cartStep = () => (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">

      {cartProductsData.length ? renderCartItems() : (
        <Card className="p-5">

          <div>
            <Image src="/images/empty-cart.png" className="w-100 h-100 rounded m-auto bordered bg-light" />
          </div>
          <h4 className="py-3 text-center product-attribute">Your Cart Is Empty</h4>
          <Button variant="danger" className="mx-4 continue-browsing px-4" onClick={() => router.push('/dashboard/procurement/new')}> Continue Browsing</Button>
        </Card>
      )}
    </div>
  );

  return cartStep();
}
