import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginService } from '../../services/auth/login';
import generateCaptcha from '../../services/common/captcha';
import { updateUser } from './slices/LoginSlice';
import Select from 'react-select';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = () => {
    setIsLoading(true);
    loginService(username, password, `${captchaKey}:${captchaValue}`)
      .then(({ data, errors: loginErrors }) => {
        if (loginErrors && Object.keys(loginErrors).length) {
          setRefreshCaptcha(true);
          setErrors(loginErrors);
          setIsLoading(false);
        } else {
          const { key: accessToken, details: userDetails } = data;
          dispatch(updateUser({ isLoggedIn: true, accessToken, userDetails }));
          router.push('/dashboard');
        }
      });
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
    <Container className="container-base">
      <Row>
        <Col className="cust-card">
          <Card className="card-base">
            <Card.Header className="text-center"><h1 className="apts-signIn-title">Sign UP</h1></Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department</Form.Label>
                <Select placeholder='Select Department' />
                <Form.Control.Feedback type="invalid">
                  { errors.email }
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  onChange={(e) => { setUsername(e.target.value); setErrors([]); }}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  { errors.email }
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  type="number"
                  id="mobile"
                  name="mobile"
                  autoComplete="off"
                  placeholder="Mobile No"
                  onChange={(e) => { setUsername(e.target.value); setErrors([]); }}
                  isInvalid={!!errors.mobile}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  { errors.mobile }
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  { errors.password }
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.confirm_password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  { errors.confirm_password }
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
                    onChange={(e) => setCaptchaValue(e.target.value)}
                    isInvalid={!!(captchaValue.length > 6
                      ? 'Captcha should be six characters'
                      : errors.captcha)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {captchaValue.length > 6
                      ? 'Captcha should be six characters'
                      : errors.captcha}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              {/* <input hidden {...register("captchaKey")} value={captchaKey} /> */}
              {errors.nonFieldErrors ? (
                <Alert variant="danger">
                  { errors.nonFieldErrors }
                </Alert>
              ) : ''}
              <Button variant="primary" type="submit" className="btn-md mb-4 w-100">
                Submit
              </Button>
              <Form.Control.Feedback type="invalid">
                { errors.nonfield_errors }
              </Form.Control.Feedback>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}
