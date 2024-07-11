import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import generateCaptcha from "../../../services/common/captcha";
import contactService from "../../../services/contact";

const renderAddress = () => (
  <Card className="apts-contact-us-card">
    <FontAwesomeIcon
      icon={faLocationDot}
      className="apts-contact-us-card-icon"
    />
    <Card.Body>
      <Card.Title className="apts-contact-us-card-title">
        Our Address
      </Card.Title>
      <Card.Text className="text-center">
        Andhra Pradesh Technology Services Ltd, 3rd Floor, R&amp;B Building, MG
        Road, Labbipet, Vijayawada-520010, Andhra Pradesh, INDIA.
      </Card.Text>
    </Card.Body>
  </Card>
);

const renderEmail = () => (
  <Card className="apts-contact-us-card">
    <FontAwesomeIcon icon={faEnvelope} className="apts-contact-us-card-icon" />
    <Card.Body>
      <Card.Title className="apts-contact-us-card-title">Email Us</Card.Title>
      <Card.Text className="text-center">
        service-apts[at]ap[dot]gov[dot]in
      </Card.Text>
    </Card.Body>
  </Card>
);

function RenderMobileNumber() {
  const { asPath } = useRouter();
  const value = asPath.split("/").slice(-1)[0];
  switch (value) {
    case "consultancy":
      return "0866-2468139";
    case "aadhar-services":
      return "0866-2468147";
    case "procurement":
      return "0866-2468120";
    case "cyber-security":
      return "0866-2468160";
    case "digital-signature":
      return "0866-2468153";
    case "empanelment":
      return "0866-2468145";
    case "apswan":
      return "0866-2468146";
    case "apsdc":
      return "0866-2468147";
    case "apscan":
      return "0866-2468146";
    case "apcsoc":
      return "9963029417";
    case "vc-management":
      return "9963029417";
    default:
      return "0866-2468108";
  }
}

const renderPhone = () => (
  <Card className="apts-contact-us-card">
    <FontAwesomeIcon icon={faPhone} className="apts-contact-us-card-icon" />
    <Card.Body>
      <Card.Title className="apts-contact-us-card-title">Call Us</Card.Title>
      <Card.Text className="text-center">{RenderMobileNumber()}</Card.Text>
    </Card.Body>
  </Card>
);
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { handleSubmit } = useForm();

  const generateCaptchaValue = () => {
    generateCaptcha().then(({ data, errors: captchaErrors }) => {
      if (captchaErrors && Object.keys(captchaErrors).length) {
        console.log("Captcha Generation Errors", captchaErrors);
      } else {
        const { key, url } = data;
        setCaptchaKey(key);
        setCaptchaUrl(url);
      }
      // setTimeout(() => generateCaptchaValue(), 20000);
    });
  };

  useEffect(() => {
    generateCaptchaValue();
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    contactService(
      name,
      email,
      subject,
      message,
      `${captchaKey}:${captchaValue}`
    )
      .then(({ data, errors }) => {
        if (errors && Object.keys(errors).length) {
          setErrors(errors);
          generateCaptchaValue();
        }
        if (data) {
          const { detail } = data;
          setSuccessMessage(detail);
          generateCaptchaValue();
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setCaptchaValue("");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const renderSuccessMessage = () => (
    <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
      {successMessage}
    </Alert>
  );

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="apts-contact-us pad-y-3rem-x-0">
      <Container>
        <div className="apts-services-title pad-0-0-3-0">
          <h2 className="text-center m-4">Contact Us</h2>
        </div>
        <Row className="g-4">
          <Col>
            <Row className="mb-3">
              <Col md={12}>{renderAddress()}</Col>
            </Row>
            <Row>
              <Col md={7} className="d-md-flex flex-xl-column">
                {renderEmail()}
              </Col>
              <Col md={5} className="d-md-flex flex-xl-column">
                {renderPhone()}
              </Col>
            </Row>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)} className="">
              <Form.Control
                type="text"
                placeholder="Your Name"
                className="mb-3"
                name="name"
                value={name}
                autoComplete="off"
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Form.Control
                type="email"
                placeholder="Your Email"
                className="mb-3"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      e.target.value
                    )
                  ) {
                    setErrors({ ...errors, email: "" });
                  } else {
                    setErrors({
                      ...errors,
                      email: "Please enter a valid email",
                    });
                  }
                }}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control
                type="text"
                placeholder="Subject"
                className="mb-3"
                value={subject}
                autoComplete="off"
                onChange={(e) => {
                  setSubject(e.target.value);
                  setErrors([]);
                }}
                isInvalid={!!errors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {errors.subject}
              </Form.Control.Feedback>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Message"
                autoComplete="off"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrors([]);
                }}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
              <Row className="mb-1">
                <Col className="mt-3 mb-2">
                  {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                  <FontAwesomeIcon
                    icon={faRotate}
                    size="2x"
                    onClick={() => {
                      generateCaptchaValue();
                    }}
                    className="mar-L-30"
                  />
                </Col>
                <Form.Group
                  as={Col}
                  md={5}
                  className="my-auto mt-3 mb-2"
                  controlId="formCaptcha"
                >
                  <Form.Control
                    type="text"
                    id="captchaValue"
                    name="captchaValue"
                    placeholder="Enter Captcha"
                    autoComplete="off"
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
              <Form.Control.Feedback type="invalid">
                {errors.non_field_errors}
              </Form.Control.Feedback>
              {successMessage ? renderSuccessMessage() : ""}
              <div className="text-center">
                <Button
                  variant="transparent"
                  onClick={() => onSubmit()}
                  className="apts-contact-us-button"
                >
                  Send Message
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
