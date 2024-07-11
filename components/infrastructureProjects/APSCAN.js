import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";

export default function APSCAN() {
  return (
    <div className='services-bg'>
    <Container className='innerPage mb-5 '>
      <h2 className="text-center p-4 apts-services-title" >APSCAN</h2>
      <Row className="g-4">
      <Col xs={12} md={4}>
          <Image
            src="/images/APSCAN_1.jpg"
            rounded
            className="w-100 shadow innerpages-img-borders1"
            alt="APSWAN"
          />
        </Col>
        <Col xs={12} md={8} className="innerpage-centent-list" >
          <div className="mx-3">
            <h5>The AP Secretariat Campus Area Network (APSCAN):</h5>
<p> AP Secretariat is the apex administrative unit of AP Government. It accommodates Council of ministers, Secretaries to the Govt., Senior officers with 36 main departments supported by around 814 sections. Being the apex site of administration, very high level of quality of service required. The APSCAN network and infrastructure supporting the function of the government consisting of Network, computers, printers, UPS etc. The AP Secretariat Campus Area Network (APSCAN) covers the following locations:</p>
          <ol type='A'>
            <li>Location-I : Six (6) building blocks (Building No.1 to 6) at new AP Secretariat, Interim Government Complex (IGC), Velagapudi, Amaravati on the local area network. Any Other location offices if any as decided by ITE&C department from time to time.</li>
          <li>Location-II : Hon’ble CM Camp Office, Tadepalli: Systems and the Network at the premises of Honorable Chief Minister’s Camp Office (CMCO) at Tadepalli</li>
          <li>Location-III : AP Bhavan, New Delhi: Systems and the Network at the premises of AP Bhavan, New Delhi.</li>
          </ol>
          </div>
        </Col>
      </Row>
    </Container>
</div>
  );
}
