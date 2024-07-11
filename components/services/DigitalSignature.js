import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function DigitalSignature() {
  const router = useRouter();

  return (
    <div className="services-bg">
      <Container className="innerPage">
        <h2 className="text-center p-4 apts-service-tittle">
          DIGITAL SIGNATURE
        </h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Image
              src="/images/Digital-Signature_BG_1.jpg"
              alt="Aadhaar"
              className="w-100 shadow innerpages-img-borders1"
            />
          </Col>
          <Col xs={12} md={8}>
            <h5>Digital Signature Certificates (DSC) Services</h5>
            {/* <p>APTS is the nodal agency for Cyber Security-related activities in Andhra Pradesh thThe Government of Andhra Pradesh has authorized the use of digital signatures as the preferred means of providing signatures for all Government official documents.  Digital signatures improve the efficiency, reduces costs, eliminate the use of paper and more importantly enable signing of documents from any location.  The eSignatures are more secure than traditional pen ink, signatures on paper and are tamper evident.</p>
            <p>APTS as a Sub-Certifying Authority (Sub-CA), under M/s. QCID Technologies the Certifying Authority (CA), is authorized to issue Digital Certificates to Government employees.  At present Class – II DSCs are using by the Government Users.</p> */}
            <p>
              The Government of Andhra Pradesh has authorized the use of digital
              signatures as the preferred means of providing signatures for all
              Government officials, and APTS is the flagship organization,
              offering the services for the state of Andhra Pradesh.
            </p>
            <p>
              The Government of Andhra Pradesh has been using Digital Signature
              Certificates in various IT projects including eProcurement
              platforms. Some notable state portals that make use of DSC
              services include:
            </p>
            <p>
              - Meeseva (Integrated Services Delivery Gateway) <br />- eOffice
              Applications <br />- eProcurement Portal
            </p>
            {/*<Button
              variant="primary"
              onClick={() =>
                router.push(
                  "/services/digital-signature/digital-signature-form"
                )
              }
            >
              Apply For DSC
            </Button> */}
          </Col>
        </Row>
        <Row xs={1} md={2} className="g-4 mt-2">
          <Col xs={12} md={9}>
            <p>
              The procedure for issue of the Digital Signature Certificates
              (DSCs) is as follows:-
            </p>
            <p>
              Supporting documents for Processing Digital Signature Certificates
              should be in Originals:
            </p>
            <ol>
              <li>
                Covering letter addressed to the Managing Director, APTS, and
                Vijayawada.
              </li>
              <li className="mb-0">
                Demand Draft for the DSCs:
                <div className="table-responsive pt-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colSpan="5" className="text-center">
                          Meeseva/Webland/eProcurement etc
                        </th>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <th colSpan="2">1 Year</th>
                        <th colSpan="2"> 2 Years</th>
                      </tr>
                      <tr>
                        <th />
                        <th> Renewal</th>
                        <th>New</th>
                        <th>Renewal</th>
                        <th>New</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Signature or Encryption</td>
                        <td> Rs.800</td>
                        <td>Rs.900</td>
                        <td>Rs.900</td>
                        <td>Rs.1300</td>
                      </tr>
                      <tr>
                        <td>Signature &amp; Encryption</td>
                        <td> Rs.1400</td>
                        <td>Rs.1500</td>
                        <td>Rs.1600</td>
                        <td>Rs.2000</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colSpan="5" className="text-center">
                          eOffice from 01.06.16
                        </th>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <th colSpan="2">1 Year</th>
                        <th colSpan="2"> 2 Years</th>
                      </tr>
                      <tr>
                        <th />
                        <th> Renewal</th>
                        <th>New</th>
                        <th>Renewal</th>
                        <th>New</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Signature or Encryption</td>
                        <td> Rs.800</td>
                        <td>Rs.900</td>
                        <td>Rs.900</td>
                        <td>Rs.900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="mt-0">
                The DD should be taken in favour of Managing Director, A.P
                Technology Services Limited, Vijayawada.
              </li>
              <li>Authorization Letter</li>
              <li>
                Higher Authority Employee ID Card, PAN Card and Photo must be in
                Original .jpg
              </li>
              <li>Applicant Employee ID Card, PAN Card and Photo</li>
              <h6
                style={{
                  position: "relative",
                  left: "-15px",
                  fontweight: "bold",
                  textDecoration: "underline",
                  fontSize: "18px",
                }}
              >
                Procedure for DSC:
              </h6>
              <li>
                OTP will be received by the Authorized person in (registered
                mobile no. and mail ID) for creating the account. Video link
                will be received to the registered mobile no. In the video link
                In the video Authorized person should show the Authorization
                letter, Original PAN card and Office ID card.
              </li>
              <li>
                After entering the details of the applicant, OTP will be
                received by the applicant on registered Mobile no. & government
                eMail Id.
              </li>
              <li>
                Link will be received to the registered mobile no. for video
                verification. In the video applicant should show the Original
                PAN card and Office ID card
              </li>
              <li>
                For downloading the key applicant will receive another OTP on
                registered mobile no. must share to the concerned issuing
                authority of the Digital Signature Certificates.
              </li>
            </ol>
            <Row className="mb-4">
              <Col>
                <p>
                  <b>-</b> Courier charges will be Rs.300/- in addition to
                  above:
                </p>
                <p>
                  <b>-</b> ITE&amp;C department(Portal Wing), the Government has
                  sanctioned the budget for implementation of eOffice in all
                  offices of HODs. The above fees will be applicable for eOffice
                  usage as per Table-2, other than Government HODs. The payment
                  shall be made in the form of Demand Draft drawn in favor of
                  "Managing Director, A.P.Technology Services Ltd., Vijayawada."
                </p>
                <p>
                  <b>-</b> For further assistance, Please Contact:
                </p>
                <div>
                  <Link href="/helpdesk" className="">
                    <h5>
                      <p style={{ cursor: "pointer" }}>
                        APTS Helpdesk - Contact Details
                      </p>
                    </h5>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={3}>
            <div className="mb-4">
              <h5>Application Form</h5>
              <Link href="/documents/Authorization-Letter-DSC-empty-form.pdf">
                <a target="_blank">Letter of Authorization</a>
              </Link>
              <br />
              <Link href="/documents/emudhra-id-proof-form.pdf">
                <a target="_blank">Letter of Identity Proof</a>
              </Link>
            </div>
            {/*  <div className="my-4">
                <h5>Required Documents</h5>

                <span>DD</span>
                <br />
                <span>Authorization Letter</span>
                <br />
                <span>Applicant Employee ID Card</span>
                <br />
                <span>PAN Card</span>
                <br />
                <span>Photo</span>
              </div>
              */}
          </Col>
        </Row>
        {/*  <Row >
          <Col xs={12} md={12} className="mt-4">

            <p>  As per the CCA Guidelines http://cca.gov.in/sites/files/pdf/guidelines/CCA-IVG.pdf),  APTS will issue only class-3 individual Signing Certificate (both Organizational &amp; Personal) from 01.01.2021 onwards. (Please   refer section 1.13.1 of Identity Verification Guidelines 2.0, dated:26-11-2020)</p>
            <p>The issuance of class 2 individual signing certificate (both Organizational &amp; Personal) to subscribers will be discontinued from 31.12.2020 onwards (the existing Class-2 certificates can be used by the user till their validity).</p>
            <p>The Class 3 certificate will have Organizational OID of Class-2 also. Hence, Class 3 Signing and Encryption can be used instead of Class 2 Signing and Encryption.</p>
            <h5 className="my-3">Video verification is mandatory for all DSCs including Government, as detailed   below:</h5>

            <ol type="a" className="order-list-items">
              <li>According to the guidelines issued by the CCA in the Section 1.11 (1), “The video verification of the application shall be carried out by CA. The applicant shall be available to CA for video verification.</li>
              <li>During the verification, the applicant shall display original PAN card and Government ID having address for cross verification by CA.  Both the PAN details and address in the ID captured in the video shall be in a clear and readable form. The applicant shall keep the PAN card &amp; Identity proof of the Authorized Signatory.</li>
              <li>Video verification is applicable to DSC applicants, authorized signatories and originals of the documents, it refers the Authorized Signatory</li>
              <li>The video recording of interactive session with DSC applicant by using the facility provided by CA application shall not be less than 20 seconds.</li>
              <li>Only one-way video recording session with applicant is permitted.</li>
              <li>Hence, all the applicants are requested to cooperate with APTS for video verification, which is mandatory as per the CCA Guidelines.</li>
            </ol>
          </Col>

        </Row>
        
        <Row className="g-4">
          <Col className="text-center mt-4" xs={12} md={8}>
            <p className="text-center">
              <b>
                <u>The following rates are applicable from 01.01.2021</u>
              </b>
            </p>
            <p className="text-center">
              <b>
                (as per Controller of Certifying Authority (CCA), Ministry of
                Electronics &amp; Information Technology, Government of India,
                only Class-III certificates will be issued.)
              </b>
            </p>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}
