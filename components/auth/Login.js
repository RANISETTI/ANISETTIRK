import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginService } from "../../services/auth/login";
import generateCaptcha from "../../services/common/captcha";
import { updateUser } from "./slices/LoginSlice";

let isFirstRender = true;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitLoader, setSubmitLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const userCheck = async (userString, isparichayuser) => {
    let response = {};
    if (isparichayuser) {
      // for parichay user
      await loginService(userString, "res", "tes", true).then((res) => {
        response = { ...res };
      });
    } else {
      await loginService(
        username,
        password,
        `${captchaKey}:${captchaValue}`,
        false
      ).then((res) => {
        response = { ...res };
      });
    }
    return response;
  };

  useEffect(() => {
    if (isFirstRender) {
      (async () => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });
        if (params.string) {
          //from the parichay page
          const userString = params.string;
          console.log("userString", userString);
          const { data, errors: loginErrors } = await userCheck(
            userString,
            true
          );
          if (loginErrors && Object.keys(loginErrors).length) {
            setRefreshCaptcha(true);
            // setCaptchaValue("");
            setErrors(loginErrors);
            // setSubmitLoader(false);
          } else {
            const {
              key: accessToken,
              details: userDetails,
              sessionid: sessionid,
            } = data;
            console.log("data of the user", data);
            dispatch(
              updateUser({
                isLoggedIn: true,
                accessToken,
                userDetails,
                sessionid,
                userString,
              })
            );
            router.push("/dashboard");
          }
        }
      })();
      isFirstRender = false;
    }
  }, []);

  const onSubmit = async () => {
    setSubmitLoader(true);
    const { data, errors: loginErrors } = await userCheck("", false);
    if (loginErrors && Object.keys(loginErrors).length) {
      setRefreshCaptcha(true);
      setCaptchaValue("");
      setErrors(loginErrors);
      setSubmitLoader(false);
    } else {
      const { key: accessToken, details: userDetails } = data;
      dispatch(updateUser({ isLoggedIn: true, accessToken, userDetails }));
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    generateCaptcha().then(({ data, errors: captchaErrors }) => {
      if (captchaErrors && Object.keys(captchaErrors).length) {
        console.log("Captcha Generation Errors", captchaErrors);
      } else {
        const { key, url } = data;
        setCaptchaKey(key);
        setCaptchaUrl(url);
      }
    });
  }, [refreshCaptcha]);

  const departmentSingInHandler = async () => {
    console.log("Department Button clicked");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/parichay/login/`
    ).then((res) => {
      return res.json();
    });
    console.log("res from the parichay,", response);
    router.push(response);
  };

  return (
    <Container className="container-base">
      <Row>
        <Col className="col-sm-4"></Col>
        <Col className="col-sm-5">
          <Card className="card-base">
            <Card.Header
              className="text-center"
              style={{ background: "transparent" }}
            >
              <h1 className="apts-signIn-title" style={{ marginBottom: "0" }}>
                Sign in
              </h1>
            </Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  // id="username"
                  name="username"
                  autoComplete="off"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({ ...errors, nonFieldErrors: "" });
                  }}
                  isInvalid={!!errors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    // id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, nonFieldErrors: "" });
                    }}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye size={18} className="align-middle" />
                    ) : (
                      <EyeOff size={18} className="align-middle" />
                    )}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  {captchaUrl && (
                    <img
                      src={captchaUrl}
                      alt="captcha"
                      style={{ minWidth: "200px" }}
                      className="mb-3"
                    />
                  )}
                  <FontAwesomeIcon
                    style={{ width: "40px;" }}
                    icon={faRotate}
                    size="2x"
                    onClick={() => {
                      setRefreshCaptcha(!refreshCaptcha);
                    }}
                    className="ms-3"
                  />
                </Col>
                <Form.Group
                  as={Col}
                  md={5}
                  className="my-auto"
                  controlId="formCaptcha"
                >
                  <Form.Control
                    type="text"
                    // id="captchaValue"
                    name="captchaValue"
                    placeholder="Enter Captcha"
                    autoComplete="off"
                    value={captchaValue}
                    onChange={(e) => {
                      setCaptchaValue(e.target.value);
                      if (/^[A-Z]{6}$/.test(e.target.value)) {
                        setErrors({
                          ...errors,
                          captcha: "",
                          nonFieldErrors: "",
                        });
                      } else {
                        setErrors({
                          ...errors,
                          captcha:
                            "Captcha should be six characters long with all uppercase",
                        });
                      }
                    }}
                    isInvalid={errors.captcha}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.captcha}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              {/* <input hidden {...register("captchaKey")} value={captchaKey} /> */}
              <Row className="mb-2">
                <Form.Group as={Col} md={6} xs={12} className="mb-2">
                  <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12} className="mb-2">
                  <Link href="/forgot-password">
                    <a className="float-md-end">Forgot Password ?</a>
                  </Link>
                </Form.Group>
              </Row>
              {errors.nonFieldErrors ? (
                <Alert variant="danger">{errors.nonFieldErrors}</Alert>
              ) : (
                ""
              )}
              <Button
                variant="primary"
                style={{ marginLeft: "0" }}
                type="submit"
                className="signin-btn btn-md mb-3 w-100"
                disabled={
                  !(
                    Object.values(errors).filter((item) => item === "")
                      .length === Object.keys(errors).length
                  )
                }
              >
                {submitLoader && (
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    className="me-2"
                  />
                )}
                SIGN IN
              </Button>
              <hr style={{ margin: "0 0 10px 0", padding: "0px" }} />
              <h6
                style={{
                  margin: "0 0 10px 0",
                  padding: "0px",
                  textAlign: "center",
                }}
              >
                Department User ?
              </h6>
              <Button
                onClick={departmentSingInHandler}
                type="button"
                style={{ marginLeft: "0" }}
                className="btn-parichay btn-md mb-4 w-100"
              >
                Login with Parichay (SSO)
              </Button>
              {/* <Form.Group className="my-3 text-center">
                For department users,
                <span>
                  <Link href="/user/register" passHref>
                    <a className="float-md">
                      {' '}
                      Register Here
                    </a>
                  </Link>
                </span>
              </Form.Group> */}
            </Form>
          </Card>
        </Col>
        <Col className="col-sm-3"></Col>
      </Row>
    </Container>
  );
}
