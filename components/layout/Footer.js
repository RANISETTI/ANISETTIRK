import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="footer-bg">
      <Container>
        <Row xs={1} md={4} className="g-4">
          <Col>
            <h5 className="purpul">APTS</h5>
            <Link href="/about-us">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  About APTS
                </p>
              </a>
            </Link>
            <Link href="/services/aadhar-services">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Services
                </p>
              </a>
            </Link>
            <Link href="/infrastructure-support/apswan">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Infrastructure Support
                </p>
              </a>
            </Link>
            <Link href="/tenders">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Tenders
                </p>
              </a>
            </Link>
            <Link href="/careers">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Careers
                </p>
              </a>
            </Link>
            <Link href="/ourteam">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Our Team
                </p>
              </a>
            </Link>
          </Col>
          <Col>
            <h5 className="purpul">Office Address</h5>
            <p>Andhra Pradesh</p>
            <p>Technology Services Ltd,</p>
            <p>3rd Floor, R&B Building,</p>
            <p>MG Road, Labbipet,</p>
            <p>Vijayawada-520010,</p>
            <p>Andhra Pradesh,</p>
            <p>INDIA.</p>
          </Col>
          <Col>
            <h5 className="purpul">Phone</h5>
            <p>0866-2468108</p>
            {/* <h5 className='purpul'>Fax</h5>
            <p>+91 80983 43224</p> */}
            <h5 className="purpul">Email</h5>
            <p>service-apts[at]ap[dot]gov[dot]in</p>
          </Col>
          <Col>
            <Link href="/contact">
              <a className="text-decoration-none">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  Contact Us
                </p>
              </a>
            </Link>
            <Link href="/documents/User-Manual_IT-Assets_Login_Ver1.0.pdf">
              <a className="text-decoration-none" target="_blank">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  User Manual
                </p>
              </a>
            </Link>
            <Link href="/documents/ITAssets_FQA_Ver1.2.pdf">
              <a className="text-decoration-none" target="_blank">
                <p className="dark-purpule">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="right-arrow-footer"
                  />
                  FAQ's
                </p>
              </a>
            </Link>
            <p className="my-3">
              Website Developed By <strong>APTS</strong>
            </p>
            <p className="text-justify-none">
              Copyright ® Andhra Pradesh Technology Services
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
