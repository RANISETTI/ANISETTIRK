import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import {
  Breadcrumb, Card, Col, Container, Row
} from 'react-bootstrap';

const documentsData = [
  {
    title: "GO'\s",
    data: [
      {
        id: 1,
        name: 'G.O.Ms.No.12',
        link: '/documents/GOMS12-ITC_dated-08062015.pdf',
      },
      {
        id: 2,
        name: 'G.O.Ms.No.19',
        link: '/documents/19092016ITC_MS19.pdf',
      },
      {
        id: 3,
        name: 'G.O.Ms.No.22',
        link: '/documents/2015ITC_MS22.pdf',
      },
    ],
  },
  {
    title: 'Circulars',
    data: [
      {
        id: 1,
        name: 'Right to Information Act - 2005',
        link: '/documents/RTI_HandBook_Chapters.pdf',
      },
      {
        id: 2,
        name: 'APTS-Rate Contract 2022-Specs',
        link: '/documents/APTS-RC2022-Specifications_and_price_details.pdf',
      },
    ],
  },
  {
    title: 'Office Data',
    data: [
      {
        id: 1,
        name: 'PMA Application Form',
        link: '/documents/Empanelment_Application_Form.pdf',
      },
      {
        id: 2,
        name: 'Vendor Empanelment Application Form',
        link: '/documents/Empanelment_Application_Form.pdf',
      },
    ],
  },
];

const renderCard = (item) => {
  const { title, data } = item;
  return (
    <Col className="apts-news-heading cust-head1" xs={12} md={4}>
      <Card className="apts-infrastructure-card w-100 h-100">
        <Card.Body>
          <div className="d-inline-flex">
            <FontAwesomeIcon icon={faFileDownload} className="light-purpule fa-2x mx-2" />
            <Card.Title className="apts-infrastructure-card-title">{title}</Card.Title>
          </div>
          <Card.Text className="apts-infrastructure-card-text">
            {data.map((value) => {
              const { id, name, link } = value;
              return (
                <div key={id}>
                  <Link href={link}>
                    <a target="_blank" className="">
                      {name}
                    </a>
                  </Link>
                  <br />
                </div>
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default function Downloads() {
  return (
    <div>
      <div className="downloads-pg-bg">
        <div className="about-sec-pad">
          <Container className="position-relative">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a className="text-dec-color">
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Downloads</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-white my-2 text-uppercase">Downloads</h2>
          </Container>
        </div>
      </div>
      <div className="downloads-bg pb-5">
        <Container className="">
          <div className="apts-downloads-title">
            <h2 className="text-center apts-services-title p-4">DOWNLOADS</h2>
          </div>
          <Row className="g-4 mb-4">
            {documentsData.map((item) => renderCard(item))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
