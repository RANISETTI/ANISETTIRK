import camelcaseKeys from 'camelcase-keys';

export const serviceErrorHelper = (error) => {
  const err = error;
  const { response } = err;
  const { data, status, statusText } = response;
  let errors = {};
  if (status === 400 && data && Object.keys(data).length > 0) {
    errors = camelcaseKeys(data, { deep: true });
  } else {
    errors.nonFieldErrors = [statusText, 'Please try later'];
  }
  return errors;
};
export const serviceNoCamelCaseErrorHelper = (error) => {
  const err = error;
  const { response } = err;
  const { data, status, statusText } = response;
  let errors = {};
  if (status === 400 && data && Object.keys(data).length > 0) {
    errors = data;
  } else {
    errors.nonFieldErrors = [statusText, 'Please try later'];
  }
  return errors;
};

const responseValidator = (res, setLoading, setData) => {
  const { data, errors } = res;
  if (errors) {
    console.log('res error', errors);
    setLoading(false);
  }
  if (data) {
    setData(data);
    setLoading(false);
  } else {
    setData([]);
    setLoading(false);
  }
};

export default responseValidator;
