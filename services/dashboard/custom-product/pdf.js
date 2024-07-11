import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export async function getQuotationCartItemsService(accessToken, quotUid) {
  const headers = getHeaders(accessToken);

  try {
    const data = await axiosInstance.get(`/procurement/quotations/${quotUid}/items/`, { headers });
    return { data };
  } catch (error) {
    const { response: { data, status, statusText } } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = data;
    } else {
      errors.nonFieldErrors = [statusText, 'Please try later'];
    }
    return { errors };
  }
}
export async function getSelectedTermsAndConditions(accessToken, id) {
  const headers = getHeaders(accessToken);

  try {
    const data = await axiosInstance.get(`/procurement/quotations/${id}/terms-and-conditions/`, { headers });
    return { data };
  } catch (error) {
    const { response: { data, status, statusText } } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = data;
    } else {
      errors.nonFieldErrors = [statusText, 'Please try later'];
    }
    return { errors };
  }
}
