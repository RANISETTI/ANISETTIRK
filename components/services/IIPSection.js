import { faCheck, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from 'next/link';

export default function IIPSection() {

  return (
    <div className='services-bg'>
      <Container className='innerPage'>
        <h2 className="text-center m-4 apts-service-tittle" >IIP Section</h2>
      
        <Row className="g-4">
        <Col xs={12} md={4}>
            <Image 
              src="/images/vc-management_2.jpg"
              rounded
              className="w-100 shadow innerpages-img-borders1"
              alt="empanelment"
            />
          </Col>
          <Col xs={12} md={8}  >
          <div className=''>
          <h5>Process flow for the various services provided by IIP Section, APTS</h5>
         <ol type='I' >
          <li><b>Video conference Slot Booking :</b>
            <ol type='1' style={{marginLeft:'-50px'}} >
            <li>Mode of VC Slot Booking request from  user department (Secretariat Department/HoDs/District Office)  request –
              <ol type='a'>
                <li>With or without approval of CMO- departments book the slot  through Online VC Portal (<a href='https://videonew.apts.gov.in/' target='_blank'>https://videonew.apts.gov.in/</a>) (or)</li>
                <li>Sometime Departments, send request to APTS through Mail/Whatsapp/Message/Phone for slot booking. Based on the availability APTS book the slot or suggest alternate time to the  user department</li>
              </ol>
            </li>
            <li>After slot booking,   APTS approve the slot time and communicate the same to user department.</li>
            </ol>
          </li>
          <li><b>Video Conference License for Desktop or laptop</b>
          <ol type='1'>
            <li>Request  letter/mail will be received from the user department(Secretariat Department/HoDs/District Office)   for provision of VC license for their Desktop / Laptop</li>
            <li>APTS will forward the request to Director (comm.) for approval.</li>
            <li>After approval from the Director(comm.), ITE&C dept, the VC helpdesk  configure Video License on the Desktop / Laptop through VPN access</li>
          </ol>
          </li>
          <li><b>Video Conference Equipment</b>
          <ol type='1'>
            <li>Request letter/mail will be received from the user department (HoDs/District Office)  for provision of VC equipment.  </li>
            <li>APTS send PI to Department for transfer of funds</li>
            <li>User department transfer the funds and communicate the same to APTS.</li>
            <li>After confirming the same from Accounts section, IIP-Section issues PO on VC  service provider to supply the VC equipment to respective department</li>
            <li>After delivering, installing the equipment and obtaining the certification from the user department, service providers raise the invoice for release of payment.</li>
            <li>IIP section process the bill for release of payment.</li>
          </ol>
          </li>
          <li><b>APSWAN Connection</b>
          <ol type='1'>
            <li>Request letter/mail will be received from the user department (HoDs/District Office)   for provision of APSWAN Connectivity.</li>
            <li>APTS obtains the cost estimates from the existing service provider and forward the same to user department informing them to issue Work order by themselves and APTS will provide IPs.</li>
            <li>APTS communicate to service Provider, NoC-AP Secretariat about new connection requirement.</li>
            <li>User department will take necessary action on issue of WO and process the payment.</li>
            <li>APTS communicate to service Provider, NoC-AP Secretariat about new connection requirement and take necessary action.</li>
            </ol>
            </li>
            <li><b>APSWAN Shifting</b>
          <ol type='1'>
          <li>Request letter/mail will be received from the user department (HoDs/District Office)   for shifting  of APSWAN Connectivity.</li>
          <li>APTS obtains the cost estimates from the existing service provider</li>
          <li>APTS issues work order on existing APSWAN service provider & VC Service provider for shifting  of APSWAN connection and VC equipment.</li>
          <li>Service Provider after shifting of APSWAN & VC Connections, and after obtaining certification from the user department, will raise the bill as a part of quarterly AMC for release of payment.</li>
          </ol>
          </li>
          <li><b>APSWAN Bandwidth with Lease line</b>
          <ol type='1'>
          <li>Request  letter/mail will be received from the user department( HoDs/District Office)   for APSWAN  Bandwidth</li>
          <li>APTS obtains the cost estimates from the existing service provider and forward the same to user department informing them to issue Work order by themselves and APTS will provide IPs.</li>
          <li>APTS communicate to service Provider, NoC-AP Secretariat about new connection requirement.</li>
          <li>User department will take necessary action on issue of WO and process the payment.</li>
          </ol>
          </li>
          <li><b>Internet Bandwidth</b>
          <ol type='1'>
          <li>Request  letter/mail will be received from the ITEC Dept  for provision of Leased Internet Bandwidth for CM,s Camp Office/ CMs Residence/SDC</li>
          <li>APTS float the tender among empanelled vendors, </li>
          <li>After following procurement process, APTS identify the L1 bidder and send the letter to ITEC Dept for approval to issue WO on L1 bidder and for transfer of funds</li>
          <li>After approval of ITEC Dept, APTS issues Work order on L1 Bidder.</li>
          <li>L1 bidder provides requested Internet Bandwidth and raise the bill after obtaining the certification from respective authority</li>
          <li>APTS process bill monthly/quarterly, for release of payment after ITEC Dept releases the funds.</li>
          </ol>
          </li>
         </ol>
        </div>
     
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
