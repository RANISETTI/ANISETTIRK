import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import {
  Button, Card
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckout } from '../../services/dashboard/cart';
import { updateCart } from './slice/cartSlice';

export default function RequestApproval({ handleNextClick }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken } = useSelector((state) => state.user);

  const callbackFunction = (data) => {
    dispatch(updateCart({ cart: data }));
    router.push({
      pathname: '/dashboard/procurement/new/checkout/[orderId]',
      query: { step: 'addressStep', orderId: data.order_id },
    });
  };

  return (
    <Card className="mx-5 pad-10">
      <div className="p-5 bg-white all-center">
        <FontAwesomeIcon size="5x" icon={faCartArrowDown} color="#36bd93" />
        <h4 className="color-pink">Your cart total is greater than 10 lakhs </h4>
        <p className="purple text-center">Your request will be forwarded to APTS for approval after placing order.</p>
        <Button
          variant="primary"
          className="align-self-end mt-4 continue-browsing px-3"
          onClick={() => router.push('/dashboard/procurement/cart/address-step')}
        >
          Continue to Checkout
        </Button>
      </div>
    </Card>
  );
}
