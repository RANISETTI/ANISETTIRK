import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Accordion, AccordionContext, Button, Card, Container, Spinner, useAccordionButton,
} from 'react-bootstrap';
import { genericGetService } from '../../services/GenericService';
import ContactUs from '../home/blocks/ContactUs';
import ApplyJob from './ApplyJob';

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      onClick={decoratedOnClick}
      className="float-end careers-list-btn btn btn-light"
      style={{ color: isCurrentEventKey ? '#000000' : '#FF3300' }}
    >
      {isCurrentEventKey ? children : 'View More...'}
    </Button>
  );
}

export default function CareersList() {
  const [careersList, setCareersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJobName, setSelectedJobName] = useState('');

  const router = useRouter();

  useEffect(() => {
    genericGetService('/jobs/', {})
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setCareersList(data);
          setIsLoading(false);
        } else {
          setCareersList([]);
          setIsLoading(false);
        }
      });
  }, []);

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (careersList && careersList.length) {
    return (
      <Container>
        <ApplyJob
          show={showModal}
          onHide={() => setShowModal(false)}
          onClose={() => { setShowModal(false); router.reload(); }}
          selectedJobId={selectedJobId}
          selectedJobName={selectedJobName}
        />
        {careersList.map((career) => (
          <div key={career.id}>
            <Card>
              <Accordion>
                <Accordion.Item eventKey={career.id}>
                  <Card.Header className="card-header-text">
                    {career.title}
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedJobId(career.id);
                        setSelectedJobName(career.title);
                      }}
                      className="float-end apply-btn"
                    >
                      Apply
                    </Button>
                  </Card.Header>
                  <Card.Text>
                    <p className="location-para">
                      <span style={{ fontWeight: 600, fontSize: '16px' }}>
                        Location:
                      </span>
                      {' '}
                      {career.locations}
                    </p>
                    <p className="pad-L-15">
                      <span style={{ fontWeight: 600, fontSize: '16px' }}>
                        Type:
                      </span>
                      {' '}
                      {career.type && career.type.name}
                    </p>
                    <p className="pad-L-15">
                      <span style={{ fontWeight: 600, fontSize: '16px' }}>
                        Department:
                      </span>
                      {' '}
                      {career.department && career.department.name}
                    </p>
                  </Card.Text>
                  {career.description ? (
                    <>
                      <Card.Text className="pad-TB-15" style={{ fontWeight: 600, fontSize: '16px' }}>
                        Job Description
                        <ContextAwareToggle eventKey={career.id}>View Less...</ContextAwareToggle>
                      </Card.Text>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: parse(career.description) }} />
                      </Accordion.Body>
                    </>
                  ) : ''}
                </Accordion.Item>
              </Accordion>
            </Card>
          </div>
        ))}
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            {' '}
            <h2 className="cust-alert-primary">Currently there are no open Positions</h2>
            {' '}
          </div>
          <div className="col-sm-3" />
        </div>
      </Container>
    </div>
  );
}
