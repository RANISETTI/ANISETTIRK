const getHeaders = (accessToken, multipart = false) => {
  const headers = { 'content-type': 'application/json' };
  if (accessToken) {
    headers.Authorization = `Token ${accessToken}`;
  }
  if (multipart) {
    headers['content-type'] = 'multipart/form-data';
  }
  return headers;
};

export default getHeaders;
