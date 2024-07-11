import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Alert,
  Button, Card, Col, Container, Form, InputGroup, Row, Spinner
} from 'react-bootstrap';
import { Eye, EyeOff } from 'react-feather';
import { useForm } from 'react-hook-form';
import resetPasswordService from '../../services/auth/resetPassword';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [submitLoader, setSubmitLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const { handleSubmit } = useForm();

  const router = useRouter();
  const uidb64 = router.asPath.split('/')[4];
  const token = router.asPath.split('/')[5];

  const onSubmit = () => {
    setSubmitLoader(true);
    resetPasswordService(password, confirmPassword, uidb64, token)
      .then(({ data, errors: passwordErrors }) => {
        if (passwordErrors && Object.keys(passwordErrors).length) {
          setErrors(passwordErrors);
        } else {
          router.push('/user/login');
        }
      }).finally(() => setSubmitLoader(false));
  };

  return (
    <Container className="container-base" style={{ paddingTop: '15px' }}>
      <Row>
        <Col>
          <Card className="card-base-reset-password">
            <Card.Header className="text-center" style={{ backgroundColor: '#fff' }}>
              <h1>Reset Password</h1>
            </Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter Password"
                    type={showPassword.new ? 'text' : 'password'}
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({
                        ...errors,
                        password: '',
                      });
                    }}
                    isInvalid={!!errors.password}
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
                    { errors.password }
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
                    isInvalid={confirmPassword.length && password !== confirmPassword ? "Password didn't match" : '' || errors.confirm_password}
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
                    {errors.confirm_password }
                  </Form.Control.Feedback>
                </InputGroup>
                {confirmPassword.length && password !== confirmPassword ? (
                  <Alert variant="danger">
                    Password didn't match
                  </Alert>
                ) : ''}
                <Form.Control.Feedback type="invalid">
                  { errors.non_field_errors }
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={(confirmPassword.length > 0 && password !== confirmPassword)}>
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
