import { faCheck, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from 'next/link';

export default function EProcurementeAuctionSystem () {

  return (
    <div className='helpdesk-sec'>
      <Container className='innerPage'>
        <h2 className="text-center pb-2 apts-service-tittle" >ePROCUREMENT AND eAUCTION SYSTEM</h2>
      
        <Row xs={1} md={2} className="g-4">
        <Col xs={6} md={4}>
            <Image 
              src="/images/eProcurement_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="empanelment"
            />
          </Col>
          <Col xs={12} md={8}  >
            <h5>eProcurement &amp; eAuction System</h5>
            <p>The Government of Andhra Pradesh is implementing eProcurement project as a core eGovernance initiative and is successfully in operation since 2002 without any interruption. The platform is being used by all Government departments, Public Sector Undertakings, Urban Local Bodies, and Universities. The initiative has delivered demonstrable benefits like cost savings to the user departments, significant reduction of tender process time, efficiency in procurement processes and transparency.</p>
            <p>The new eProcurement platform has flexible workflow, User-friendly navigation, Interactive Dashboard for buyers & suppliers. It caters to all types of Procurement processes like Double Cover, EPC, BOT, BOOT, World Bank requirements for tendering of works, products, services, etc. using a single solution. It was launched on 2016. </p>
            <Row className='my-4 cust-downloads'>
              <Col>
                
                  <a href={'https:/tender.apeprocurement.gov.in'} target='_blank'>https:/tender.apeprocurement.gov.in</a> - APTS is nodal agency for e-Procurement project.
              
               
              </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
