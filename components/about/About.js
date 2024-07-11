import React from "react";
import { Container, Breadcrumb, Row, Col, Image } from "react-bootstrap";
import Link from 'next/link';

const renderAboutUsContent = () => (
  <div>
  <Container >
     <div className="apts-downloads-title">
        <h2 className="text-center apts-services-title p-4">About Us</h2>
      </div>
  <Row  className="g-4">
    <Col xs={12} md={4}>
    <Image src="/images/Aptslogo-1.png" alt="about" className="w-100 innerpages-img-borders"   />
    </Col>
    <Col xs={12} md={8} className="px-4 pt-2">
      <p className="about-content">Andhra Pradesh Technology Services (APTS) had its roots in 1986 as a wholly-government owned institution under the Information Technology Electronics and Communications (ITE&C) Department.</p>
      <p className="about-content">We have since then risen to become the flagship IT systems procurer and IT infrastructure developer for Andhra Pradesh, facilitating smoother operations for the various government departments through our hardware, software and technical support.</p>
      <p className="about-content">Service-based offerings have been our forte throughout the organization lifecycle. From consultancy services to Aadhaar-based services, from being the single point of contact for state IT procurement to enabling digital signatures for government employees, our range of service offerings has been to transition governance and simplify it for our various stakeholders.</p>
      <p className="about-content">Another area of focus for APTS has been managing and leading IT infrastructure development in the state. It is responsible for the management and operation of facilities like the Andhra Pradesh State Data Centre (APSDC), Andhra Pradesh State Software Defined Wide Area Network (APSDWAN), Andhra Pradesh Secretariat Campus Area Network (APSCAN), APCSOC and VC Management facilities.</p>
      <p className="about-content">APTS is currently in an important stage of its organization lifecycle, embracing and transitioning into Platform-as-a-Services (PaaS) offerings for various government departments and programs across multiple fields for citizen welfare.</p>
    </Col>
    </Row>
    </Container>
    </div>
)

export default function About() {
  return (
    <div>
      <div className="about-pg-bg">
        <div className="about-sec-pad">
          <Container className="position-relative">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href='/'>
                  <a className="text-dec-color">
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">About Us</Breadcrumb.Item>
            </Breadcrumb>
          <h2 className="text-white my-2 text-uppercase"> About APTS</h2>
          </Container>
        </div>
      </div>
      <div className="about-pg-content mb-5">
        {renderAboutUsContent()}
      </div>
    </div>
  );
}
