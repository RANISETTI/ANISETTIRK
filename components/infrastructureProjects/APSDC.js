import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";

export default function APSDC() {
  return (
    <div className='services-bg'>
    <Container className='innerPage mb-5 '>
      <h2 className="text-center p-4 apts-services-title" >APSDC</h2>
      <Row className="g-4">
      <Col xs={12} md={4}>
          <Image
            src="/images/data-center_1.jpg"
            rounded
            className="w-100 shadow innerpages-img-borders1"
            alt="APSWAN"
          />
        </Col>
        <Col xs={12} md={8} className="innerpage-centent-list" >
          <div className="mx-3">
            <h5>APSDC: Andhra Pradesh State Data Center</h5>
<p>The Government of Andhra Pradesh (GoAP) had built On-Premises AP State Data Centre (APSDC) under NeGP scheme in the 1st floor, YSR Bhavan, Gachibowli, Hyderabad in the year 2011. After AP State Reorganization Act 2014, the AP State Data Center (APSDC), Amaravati is operating at M/s Pi Data Centers (PIDC), Mangalagiri and taking non-IT services. The ITE&C Department has taken the Data Center space at PIDC in rack lease-in model for 40 racks with annual charges plus power charges per each rack. In APSDC, ITE&C Department is owning all the IT infra (Routers, Switches, Firewalls, IPS, Servers, Storages, Virtualization etc) and the entire IT operations are handled and controlled by ITE&C Department.</p>
<p>State Data Centre provides many functionalities and some of the key functionalities are Central Repository of the State, Secure Data Storage, Online Delivery of Services, Citizen Information/Services Portal and Remote Management.</p>
<p>These services are rendered through common delivery platform seamlessly supported by core Connectivity Infrastructure such as AP Software defined Wide Area Network (SDWAN), Grama/Ward Secretariates and Meeseva.</p>
          </div>
        </Col>
      </Row>
      <Row>
      <Col xs={12} >
      <h5>Introduction:</h5>
      <p>Andhra Pradesh State Data Centre (APSDC)is setup to help the GoAP departments/ organization rendering IT related services by maximizing IT performance through reliable hosting, managing IT risk and providing continuous connectivity support. APSDC's State-of-the-Art hosting environment along with the breadth of functionality and depth of expertise, provide secure, reliable and efficient delivery of G2G, G2C and G2B services thereby improving end-user satisfaction. The Pi Data Center, where APSDC is operating, isa Tier-IV standard data center certified by Uptime Institute.</p>
      <p>Submission of application security audit certificate from a 3rd party CERT-In empanelled agency is made mandatory before Go-Live of the any web application/Mobile application. Only post submission of Security Audit certificate, applications hosted in SDC are allowed to Go-Live i.e. Production after Public IP mapping.The Periodic Audit (review audit) of applications shall be taken up by every Department for every three (3) months or whenever the source code is modified or new module is added or functionality is changed/added, whichever is earlier.</p>
      <h5>Hosting Models:</h5>
      <p>Andhra Pradesh State Data Centre (APSDC) provides two hosting models to the various departments/ organization.</p>
      <ol type='a'>
      <li><b>Hosted model,</b> ITE&C server infra is provided for departments and applications management is being done by the respective Departments. The ITE&C Department looks after the network and hardware level issues. The respective departments handle the operating system and application.</li>
      <li><b>Co-located model,</b> ITE&C Department allocates required rack space, and the user departments get their own hardware & software and manage their server infrastructure.The ITE&C Department looks after the network level issues</li>
      </ol>
      <h5>Data Center space allocation methodology:</h5>
      <ol type='a'>
      <li>The Head of the Line Department writes a letter to Secretary, ITE&C Department for resource allocation at APSDC.</li>
      <li>The infra wing of ITE&C Department analyzes the requirement and prepares the resources that can be allocated for the Department. The same is circulated in the eFile for the approval of Secretary, ITE&C Department.</li>
      <li>Post approval, the line Department will be informed on the approved resources and the same will be allocated at APSDC. The APSDC team provides VPN connectivity for the Department’s identified service provider for application maintenance remotely.</li>
      <li>The day to day to data center operational approvals like IP whitelisting, Firewall access rules and VPN management is done at Director (Communications) level</li>
      </ol>
      <h5>Salient features of APSDC, Amaravati:</h5>
      <ol type='a'>
      <li>Tier-IV Data Centre with a Power Usage Efficiency (PUE) of 1.6</li>
      <li>Available Internet Bandwidth of 12 Gbps</li>
      <li>200 Gbps redundant Network backbone (east west traffic)</li>
      <li>VXLAN fabric in spine and leaf architecture with Data Centre Network Management (DCNM).</li>
      <li>Implemented Border Gateway Protocol (BGP) with Autonomous System (AS) number from Indian Registry for Internet Names and Numbers (IRINN)</li>
      <li>The entire data center is running on both IPv4 and IPv6 (Dual Stack)</li>
      <li>Running on full virtualization environment with each node of 20Gbps of uplinks. </li>
      <li>Multi clustered 1400+ VMs are operational in the environment.</li>
      <li>Hosted 300+ applications</li>
      <li>Nearly 1.1 Peta Byte (PB) of NAS storage and 700TB of SAN storage is in production</li>
      <li>Integrated with AP Cyber Security Operations Centre (APCSOC) and all the infrastructure & applications hosted is being monitored by APCSOC to combat cybersecurity threats, real-time intelligence sharing and threat analysis.</li>
      </ol>
      </Col>
      </Row>
    </Container>
</div>

  );
}
