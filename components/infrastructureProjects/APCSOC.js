import React from 'react';

import { Container, Row, Col, Image } from "react-bootstrap";

export default function APCSOC() {
  return (
    <div className='services-bg'>
      <Container className='innerPage mb-5'>
        <h2 className="text-center p-4 apts-services-title" >APCSOC</h2>
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image
              src="/images/cybersecurity_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="APSWAN"
            />
          </Col>
          <Col xs={12} md={8} className="innerpage-centent-list" >
            <div className="mx-3">
              <h5>APCSOC: Andhra Pradesh Cyber Security Operational Center</h5>
    <p>Vide G.O.Ms.No.2, dt 01/03/2017, Andhra Pradesh Cyber Security Operating Centre (APCSOC) was established in APTS, 3rd Floor, R&B Building, Vijayawada as per the Government of Andhra Pradesh instructions. APTS was appointed as the nodal agency by the State, for implementation of cybersecurity and allied infrastructure, for the government departments. The APCSOC Which monitors 24/7 for all the critical IT Infra structure of GoAP boarded on APCSOC. The APCSOC gives advance alerts on the Cyber-attacks on the APIT Infrastructure.</p>
            </div>
          </Col>
        </Row>
      </Container>
</div>
  );
}
