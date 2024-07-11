import Link from 'next/link';
import {
  Col, Container, Image, Row
} from 'react-bootstrap';

export default function CyberSecurity() {
  return (
    <div className="services-bg">
      <Container className="innerPage">
        <h2 className="text-center p-4 apts-service-tittle">CYBER SECURITY AUDIT & COMPLIANCE</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Image src="/images/Cyber-Security_BG_1.jpg" alt="Aadhaar" className="w-100 shadow innerpages-img-borders1" />
          </Col>
          <Col xs={12} md={8}>
            <h5>Cyber Security and Security Audit Services</h5>
            <p>
              APTS is the nodal agency for the implementation of cyber-security policy
              implementation in the state, and offers consultancy services to organizations and
              government departments in terms of reviewing and auditing their cyber-security
              network and infrastructure.
            </p>
            <p>
              APTS oversees cyber security issues in the AP government, and is the authority
              responsible for the management and operations of APCSOC (Andhra Pradesh Cyber
              Security Operations Centre).
            </p>
            <p>
              For Security Audits, Once, APTS receives requests from the departments within AP or
              outside AP or from App developers (client).  The cyber-security audit process is
              followed in the chronological sequence as mentioned: -
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className="mt-4">
            <ol type="1" className="order-list-items">
              <li>APTS will share the Pre-requisites form to the client.</li>
              <li>The client shares the prerequisite data with APTS.</li>
              <li>
                APTS evaluates the scope of work, classify the audit (network/web/mobile
                application).  Further categorize the audit request into Simple/Medium/High to
                prepare the cost estimate.
              </li>
              <li>
                The audit manager will prepare the proforma invoice with estimate cost for
                approval.
              </li>
              <li>
                On approval of the cost estimate, the audit manager will send the proforma
                invoice to the client.
              </li>
              <li>
                The client accepts the cost estimate and request APTS to initiate the audit
                pending receipt of funds
              </li>
              <li>
                On acceptance by client, Audit manager requests the client department for SPoC
                and staging details. However, If the department/ client does not accept the APTS
                cost estimate, the file will be closed.
              </li>
              <li>
                On receipt of SPOC, staging details along with the role-based credentials, the
                audit team will verify the credentials.
              </li>
              <li>If credentials are not working, ATPS will request for fresh credentials</li>
              <li>
                If credentials are working audit will commence (duration will be around 10-15
                working days).
              </li>
              <li>On completion of the initial audit, and If  vulnerabilities are found</li>
              <li>
                The password protected initial security audit report will be shared to the client
                department (SPoC) for attending the vulnerabilities. Password will be sent
                separately to the SPoC.
              </li>
              <li>
                On receipt of communication from SPoC, confirming the closure of the reported
                vulnerabilities.
              </li>
              <li>
                APTS conducts second iteration of audit and if vulnerabilities are found the
                security audit report will be shared to the department SPoCfor attending the
                vulnerabilities.
              </li>
              <li>The iterations will be continued till there is no vulnerabilities are found</li>
              <li>If no vulnerabilities are found, audit certificate will be prepared.</li>
              <li>
                On receipt of audit service charges, the audit certificate will be issued to the
                client.
              </li>
            </ol>
          </Col>
        </Row>
        <Row className="my-4">
          <Col xs={12}>
            <h5>Guidelines for availing audit Services</h5>
            <ol type="1" className="order-list-items">
              <li>
                The ITE&C Department has identified the M/s APTS Ltd, as a Nodal agency on behalf
                of ITE&C Department for implementing Andhra Pradesh Cyber Security Policy (APCSP),
                and issued GO MS 4 dated 10/01/2019, IT&C Department directing all secretariat
                departments/HoDs/PSUs / Societies and institutions to undergo mandatory audits by
                APTS Ltd.
              </li>
              <li>
                APTS was empanelled with CERT-In (Govt. of India) for conducting security audit. As per
                GO MS 4 dated 10/01/2019, APTS issued certificates of treated on par with CERT
                empaneled audit agencies from 1st Nov 2020 to 31st Oct 2023, as a part of providing
                the audit & assurance services across the country.
              </li>
              <li>
                The audit service charges are to be paid in advance. The list of Cyber Security
                Assurance Services offered by APTS and rates for obtaining the security audit
                certificate is given below.
                <Row xs={1} md={2} className="g-4 mt-3">
                  <Col xs={12} md={8}>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Type of Assessment</th>
                            <th>Item Name</th>
                            <th>Cost per Service including tax Rs.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td rowSpan="3">1</td>
                            <td rowSpan="3">Web Application Security Assessment (WASA)</td>
                            <td>Simple</td>
                            <td>33,040.00 </td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>73,632.00 </td>
                          </tr>
                          <tr>
                            <td>Complex</td>
                            <td>141,600.00 </td>
                          </tr>
                          <tr>
                            <td rowSpan="3">2</td>
                            <td rowSpan="3">Mobile Application Security Assessment (MASA)</td>
                            <td>Simple</td>
                            <td>33,040.00 </td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>50,976.00</td>
                          </tr>
                          <tr>
                            <td>Complex</td>
                            <td>80,004.00</td>
                          </tr>
                          <tr>
                            <td rowSpan="3">3</td>
                            <td rowSpan="3">Application Source Code Review</td>
                            <td>Simple</td>
                            <td>164,000.00</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>192,000.00</td>
                          </tr>
                          <tr>
                            <td>Complex</td>
                            <td>288,000.00</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Vulnerability Assessment and Penetration Testing (VAPT)</td>
                            <td>Network</td>
                            <td>3,000.00</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Configuration Review</td>
                            <td>Servers/ Devices</td>
                            <td>2,891.00</td>
                          </tr>
                          <tr>
                            <td rowSpan="3">6</td>
                            <td rowSpan="3">Security Process Review</td>
                            <td>Simple</td>
                            <td>50,000.00</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>70,000.00</td>
                          </tr>
                          <tr>
                            <td>Complex</td>
                            <td>100,005.00</td>
                          </tr>
                          <tr>
                            <td rowSpan="3">7</td>
                            <td rowSpan="3">Functional Audit for Application</td>
                            <td>Simple</td>
                            <td>1,93,520.00</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>226,560.00 </td>
                          </tr>
                          <tr>
                            <td>Complex</td>
                            <td>3,39,840.00</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Red Team Exercise</td>
                            <td>Application</td>
                            <td>1,60,000.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <p className="mb-4">
                      <h5>Audit Request Form</h5>
                      <Link href="/documents/AUDIT_REQUEST_FORM.pdf">
                        <a target="_blank">
                          Audit Request Form
                        </a>
                      </Link>
                    </p>
                  </Col>
                </Row>
              </li>
              <li>
                The Departments are requested to pay the audit services charges plus taxes along
                with request.
              </li>
              <li>
                The classification of simple and medium application given below:
                <ol type="a" className="order-list-items">
                  <li>Simple: with static pages/lines of code</li>
                  <li>Medium: with below 25 dynamic pages/forms/lines of code</li>
                  <li>Complex: more than 25 dynamic pages/forms/lines of code</li>
                </ol>
              </li>
            </ol>
          </Col>
        </Row>
        {/* <h2 className="text-center m-4 apts-service-tittle" >CYBER SECURITY</h2>
        <Row xs={1} md={2} className="g-4">
          <Col xs={6} md={4}>
            <Image src="/images/Cyber-Security_BG_1.jpg" alt="Aadhaar" className="w-100 shadow innerpages-img-borders1" />
          </Col>
          <Col xs={12} md={8}  >
            <h5>Cyber Security</h5>
            <p>APTS is the nodal agency for Cyber Security-related activities in Andhra Pradesh that has taken the lead to build cyber security infrastructure and strengthening the capabilities of the State in dealing with adversaries. In tune with the increasing scope of cyber security in the IT-driven Governance, APTS continually provides expert advice, guidance and training to Government Departments and entities.</p>
            <p>APTS is pivotal in the State’s Cyber Security strategy and is tasked with implementing the Andhra Pradesh Government’s Cyber Security policy as defined in the G.O.Ms.No. 2, dated 01.03.2017 of ITE&C (Infrastructure) department.</p>

          </Col>
        </Row>
        <Row >
          <Col xs={12} md={12} className="mt-4">
            <p>The State Cyber Security strategy defines four major focus areas, namely, </p>

            <ol type="i" className="order-list-items">
              <li>Securing the Government Cyber Space, and Protection of Critical Information Infrastructure,</li>
              <li>Capacity Building</li>
              <li>Strengthening the Law Enforcement Agencies, and</li>
              <li>Promotions</li>
            </ol>
            <h5 className="my-3">Audit &amp; Assurance Services :</h5>

            <ol type="1" className="order-list-items">
              <li>The ITE&amp;C Department has identified the M/s APTS Ltd, as a Nodal agency on behalf of ITE&amp;C Department for implementing Andhra Pradesh Cyber Security Policy (APCSP), and issued GO MS 4 dated 10/01/2019, IT&amp;C Department directing all secretariat departments/HoDs/PSUs / Societies and institutions to undergo mandatory audits by APTS Ltd.</li>
              <li>APTS successfully completed the empanelment process in CERT-In (Govt of India) and vide letter number: 3(15)/204-CERT-In (Vol XI), dated:12.02.2021, empaneled with validity up to 31.10.2023.As per GO Ms 4, dated: 10.01.2019, APTS is the Nodal agency for providing the audit &amp; assurance services.</li>
              <li>The audit service charges are to be paid in advance. The list of Cyber Security Assurance Services offered by APTS and rates for obtaining the security audit certificate is given below.
                <div className="my-4">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Type of Assessment</th>
                        <th>Item Name</th>
                        <th>Cost per Service (including tax Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowspan="3">1</td>
                        <td rowspan="3">Web Application Security Assessment (WASA)</td>
                        <td>Simple</td>
                        <td>33,040</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>73,632</td>
                      </tr>
                      <tr>
                        <td>Complex</td>
                        <td>141,600</td>
                      </tr>
                      <tr>
                        <td rowspan="3">2</td>
                        <td rowspan="3">Mobile Application Security Assessment (MASA)</td>
                        <td>Simple</td>
                        <td>33,040</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>50,976</td>
                      </tr>
                      <tr>
                        <td>Complex</td>
                        <td>80004</td>
                      </tr>
                      <tr>
                        <td rowspan="3">3</td>
                        <td rowspan="3">Application Source Code Review</td>
                        <td>Simple</td>
                        <td>164000</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>192000</td>
                      </tr>
                      <tr>
                        <td>Complex</td>
                        <td>288000</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Vulnerability Assessment and Penetration Testing (VAPT)</td>
                        <td>Network per IP</td>
                        <td>3000</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Configuration Review</td>
                        <td>Servers/ Devices</td>
                        <td>2891</td>
                      </tr>
                      <tr>
                        <td rowspan="3">6</td>
                        <td rowspan="3">Security Process Review</td>
                        <td>Simple</td>
                        <td>50000</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>70000</td>
                      </tr>
                      <tr>
                        <td>Complex</td>
                        <td>100005</td>
                      </tr>
                      <tr>
                        <td rowspan="3">7</td>
                        <td rowspan="3">Functional Audit for Application</td>
                        <td>Simple</td>
                        <td>1,93,520</td>
                      </tr>
                      <tr>
                        <td>Medium</td>
                        <td>226,560</td>
                      </tr>
                      <tr>
                        <td>Complex</td>
                        <td>3,39,840</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>Red Team Exercise</td>
                        <td>Application</td>
                        <td>1,60,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>The Departments are requested to pay the audit services charges plus taxes along with request.</li>
              <li>The classification of simple, medium and complex application given below:
                <ol type="a" className="order-list-items">
                  <li>Simple: with static pages/lines of code</li>
                  <li>Medium: with below 25 dynamic pages/forms/lines of code</li>
                  <li>Complex: more than 25 dynamic pages/forms/lines of code</li>
                </ol>
              </li>
            </ol>
          </Col>
        </Row>
        <Row className='my-4 cust-downloads'>
          <Col>
            <Link href="/documents/Security_Audit_PRE-REQUISITES_Form.pdf">
              <a target="_blank">
                <FontAwesomeIcon icon={faFileWord} className="text-danger fa-2x mx-2" /> Security Audit Pre-Requisites
              </a>
            </Link>
          </Col>
        </Row>
  */}

      </Container>
    </div>
  );
}
