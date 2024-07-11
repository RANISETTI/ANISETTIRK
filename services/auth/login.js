import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import axiosInstance from "../config";

export async function loginProxyService(username, password, captcha) {
  try {
    const data = await axiosInstance.post("/auth/login/", {
      username,
      password,
      captcha,
    });
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

export async function loginService(
  username,
  password,
  captcha,
  isparichayuser
) {
  try {
    if (isparichayuser) {
      // for parichay user
      console.log("username", username, "isParichay", isparichayuser);
      const data = await axiosInstance.post("/auth/login/", {
        username,
        password,
        captcha,
        isparichayuser,
      });
      return { data };
    } else {
      const data = await axiosInstance.post("/auth/next/login/", {
        username,
        password,
        captcha,
        isparichayuser,
      });
      // const data = await axios.post('/api/login/', { username, password, captcha });
      return { data };
    }
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
