import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export default async function getTenderApplicationsService(accessToken, page, search) {
  const headers = getHeaders(accessToken);
  try {
    const apiPath = page ? `/admin/tender/applications/?page=${page}` : search ? `/admin/tender/applications/?search=${search}` : '/admin/tender/applications/';
    const data = await axiosInstance.get(apiPath, { headers });
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
