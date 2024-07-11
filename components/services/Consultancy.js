import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Consultancy() {
  return (
    <div className="services-bg">
    <Container>
      <h2 className="text-center p-4 apts-services-title">CONSULTANCY</h2>
      <Row className="g-4 mb-4">
        <Col xs={12} md={4}>
          <Image src="/images/Consultancy_BG_1.jpg" alt="CONSULTANCY" className="w-100 shadow innerpages-img-borders1" />
        </Col>
        <Col xs={12} md={8} className='cust-line-height'>
         <p>AP Technology services has decades of experience in dealing with many IT initiatives and comes with strong domain knowledge in the eGovernance projects and Processes in the public sector. APTS can offer the below consulting services to Government Departments/ Government Companies/ Corporations, Government Aided Bodies/ Institutions:</p>
            <ol>
              <li>Preparation of Feasibility Reports, System/ Technical Architecture reviews</li>
              <li>Project Development for eGovernance Projects</li>
              <li>Vetting the Cost/ Effort Estimates</li>
              <li>Project Management for IT initiatives</li>
              <li>Establishment of PMUs &amp; Center of Excellences</li>
              <li>IT Strategy/ Roadmap preparation </li>
              <li>Identification of Service providers for Manpower / Project development requests</li>
            </ol>
        </Col>
      </Row>
      </Container>
  </div>
  )
}
