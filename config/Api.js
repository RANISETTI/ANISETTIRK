const categoriesBaseUrl = 'https://api.agnicart.com/api';
export const accessToken = '5a56251d010221caa299f1a0497b792b7256a429';
const baseUrl = 'https://apts.wmltech.com/api-server/api';

export const categoriesApi = {
  getAllCategories: (storeUid) => `${categoriesBaseUrl}/stores/${storeUid}/categories/`,
  getProductImages: (prodId, storeUid) => `${categoriesBaseUrl}/stores/${storeUid}/admin/products/${prodId}/images/`,
};

const Api = {
  postJobApplication: (id) => `${baseUrl}/jobs/${id}/apply/`,
  // getAttributes: (categoryId, options = []) => `${baseUrl}/categories/${categoryId}/attributes/?option_id=${options.join(',')}`,
  getAttributes: (categoryId, options) => `${baseUrl}/procurement/categories/${categoryId}/attributes/?option_ids=${options || ''}`,
  getProducts: (search, attributeOptions = [''], categories = '', page) => `${baseUrl}/procurement/products/?search=${search}&attribute_options=${attributeOptions.join(',')}&categories=${categories}&page=${page || 1}`,
  getQuotationCartItems: (quotUid) => `${baseUrl}/procurement/quotations/${quotUid}/items/`,
  quotationDetails: (quoteUid) => `${baseUrl}/procurement/quotations/${quoteUid}/`,
  addQuotations: `${baseUrl}/add-quotation-cart/`,
  addQuotationsInProcurement: `${baseUrl}/procurement/add-quotation-cart/`,
  quotationCartItems: `${baseUrl}/quotation-cart/`,
  getQuoteConsignee: `${baseUrl}/quotation-consignee/`,
  addConsigneeToQuotations: (quoteId, consigneeId) => `${baseUrl}/procurement/quotations/${quoteId}/items/${consigneeId}/consignees/`,
  editConsigneeToQuotations: (quotationId, itemId, consigneeId) => `${baseUrl}/procurement/quotations/${quotationId}/items/${itemId}/consignees/${consigneeId}/`,
  addConsigneeAdmin: `${baseUrl}/procurement/consignee//`,
  checkout: `${baseUrl}/procurement/quotations/`,
  getQuotationItems: (page) => `${baseUrl}/procurement/quotation-cart/?page=${page || 1}`,
  getQuotationConsignees: (quoteUid, page) => `${baseUrl}/procurement/quotations/${quoteUid}/consignees/?page=${page || 1}`,
  editQuotationConsignees: (quoteUid, consigneeId) => `${baseUrl}/procurement/quotations/${quoteUid}/consignees/${consigneeId}/`,
  getCategories: `${baseUrl}/procurement/categories/`,
  getCategoryByID: (categoryId) => `${baseUrl}/procurement/categories/${categoryId}/`,
  getAttribute: (categoryId, optionIds) => `${baseUrl}/procurement/categories/${categoryId}/attributes?option_ids=${optionIds}`,
  getConsignees: `${baseUrl}/procurement/consignee/`,

  getTandC: `${baseUrl}/terms-and-conditions/`,
  getAdminTandC: `${baseUrl}/admin/terms-and-conditions/`,
  getChildAdminTandC: (id) => `${baseUrl}/admin/terms-and-conditions/?parent=${id}`,
  getAdminTandCQuestion: (TandCId) => `${baseUrl}/admin/terms-and-conditions/${TandCId}/questions/`,
  postTandC: (quotationId) => `${baseUrl}/procurement/quotations/${quotationId}/terms-and-conditions/`,
  postTermsAndConditions: (quotationId) => `${baseUrl}/procurement/quotations/${quotationId}/create/terms-and-conditions/`,
  deleteTermsAndConditions: (quotationId, id) => `${baseUrl}/procurement/quotations/${quotationId}/terms-and-conditions/${id}/`,
  getTermsAndConditions: (quotationId) => `${baseUrl}/procurement/quotations/${quotationId}/terms-and-conditions/`,
  deleteTandC: (quotationId, tAndCId) => `${baseUrl}/procurement/quotations/${quotationId}/terms-and-conditions/${tAndCId}`,
  // products
  getProductDetail: (prodId) => `${baseUrl}/procurement/products/${prodId}/`,
  addToCart: `${baseUrl}/procurement/cart/`,
  cartCheckout: `${baseUrl}/procurement/cart/checkout/`,
  cartCheckoutByID: (cartId) => `${baseUrl}/procurement/cart/checkout/${cartId}/`,
  getOrAddAddress: (departmentId) => `${baseUrl}/departments/${departmentId}/addresses/`,
  getOrPatchAddress: (departmentId, addressID) => `${baseUrl}/departments/${departmentId}/addresses/${addressID}/`,
  patchOrderDetails: (orderId) => `${baseUrl}/procurement/orders/${orderId}/`,
  changeOrderStatus: (orderId) => `${baseUrl}/procurement/orders/${orderId}/update/status/`,
  orderHistory: (orderId) => `${baseUrl}/procurement/orders/${orderId}/history/`,
  getStates: `${baseUrl}/states/`,
  getDepartments: (search) => `${baseUrl}/admin/departments/?secretariat_departments=${true}&search=${search}`,
  getHodDepartments: (parentId) => `${baseUrl}/admin/departments/?hod_departments=${true}&parent=${parentId}`,
  getVcDepartments: `${baseUrl}/vc-departments/`,
  getVcLocations: `${baseUrl}/vc-locations/`,
};

export default Api;
