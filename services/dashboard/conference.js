import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';


export default async function getServices(accessToken, apiPath) {
  const headers = getHeaders(accessToken);
  try {
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

export async function deleteSlotService(accessToken,slotId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/conferences/${slotId}/`,{ headers });
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

export async function cancelSlotService(accessToken,slotId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/conferences/${slotId}/cancelled/`, {},{ headers });
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
// export async function getAllPublicBookings() {
//   try {
//     const data = await axiosInstance.get('/')
//   }
// }
