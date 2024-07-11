import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import axiosInstance from "../config";

export async function getCheckListAssests(headers) {
  try {
    const data = await axiosInstance.get("admin/checklist-assets/", {
      headers,
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

export async function postCheckListAssests(formData) {
  try {
    const data = await axiosInstance.post("/admin/checklist-assets/", formData);
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
