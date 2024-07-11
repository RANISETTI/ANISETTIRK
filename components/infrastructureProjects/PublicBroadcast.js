import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";

export default function PublicBroadcast() {
  return (
    <div className='pub-sec'>
    <Container className='innerPage'>
      <h2 className="text-center p-4 apts-services-title" >PB&FTS</h2>
      <Row xs={1} md={2} className="g-4">
      <Col xs={6} md={4}>
          <Image
            src="/images/PB&FTS_1.jpg"
            rounded
            className="w-100 shadow innerpages-img-borders1"
            alt="APSWAN"
          />
        </Col>
        <Col xs={12} md={8} className="innerpage-centent-list" >
          <div className="mx-3">
            <h5>Public Broadcast &amp; Feedback Telephony System</h5>
<p>The Government of Andhra Pradesh, through ITE&C Dept created a robust Public Broadcast & Feedback Telephony System (PBFTS) in 2014 comprising a Web portal, Unified Communication platform for Voice & SMS, IVR dial out calls facility for measuring public satisfaction using SIP trunk technology and for fine tuning policies according to the needs of the people with 24/7 customer service support. APTS is the Operations and Management agency on behalf of ITE&C Department.</p>
          </div>
        </Col>
      </Row>
    </Container>
</div>
  );
}
