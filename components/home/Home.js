import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUs from "./blocks/About";
import Carousel from "./blocks/Carousel";
import ContactUs from "./blocks/ContactUs";
import Infrastructure from "./blocks/Infrastructure";
import News from "./blocks/News";
import Services from "./blocks/Services";

export default function Home() {
  return (
    <div className="my-auto relative">
      <div className="row cm-itMinister">
                    <div className="col-12"><img className='img-fluid' src='/images/apcm.png'/></div>
                    <div className="col-12"><img className='img-fluid' src='/images/newit.png'/></div>
                  </div>
      <Carousel />

      <div className="marque-sec-1">
        <div className="tender-scroll-text-container">
          <div className="tender-scroll-text">
            <p>
              <a
                style={{ color: "#031B35" }}
                target="_blank"
                href="https://aadudhamandhra.com/"
              >
                https://aadudhamandhra.com
              </a>{" "}
              |{" "}
              <a href="javascript:void(0);">
                APTS Provisional Seniority of the regular employees.
              </a>{" "}
              |{" "}
              <a href="/services/cyber-security">
                All Security Audit Requests Received after 15th December are
                Chargable.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="marque-sec-1">
        <div className="tender-scroll-text-container">
          <div className="tender-scroll-text">
            <p>
              <a href="javascript:void(0);">
                From 01-01-2021 onwards APTS will not publish tender
                notifications in News Papers. Prospective bidders to follow APTS
                Tenders Web Page and AP Eprocurement Portal for APTS Tender
                Notifications.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="marque-sec-1">
        <div className="tender-scroll-text-container">
          <div className="tender-scroll-text">
            <p>
              <a href="javascript:void(0);">
                APTS on behalf of ITE&C, extends AUA/KUA services and hits a
                remarkable milestone of 1.20 Crore transactions for YSR Bima
                project on 06.06.2023.
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="marque-sec-2">
      <Container>
        <div className="tender-scroll-text-container">
          <div className='tender-scroll-text'>
            <p>
              <a href="/services/cyber-security">All Security Audit Requests Received after 15th December are Chargable.</a>
            </p>
          </div>
        </div>
        </Container>
      </div>
      <div className="marque-sec-2">
      <Container>
        <div className="tender-scroll-text-container">
          <div className='tender-scroll-text'>
            <p>
              <a href="javascript:void(0);">From 01-01-2021 onwards APTS will not publish tender notifications in News Papers. Prospective bidders to follow APTS Tenders Web Page and AP Eprocurement Portal for APTS Tender Notifications.</a>
            </p>
          </div>
        </div>
        </Container>
      </div>
  */}
      <AboutUs />
      <Services />
      <Infrastructure />
      <News />
      <ContactUs />
    </div>
  );
}
