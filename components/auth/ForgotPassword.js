import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import forgotPasswordService from '../../services/auth/forgotPassword';
import generateCaptcha from '../../services/common/captcha';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    setIsLoading(true);
    console.log('log');
    forgotPasswordService(email, `${captchaKey}:${captchaValue}`)
      .then(({ data, errors: emailErrors }) => {
        if (emailErrors && Object.keys(emailErrors).length) {
          setErrors(emailErrors);
        } else {
          setEmailSent(true);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    generateCaptcha()
      .then(({ data, errors: captchaErrors }) => {
        if (captchaErrors && Object.keys(captchaErrors).length) {
          console.log('Captcha Generation Errors', captchaErrors);
        } else {
          const { key, url } = data;
          setCaptchaKey(key);
          setCaptchaUrl(url);
        }
      });
  }, [refreshCaptcha]);

  if (emailSent) {
    return (
      <Container className="container-base">
        <Row>
          <Col className="cust-card">
            <Card className="card-base">
              <Card.Header className="text-center"><h1 className="apts-signIn-title">Forgot Password</h1></Card.Header>
              <Card.Body className="text-center">
                <h3 className="text-success">Submitted successfully</h3>
                <p className="text-success">
                  If that email is in our database, an email will be sent with instructions to
                  reset your password.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="container-base">
      <Row>
        <Col className="cust-card">
          <Card className="card-base">
            <Card.Header className="text-center"><h1 className="apts-signIn-title">Forgot Password</h1></Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                      setErrors({ ...errors, email: '', non_field_errors: '' });
                    } else {
                      setErrors({ ...errors, email: 'Please enter a valid email' });
                    }
                  }}
                  isInvalid={errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  {captchaUrl && (
                    <img
                      src={captchaUrl}
                      alt="captcha"
                      className="mb-3"
                    />
                  )}
                  <FontAwesomeIcon icon={faRotate} size="2x" onClick={() => { setRefreshCaptcha(!refreshCaptcha); }} className="ms-3" />
                </Col>
                <Form.Group as={Col} md={5} className="my-auto" controlId="formCaptcha">
                  <Form.Control
                    type="text"
                    id="captchaValue"
                    name="captchaValue"
                    placeholder="Enter Captcha"
                    autoComplete="off"
                    value={captchaValue}
                    onChange={(e) => {
                      setCaptchaValue(e.target.value);
                      if (/^[A-Z]{6}$/.test(e.target.value)) {
                        setErrors({ ...errors, captcha: '', nonFieldErrors: '' });
                      } else {
                        setErrors({ ...errors, captcha: 'Captcha should be six characters long with all uppercase' });
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
              {errors.nonFieldErrors ? (
                <Alert variant="danger">
                  {errors.nonFieldErrors}
                </Alert>
              ) : ''}
              <Button variant="primary" type="submit" className="btn-md mb-4 w-100" disabled={!(Object.values(errors).filter((item) => item === '').length === Object.keys(errors).length)}>
                {isLoading && (
                <Spinner animation="border" role="status" size="sm" className="me-2" />
                )}
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
