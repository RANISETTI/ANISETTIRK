import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner
} from 'react-bootstrap';
import { Eye, EyeOff } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import changePasswordService from '../../services/auth/changePasswordService';
import { logoutService } from '../../services/auth/logout';
import { loginFailed } from '../auth/slices/LoginSlice';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { accessToken } = useSelector((state) => state.user);

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const router = useRouter();

  const onSubmit = () => {
    setSubmitLoader(true);
    changePasswordService(accessToken, oldPassword, password, confirmPassword)
      .then(({ data, errors: passwordErrors }) => {
        if (passwordErrors && Object.keys(passwordErrors).length) {
          setErrors(passwordErrors);
        } else {
          // router.push('/dashboard');
          logoutService(accessToken)
            .finally(() => {
              dispatch(loginFailed());
              if (router.pathname !== '/user/login') {
                router.push('/user/login');
              } else {
                router.reload();
              }
            });
        }
      }).finally(() => setSubmitLoader(false));
  };

  return (
    <Container className="change-pass-sec pt-5">
      <Row>
        <Col className="cust-card">
          <Card className="card-base-1">
            <Card.Header className="text-center"><h1 className="apts-signIn-title">Change Password</h1></Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter Old Password"
                    type={showPassword.current ? 'text' : 'password'}
                    name="oldPassword"
                    id="oldPassword"
                    onChange={(e) => {
                      setOldPassword(e.target.value); setErrors({
                        ...errors,
                        old_password: '',
                      });
                    }}
                    isInvalid={!!errors.old_password}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })}
                  >
                    {showPassword.current ? <Eye size={18} className="align-middle" /> : <EyeOff size={18} className="align-middle" />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    { errors.old_password }
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter New Password"
                    type={showPassword.new ? 'text' : 'password'}
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value); setErrors({
                        ...errors,
                        new_password: '',
                      });
                    }}
                    isInvalid={!!errors.new_password}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => setShowPassword({
                      ...showPassword,
                      new: !showPassword.new,
                    })}
                  >
                    {showPassword.new ? <Eye size={18} className="align-middle" /> : <EyeOff size={18} className="align-middle" />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    { errors.new_password }
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter Password"
                    type={showPassword.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({
                        ...errors,
                        confirm_password: '',
                      });
                    }}
                    isInvalid={confirmPassword.length && password !== confirmPassword ? "Password didn't match" : errors.confirm_password}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => setShowPassword({
                      ...showPassword,
                      confirm: !showPassword.confirm,
                    })}
                  >
                    {showPassword.confirm ? <Eye size={18} className="align-middle" /> : <EyeOff size={18} className="align-middle" />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm_password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              {confirmPassword.length && password !== confirmPassword ? (
                <Alert variant="danger">
                  Password didn't match
                </Alert>
              ) : ''}
              {errors.non_field_errors ? (
                <Alert variant="danger">
                  {errors.non_field_errors}
                </Alert>
              ) : ''}
              <Button variant="primary" type="submit">
                {submitLoader && (
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
