import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Col, Container, Image, Row, Spinner,
} from 'react-bootstrap';
import { getProcurementDocument } from '../../services/home';

export default function Procurement() {
  const [documentDetails, setDocumentDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProcurementDocument()
      .then(({ data }) => {
        if (data) {
          setDocumentDetails(data);
        }
      }).finally(() => setIsLoading(false));
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
  return (
    <div className="services-bg">
      <Container>
        <h2 className="text-center p-4 apts-services-title">PROCUREMENT</h2>
        <Row className="g-4 mb-5">
          <Col xs={12} md={4}>
            <Image src="/images/Procurement_BG_1.jpg" alt="Aadhaar" className="w-100 shadow innerpages-img-borders1" />
          </Col>
          <Col xs={12} md={8}>
            <p>
              APTS has been the one-stop, go to, flagship procurer for the procurement of hardware,
              software and networking products. We raise tenders and procurement processes on
              behalf of the Government of Andhra Pradesh (GoAP).
            </p>
            {Object.keys(documentDetails).length ? (
              <Link href={documentDetails.file}>
                <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />
                  {' '}
                  {documentDetails.name}
                </a>
              </Link>
            ) : ''}
            {/* <p>
              ITE&C Dept. vide
              {' '}
              <Link href="/documents/GOMS12-ITC_dated-08062015.pdf" passHref>
                <a target="_blank">
                  G.O.Ms.No 12 dated 08.06.2015
                </a>
              </Link>
              , has issued the Procurement Policy.
            </p>
            <p>
              ITE&C Dept. issued
              {' '}
              <Link href="/documents/19092016ITC_MS19.pdf" passHref>
                <a target="_blank">
                  G.O.Ms. No 19 dated 19.09.2016
                </a>
              </Link>
              , specifying the new role of APTS and directed it to take up the Procurement of
              Hardware, Software and Networking Products of value Rs.50.00Lakh or above. However,
              in the case of devices newly introduced in the market, APTS may procure them through
              tender, even if the amount is less than Rs.50.00Lakh.
          </p> */}
          </Col>
        </Row>
        {/* <Row className="g-4">
          <Col xs={12} className="text-center py-5 my-5">
            <Image
            src="/images/Procurement_Process.png"
            alt="Procurement_Process"
            className="w-100" />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}
