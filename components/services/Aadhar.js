import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function Aadhar() {
  return (
    <div className="services-bg">
      <Container className="innerPage">
        <h2 className="text-center p-4 apts-service-tittle" >AUA/KUA Services</h2>
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image src="/images/Aadhar-Services-BG_1.jpg" alt="Aadhaar"   rounded
              className="w-100 shadow innerpages-img-borders1" />
          </Col>
          <Col xs={12} md={8}  >
          <h5>AUA/KUA Services</h5>
          <p>Andhra Pradesh Technology Services (APTS) is a nodal implementing Agency on behalf of the ITE&C Department, Government of Andhra Pradesh for AUA/ KUA in the UIDAI ecosystem to provide the services to all the departments in the State of Andhra Pradesh to extend the beneficiary schemes to the citizens of AP. This ensures faster governance delivery by the government departments.</p>
          <p>The Departments using Aadhaar Authentication Services will be named as Sub-AUA/ Sub-KUA. The following are the Procedures to be followed for integrating Aadhaar Authentication Services with the SUB-AUA/ end user departments.</p>
          </Col>
        </Row>
        <Row className="my-4">
        <Col>
        <ol type="1">
        <li>The Departments using Aadhaar authentication shall have Sub-AUA code. Sub-AUA code will be issued by UIDAI on submission of the following:
        <ol type="a">
        <li>‘MoU for SUB-AUA, between APTS and Department</li>
        <li>‘Joint Undertaking’ between APTS and Department </li>
        <li>Copy of the published Gazette Notification for the use of Aadhaar Authentication Services under section 7 of the Aadhaar Act 2016. <b>OR</b> Copy of the MeiTY approval under Good Governance under Section 4(4)(b) for the Schemes implemented by State Government. </li>
        </ol>
        </li>
        <li>Upon receipt of request from department of government of Andhra Pradesh, APTS shall share draft copies of ‘MoU for SUB-AUA’, ‘Joint Undertaking’ and Sub-AUA Application with the respective department.</li>
        <li>Upon receipt of the Signed Agreement copies from the requesting department, System Integrator will be directed to share on-boarding sheet with the respective department. (Simultaneously, APTS will forward the Sub-AUA Agreement to UIDAI/ MeitY for allotment of Sub-AUA Code. Upon receipt of Sub-AUA Code, the same will be share to the concerned department for integration with AUA).</li>
        <li>Sub-AUA departments are provided with on-boarding sheets to be filled and submitted to Project Manager, so as to create an account/ application in the system and to assign department Specific License Key (SLK). The on-boarding sheet contains department & their System Integrator/ Service Provider/ Application Developer Single Point of Contact details   such   as name, designation, mobile number, address for communication and official email-ID, application stack etc.</li>
        <li>An integration kick-off call will be arranged by AUA System Integrator with the requesting department Service Provider/ Application Developer.</li>
        <li>Pre-production License Key and relevant SDK are shared by AUA System Integrator to the respective department for integration with the department application. </li>
        <li>Virtual support calls will be arranged by AUA System Integrator on need basis to   address issues faced by Sub-AUA department’s Integration.</li>
        <li>Five successful transaction details (Txn ID, Response Code and Time Stamp) are to be received from Sub-AUA   department to approve for moving to production phase.</li>
        <li>Post approval, production SLK will be generated and shared with the Sub-AUA department in a separate email.</li>
        <li>Test transactions will be performed by Sub-AUA department.</li>
        <li>Department shall notify APTS by an email confirmation upon successfully integrating Aadhaar Authentication Services.</li>
        <li>Post integration with department, transactions will be monitored on daily basis by the AUA team. Any events/ unforeseen/ unauthorized transactions will be reported to Sub-AUA department for rectification.</li>
        {/*<li>The following are the mandatory requirements by UIDAI 
          <ol type="a">
            <li>Sub-AUAs (Departments) shall submit the Annual Cyber Security Audit Report by CERT-IN empanelled Agency on or before 31.03.2021.</li>
            <li>All the Sub-AUAs (Departments) shall pay non-refundable License fee of Rs.3.54 Lakh (Rs.3.00 Lakh + GST Rs.54,000) before 31.03.2021, valid for a period of 02 years from 01.04.2021.</li>
            <li>Monthly number of transaction failed and percentage of failed transaction, OEM device wise (Startek, Mantra, etc.)</li>
          </ol>
  </li>
        <li>This fee is in addition to the AUA/KUA license fee of Rs.23.60 Lakh (Rs.20. Lakh + GST Rs.3.60 Lakh). The present fee is valid up to 30.04.2021.</li>*/}
        <li>APTS/ ITE&C Department is paying the AUA/KUA license fee to UIDAI and ASA/KSA charges to M/s MasterCard and AUA/KUA System maintenance/ operation charges to M/s Syntizen.</li>
        </ol>
        </Col>
        </Row>
      
      </Container>
    </div>
  );
}
