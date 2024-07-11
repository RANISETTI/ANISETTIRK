import { faCheck, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from 'next/link';

export default function Partnerships () {

  return (
    <div className='services-bg'>
      <Container className='innerPage'>
        <h2 className="text-center m-4 apts-service-tittle" >Partnerships with Innovative Technology Companies</h2>
      
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image 
              src="/images/Partnerships-ITC_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="empanelment"
            />
          </Col>
          <Col xs={12} md={8}  >
            <h5>Partnerships with Innovative Technology Companies</h5>
            <p>ITE&C Dept. issued G.O.Ms. No 19, Dated 19.06.2016, specified the new Role of APTS and directed it to Establish JVs and SPVs with technology companies including start-ups with the objectives of introducing new and innovative Technologies in Government to improve efficiency, transparency and cost-effectiveness. </p>
  <p>ITE&C Dept. issued G.O.Ms. No 6, Dated 05.06.2017, for “Guidelines for selection of partners for Joint Ventures (JV) / Special Purpose Vehicles (SPV) with Technology Companies for innovative projects”. Accordingly, APTS seeks the proposals from the technology companies and is in the process of evaluating new and innovative technologies to enter into JVs and SPVs.</p>
            
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
