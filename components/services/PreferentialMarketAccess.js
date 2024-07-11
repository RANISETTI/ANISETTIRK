import { faCheck, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from 'next/link';

export default function PreferentialMarketAccess() {

  return (
    <div className='services-bg'>
      <Container className='innerPage'>
        <h2 className="text-center m-4 apts-service-tittle" >PREFERENTIAL MARKET ACCESS</h2>
      
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image 
              src="/images/pac_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="empanelment"
            />
          </Col>
          <Col xs={12} md={8}  >
          <div className=''>
          <h5>Preferential Market Access</h5>
          <p>The Procurement Policy also envisages “Preferential Market Access” as per IT Policy. In order to provide gainful employment to the educated youth of the State, bring investments into IT/ITES/Electronics sector, augment the GSDP and enhance the standard of living of the citizens of the State, there is need for setting up of Application Development Centers, Software, IT/ITES operations, Hardware Manufacturing/Assembling/ Component manufacturing facilities in the new State of Andhra Pradesh.</p>
          <p>To avail Preferential Market Access from the Government of AP Procurement Policy, the interested IT/Hardware companies shall get empanelled with Andhra Pradesh Technology Services Ltd (APTS) – the procurement agency of GoAP – and shall comply with all the criteria indicated in the mandatory requirements of each category mentioned in G.O.Ms.No. 22 dated 28.11.2015 of Information Technology, Electronics and Communications Dept.</p>
        </div>
        <Row className='my-4 cust-downloads'>
              <Col xs={12}>
              <Link href="/documents/Empanelment_Application_Form.pdf">
              <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" /> Application Form
                  </a>
                </Link>
              </Col>
              <Col xs={12}>
              <Link href="/documents/2015ITC_MS22.pdf">
              <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" /> Download GO
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
