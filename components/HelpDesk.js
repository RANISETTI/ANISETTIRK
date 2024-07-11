import Link from 'next/link';
import React from 'react';
import { Breadcrumb, Col, Container, Image, Row } from 'react-bootstrap';
import HelpDesks from './dashboard/cms/helpdesk/HelpDesk';

const renderHelpdeskContent = () => (
  <div>
    <Row xs={1} md={1} className="g-4">
      <h2 className="text-center apts-service-tittle">APTS HELP DESK</h2>
      <Col xs={12} md={12} className="p-3 innerPage">
        <h5>APTS CONTACT NUMBERS</h5>
        <table className="table table-bordered my-4">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Helpdesk Recruitment</th>
              <th>Reference to steps mentioned</th>
              <th>Contact Person</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>General – Clarifications on acquiring the digital certificates</td>
              <td>General</td>
              <td>Kum. Mounika.T, Smt. Hemantha Lakshmi. A, Sri. Subba Reddy. V</td>
              <td>9959362585, 7981304004, 6302677418</td>
            </tr>
            <tr>
              <td>2</td>
              <td>For Digital Certificate Application &amp; Enrollment kit-In Person Counseling</td>
              <td>Step 3.1</td>
              <td>Kum. Mounika.T, Smt. Hemantha Lakshmi. A, Sri. Subba Reddy. V</td>
              <td>In person counseling</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Submission of Application &amp; Documents- In Person Counseling</td>
              <td>Step 3.2</td>
              <td>Kum. Mounika.T, Smt. Hemantha Lakshmi. A, Sri. Subba Reddy. V</td>
              <td>In person counseling</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Digital certificate registration process and Informing the Request No for online registration and verification</td>
              <td>Step 3.4.(c) to Step 3.4 (e)</td>
              <td>Kum. Mounika.T, Smt. Hemantha Lakshmi. A, Sri. Subba Reddy. V</td>
              <td>9959362585, 7981304004, 6302677418</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Problems (if any) during Digital certificates Enrollment and certificate downloading on to the USB token</td>
              <td>Step 3.5 (a) to Step 3.5 (d)</td>
              <td>Kum. Mounika.T, Smt. Hemantha Lakshmi. A, Sri. Subba Reddy. V</td>
              <td>9959362585, 7981304004, 6302677418</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </div>
);

export default function HelpDesk() {
  return (
    <div>
      <div className="helpdesk-page-bg-style">
        <div className="helpdesk-page-bg-style1">
          <Container className="position-relative innerPage">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a className="helpdesk-text-dec">
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Help Desk</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-white my-2 text-uppercase"> APTS Help Desk</h2>
          </Container>
        </div>
      </div>
      <div className="helpdesk-sec">
        {/* {renderHelpdeskContent()} */}
        <HelpDesks fromDashboard={true} />
      </div>
    </div>
  );
}
