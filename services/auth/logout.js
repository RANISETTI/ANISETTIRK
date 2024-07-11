import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import axiosInstance from "../config";
import getHeaders from "../../libs/utils/getHeaders";

export async function logoutProxyService(accessToken, username, sessionid) {
  //
  const headers = getHeaders(accessToken);
  try {
    if (sessionid) {
      const data = await axiosInstance.post("/auth/logout/", {
        sessionid,
        username,
        isParichayUser: true,
      });
    } else {
      const data = await axiosInstance.post("/auth/logout/", {}, { headers });
    }
    return { data };
  } catch (error) {
    const {
      response: { data, status, statusText },
    } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = camelcaseKeys(data, { deep: true });
    } else {
      errors.nonFieldErrors = [statusText, "Please try later"];
    }
    return { errors };
  }
}

export async function logoutService(accessToken) {
  try {
    console.log("logout api called ", accessToken);
    const { data } = await axios.post("/api/logout", { accessToken });
    return { data };
  } catch (error) {
    const {
      response: { data, status, statusText },
    } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = data;
    } else {
      errors.nonFieldErrors = [statusText, "Please try later"];
    }
    return { errors };
  }
}
