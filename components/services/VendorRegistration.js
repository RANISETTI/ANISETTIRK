import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Col, Container, Image, Row, Spinner
} from 'react-bootstrap';
import { getVideoEmpanelmentFile } from '../../services/home';

export default function VendorRegistration() {
  const [empanelledFileLink, setEmpanelledFileLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVideoEmpanelmentFile()
      .then(({ data, errors }) => {
        if (errors) {
          setIsLoading(false);
        }
        if (data) {
          const { file } = data;
          setEmpanelledFileLink(file);
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

  return (
    <div className="services-bg">
      <Container className="innerPage">
        <h2 className="text-center m-4 apts-service-tittle">Vendor Empanelment</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Image
              src="/images/vendor-registration_1.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="empanelment"
            />
          </Col>
          <Col xs={12} md={8}>
            {/*  <h5>Vendor Registration</h5>
            <p>AP Technology Services Ltd (APTS) is nominated as the Nodal Agency for empanelling of vendors of IT Products and services subject to provisions of this policy.</p>
            <ul className='list-items'>
              <li><FontAwesomeIcon icon={faCheck} className="apts-news-tenders-icon fa-lg mx-2" /> APTS through open advertisement calls for the empanelment of vendors in different categories.</li>
              <li><FontAwesomeIcon icon={faCheck} className="apts-news-tenders-icon fa-lg mx-2" /> The empanelled list is hosted on the APTS website and the empanelled vendors are eligible to participate in the limited tenders.</li>
          </ul>
            <Row className='my-4 cust-downloads'>
              <Col>
                <Link href="/documents/RFP_01022021.pdf">
                  <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" /> Application Form
                  </a>
                </Link>
              </Col>
              <Col>
              <Link href="/documents/VendorsList_14032022.pdf">
              <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />  Empanelled Vendor List
                  </a>
                </Link>
              </Col>
              <Col>
                <Link href="/documents/">
                <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />  Empanel Registration
                  </a>
                </Link>
              </Col>
            </Row> */}
            <div className="d-flex justify-content-between">
              <h5>Vendor Empanelment</h5>
              {/* <Link href="/documents/VendorsList_25052022.pdf" passHref>
                <a target="_blank">
                  <p style={{
                    color: '#557ba8',
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                  >
                    Empanelled Vendor List
                  </p>
                </a>
                </Link> */}
            </div>
            <p>Activities of the Vendor Empanelment Section:</p>
            <ol type="1">
              <li>
                APTS calls for the empanelment of vendors in different categories, through open
                advertisements.
              </li>
              <li>
                According to the Vendor Empanelment Conditions the Vendors will apply for
                Registration, All applications are mostly physical documentation only.
              </li>
              <li>
                The Vendors can apply for 55 items which are available in Vendor Application
                form.
              </li>
              <li>
                According to RFP Conditions all Applications will be received along with Security
                deposit and processing fee through DD's in favour of MD APTS.
              </li>
            </ol>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              <ol type="1" start={5}>
                <li>The Security deposit and processing fee DD's will forward to Bank.</li>
                <li>
                  The Security Deposit and  Processing Fee will be sent through file to accounts
                  section and the same will be deposited in the Bank,  then registration process
                  will be started.
                </li>
                <li>
                  All Applications will be Scrutinized and the Agenda, minutes will prepare for
                  approval.
                </li>
                <li>
                  Once the minutes are approved by committee members the Vendor names will be
                  hosted in APTS Website.
                </li>
                <li>The Vendor complete details will save in Vendor Empanelment portal. </li>
                <li>
                  All Pending/Shortfall  Application will intimated through emails to the vendors
                  for submission and to put up in the next committee meeting
                </li>
                <li>
                  Once the empanelment period expired the Security Deposit will be refunded to
                  the vendors accordingly.
                </li>
                <li>
                  If Vendor empanelment period is not Expired and requested for refund of
                  Security Deposit, The vendor name will be deleted from the APTS Site after
                  refunding the SD.
                </li>
              </ol>
            </Col>
          </Row>
          <Row className="my-4 cust-downloads">
            <Col xs={12}>
              <Link href="/documents/Empanelment_Application_Form.pdf">
                <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />
                  {' '}
                  Application Form
                </a>
              </Link>
            </Col>
            <Col xs={12}>
              <Link href={empanelledFileLink}>
                <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />
                  {' '}
                  Empanelled Vendor List
                </a>
              </Link>
            </Col>
            {/* <Col xs={12}>
              <Link href="/documents/">
                <a target="_blank">
                  <FontAwesomeIcon icon={faFilePdf} className="text-danger fa-2x mx-2" />
                  {' '}
                  Empanel Registration
                </a>
              </Link>
            </Col> */}
          </Row>
        </Container>
      </Container>
    </div>
  );
}
