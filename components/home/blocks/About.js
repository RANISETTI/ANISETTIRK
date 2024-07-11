import { useRouter } from 'next/router';
import React from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';


export default function AboutUs() {
  const router = useRouter();
  return (
    <div className="apts-about-us">
      <div className='py-5 sm-py-0'>
        <Container className="about-us-img">
          <Row xs={1} md={2} className="my-4">
            <Col className="apts-about-us-heading cust-head">
              <h2>ABOUT APTS</h2>
              <p>Andhra Pradesh Technology Services (APTS) is a wholly-owned Government Company incorporated in the year 1986. Under the administrative control of Information Technology, Electronics & Communication Department (ITE&C) Department, APTS is a self sustained company, offering wide-ranging of services including Implementation of IT and Infrastructure Projects, IT Consultancy Services, Information Security Assurance Services & Procurement of Infrastructure for Departments.</p>
              <Button
                className="apts-about-us-button"
                onClick={() => router.push('/about-us')}
              >Learn More</Button>
            </Col>
            <Col>
            <div  className="img">
            <Image
                src="/images/about-us-banner.jpg"
                className="d-block mx-lg-auto img-fluid img-border-radius"
                alt="about"
              />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
