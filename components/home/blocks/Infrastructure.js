import { faBriefcase, faBuilding, faGlobe, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";


const infrastructureData = [
  {
    id: 1,
    icon: faGlobe,
    name: 'APSDWAN',
    content: "APSDWAN: Andhra Pradesh Software Defined Wide Area Network",
    link: '/infrastructure-support/apswan'
  },
  
  {
    id: 2,
    icon: faBriefcase,
    name: 'APSDC',
    content: "APSDC is an initiative of the National eGovernance Program (NeGP), approved by the Government of India. It is envisaged to move from a Government-centric",
    link: '/infrastructure-support/apsdc'
  },
  {
    id: 3,
    icon: faBuilding,
    name: 'APSCAN',
    content: "Andhra Pradesh Secretariat Campus Area Network (APSCAN) at IGC, Velagapudi was implemented and commissioned in 2016 by APTS on behalf of ITE&C",
    link: '/infrastructure-support/apscan'
  },
  {
    id: 4,
    icon: faTools,
    name: 'VC Management',
    content: "IP Based HD Video conferencing facility was created in 1999 upto District Level. In 2010, the Video Conferencing facility was extended upto all Mandal",
    link: '/infrastructure-support/vc-management'
  },
]

const renderInfrastructureCards = () => {
  const infrastructures = [];
  {
    infrastructureData.map((infrastructure) => {
      infrastructures.push(
        <Col className="p-3 d-flex">
          <Card className="apts-infrastructure-card">
            <Card.Body>
              <div className='d-inline-flex'>
              <FontAwesomeIcon icon={infrastructure.icon} className="apts-infrastructure-card-icon" />
              <Card.Title className='apts-infrastructure-card-title'>{infrastructure.name}</Card.Title>
              </div>
              <Card.Text className='apts-infrastructure-card-text'>{infrastructure.content}</Card.Text>
              <Link href={infrastructure.link}>
                <a>
                  <Button variant="transparent" className='apts-infrastructure-card-button'>Learn More</Button>
                </a>
              </Link>
            </Card.Body>
           </Card>
        </Col>
    )
    });
  }
  return infrastructures;
}

export default function Infrastructure() {
  return (
    <div className="apts-infrastructure-background">
      <Container className='apts-infrastructure-title'>
        <h2 className="text-center">INFRASTRUCTURE PROJECTS</h2>
        <Row xs={1} md={2} className="g-4">
          {renderInfrastructureCards()}
        </Row>
      </Container>
    </div>
  );
}
