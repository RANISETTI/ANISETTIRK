import React from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import Link from 'next/link';


const servicesData = [
  {
    id: 1,
    image: '/images/Aadhar-Services-BG.jpg',
    name: "Aadhaar Services",
    content: "AUA/ KUA services are being provided to various departments for smooth delivery of welfare schemes in Andhra Pradesh.",
    link: '/services/aadhar-services'
  },
  {
    id: 2,
    image: '/images/Procurement_BG.jpg',
    name: "Procurement",
    content: "ITE&C Dept. vide G.O.Ms.No 12 dated 08.06.2015, has issued the Procurement Policy.",
    link: '/services/procurement'
  },
  {
    id: 3,
    image: '/images/Cyber-Security_BG.jpg',
    name: "Cyber Security",
    content: "APTS is pivotal in the State's Cyber Security strategy and is tasked with implementing the AP Government's",
    link: '/services/cyber-security'
  },
  {
    id: 4,
    image: '/images/Digital-Signature_BG.jpg',
    name: "Digital Signature",
    content: "The Government of Andhra Pradesh has authorized the use of digital signatures as the preferred means of providing",
    link: '/services/digital-signature'
  },
  {
    id: 5,
    image: '/images/Empanelment_BG.jpg',
    name: "Empanelment",
    content: "AP Technology Services Ltd (APTS) is nominated as the Nodal Agency for empanelling of vendors of IT Products",
    link: '/services/empanelment'
  },
  {
    id: 6,
    image: '/images/Consultancy_BG.jpg',
    name: "Consultancy",
    content: "APTS role was modified by Government through G.O.Ms.No.19 dated 19.09.2016. Accordingly, the following are the",
    link: '/services/consultancy'
  } 
]

const renderServices = () => {
  const services = [];
  {
    servicesData.map((service) => {
      services.push(
      <div  className="d-flex">
      <Col>
        <Card className="apts-services-card">
          <Card.Header>
          <Card.Img variant="top" src={service.image} className="" />
          </Card.Header>
          <Card.Body >
            <Card.Title className="apts-services-card-title">{service.name}</Card.Title>
              <Card.Text>{service.content}</Card.Text>
              
          </Card.Body>
          <Card.Footer>
          <Link href={service.link}>
                <a>
                  <Button
                    variant="transparent" className="apts-services-card-button"
                    onClick={() => router.push(`{service.link}`)}
                  >
                    Learn More
                  </Button>
                </a>
              </Link>
          </Card.Footer>
        </Card>
      </Col>
      </div>
    )
    });
  }
  return services;
}

export default function Services() {
  return (
    <div className="apts-services-bg pad-y-3rem-x-0">
      <Container >
        <div className="apts-services-title pad-0-0-3-0">
          <h2 className="text-center m-4">OUR SERVICES</h2>
        </div>
        <Row xs={1} md={3} className="g-4 d-flex">
            {renderServices()}
        </Row>
      </Container>
    </div>
  );
}
