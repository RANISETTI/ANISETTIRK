import React from 'react';

import { Container, Row, Col, Image } from "react-bootstrap";

export default function APSWAN() {
  return (
    <div className='services-bg'>
      <Container className='innerPage mb-5'>
        <h2 className="text-center p-4 apts-services-title" >APSDWAN</h2>
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image
              src="/images/APSWAN_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="APSWAN"
            />
          </Col>  
          <Col xs={12} md={8} className="innerpage-centent-list" >
            <div className="mx-3">
              <h5>APSDWAN: Andhra Pradesh Software Defined Wide Area Network</h5>
    <p>The backbone network for entire state for Video and Data communication. On this network, all the Government Offices are accessing the Government applications like e-office, Webland, CARD, Meeseva etc. also video conference up to Mandal level is operating on this network. The network covers 669 Vertical locations covering AP Secretariat, Andhra Pradesh State Data Center, all collectorates, All MRO offices in vertical connectivity and 2164 horizontal connections to various Department offices.</p>
            </div>
          </Col>
        </Row>
      </Container>
</div>
  );
}
