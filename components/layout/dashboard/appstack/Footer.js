import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="text-muted">
          <Col xs="6" className="d-flex justify-content-start">
            <ul className="list-inline">
              <li className="list-inline-item">
                <span className="text-muted" href="#">
                  Support
                </span>
              </li>
              <li className="list-inline-item">
                <span className="text-muted" href="#">
                  Help Center
                </span>
              </li>
              <li className="list-inline-item">
                <span className="text-muted" href="#">
                  Privacy
                </span>
              </li>
              <li className="list-inline-item">
                <span className="text-muted" href="#">
                  Terms of Service
                </span>
              </li>
            </ul>
          </Col>
          <Col xs="6" className="d-flex justify-content-end">
            <p className="mb-0">
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              -
              {' '}
              <span href="/" className="text-muted">
                APTS
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
