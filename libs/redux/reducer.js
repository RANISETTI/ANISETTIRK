import user from '../../components/auth/slices/LoginSlice';
import sidebar from '../../components/layout/dashboard/slices/SidebarSlice';
import quotation from '../../components/procurements/slice/QuotationSlice';
import cart from '../../components/cart/slice/cartSlice';

const reducer = {
  user,
  sidebar,
  quotation,
  cart,
};

export default reducer;
