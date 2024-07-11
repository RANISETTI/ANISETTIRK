import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
    Breadcrumb, Button, Card, Col, Container, Row, Spinner
} from 'react-bootstrap';
import { genericGetService } from '../../services/GenericService';
import ApplyTender from './ApplyTender';

function Tenders() {
  const [tenderDetails, setTenderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    genericGetService('/tenders/', {})
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTenderDetails(data);
          setIsLoading(false);
        } else {
          setTenderDetails([]);
          setIsLoading(false);
        }
      });
  }, []);

  const renderTenderDetails = () => {
    const tenders = [];
    {
      tenderDetails && tenderDetails.map((tender) => {
        tenders.push(

          <Card border="secondary" className="tender-card mb-5">
            <Card.Header className="tender-card-heading">
              {tenderDetails.indexOf(tender) + 1}
              )
              {' '}
              {tender.type.name}
            </Card.Header>
            <Card.Body className='py-4'>
              <Card.Title className="tender-card-title">{tender.title}</Card.Title>
              <Card.Text>
                {tender.attachments && tender.attachments.map((attachment) => (
                  <div className='cust-border-1 py-3'>
                    <Row className='m-TP-5'>
                      <Col className='p-1'>
                        <span>{attachment.name}</span>
                      </Col>
                      <Col>
                        <Link href={attachment.attachment}>
                          <a target="_blank">
                            <Button className="tender-download-button">Download</Button>
                          </a>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Text>
              <div className="tender-scroll-text-container">
                <div className="tender-scroll-text">
                  *
                  {' '}
                  {tender.notes}
                </div>
              </div>
            </Card.Body>
          </Card>

        );
      });
    }
    return tenders;
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className='min-h-100'>
      <section>
        <div>
          <div className='tender-pg-bg'>
            <div className='tender-sec-pad'>
              <Container className="position-relative">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/">
                      <a className="text-dec-color">
                        Home
                      </a>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active className="text-white">Tenders</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className="text-white my-2 text-uppercase">APTS Tenders</h2>
              </Container>
            </div>
          </div>
          <div className='about-pg-content'>
            <Container>
            <h2 className="apts-team-title">
          tenders
        </h2>
              {/* <div style={{ display: 'flex' }}>
                <h5>Apply for Concurrent/ Internal Auditor </h5>
                <Button className="tender-download-button mx-4" onClick={() => setShowModal(true)}>Apply</Button>
              </div> */}
              {tenderDetails.length ? renderTenderDetails() : (
                <h2 className="text-center">
                  No Tenders Available
                </h2>
              )}
            </Container>
          </div>
        </div>
      </section>
      <ApplyTender
        show={showModal}
        setIsloding={setIsLoading}
        onHide={() => setShowModal(false)}
        onClose={() => { setShowModal(false); router.reload(); }}
      />
    </div>
  );
}

export default Tenders;
