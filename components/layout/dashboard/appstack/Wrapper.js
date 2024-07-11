import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axiosInstance from "../../../../services/config";
import getHeaders from "../../../../libs/utils/getHeaders";
import { loginFailed } from "../../../auth/slices/LoginSlice";

export default function Wrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const router = useRouter();
  const headers = getHeaders(accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect for dashborrd");
    console.log("headers for the authuser", "headers", headers, "user", user);
    axiosInstance
      .get("/auth/user/", { headers })
      .then(() => {})
      .catch(() => {
        dispatch(loginFailed());
        if (router.pathname !== "/") {
          router.push("/");
        } else {
          router.reload();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  if (isLoading) {
    return (
      <div className="cust-spinner">
        <Spinner animation="border" />
      </div>
    );
  }

  return <div className="wrapper">{children}</div>;
}
