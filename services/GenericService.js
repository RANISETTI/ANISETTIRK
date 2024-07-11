import camelcaseKeys from 'camelcase-keys';
import axiosInstance from './config';
import { serviceErrorHelper, serviceNoCamelCaseErrorHelper } from './ServiceHelpers';

export async function genericGetService(apiPath, headers) {
  try {
    return { data: camelcaseKeys(await axiosInstance.get(apiPath, { headers }), { deep: true }) };
  } catch (error) {
    return { errors: serviceErrorHelper(error) };
  }
}
export async function genericNoCamelCaseGetService(apiPath, headers) {
  try {
    return { data: await axiosInstance.get(apiPath, { headers }) };
  } catch (error) {
    return { errors: serviceNoCamelCaseErrorHelper(error) };
  }
}

export async function genericPatchService(apiPath, values, headers) {
  try {
    return {
      data: camelcaseKeys(await axiosInstance.patch(apiPath, values, { headers }), { deep: true }),
    };
  } catch (error) {
    return { errors: serviceErrorHelper(error) };
  }
}

export async function genericDeleteService(apiPath, headers) {
  try {
    return { data: await axiosInstance.delete(apiPath, { headers }) };
  } catch (error) {
    return { errors: serviceErrorHelper(error) };
  }
}
