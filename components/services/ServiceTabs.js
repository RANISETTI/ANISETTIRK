import {
  faAddressCard,
  faClipboardList,
  faFileSignature,
  faHandshake,
  faShoppingCart,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import ComingSoon from "../ComingSoon";
import Aadhar from "./Aadhar";
import Consultancy from "./Consultancy";
import CyberSecurity from "./CyberSecurity";
import DigitalSignature from "./DigitalSignature";
import Empanelment from "./Empanelment";
import EProcurementeAuctionSystem from "./EProcurementeAuctionSystem";
import IIPSection from "./IIPSection";
import Partnerships from "./Partnerships";
import PreferentialMarketAccess from "./PreferentialMarketAccess";
import Procurement from "./Procurement";
import VendorRegistration from "./VendorRegistration";

const ServiceTabData = [
  {
    id: 1,
    icon: faHandshake,
    name: "Consultancy",
    active: "false",
    link: "/services/consultancy",
    value: "consultancy",
  },
  {
    id: 2,
    icon: faAddressCard,
    name: "Aadhaar Services",
    active: "true",
    link: "/services/aadhar-services",
    value: "aadhar-services",
  },
  {
    id: 3,
    icon: faShoppingCart,
    name: "Procurement",
    active: "false",
    link: "/services/procurement",
    value: "procurement",
  },
  {
    id: 4,
    icon: faUserShield,
    name: "Cyber Security",
    active: "false",
    link: "/services/cyber-security",
    value: "cyber-security",
  },
  {
    id: 5,
    icon: faFileSignature,
    name: "Digital Signature",
    active: "false",
    link: "/services/digital-signature",
    value: "digital-signature",
  },
  {
    id: 6,
    icon: faClipboardList,
    name: "Empanelment",
    active: "false",
    link: "/services/empanelment",
    value: "empanelment",
  },
];

const breadcrumbNames = [
  {
    id: 1,
    name: "Aadhaar Services",
    value: "aadhar-services",
    image: "url(/images/aadhaar-card.jpg)",
  },
  {
    id: 2,
    name: "Procurement",
    value: "procurement",
    image: "url(/images/procurement-banner.jpg)",
  },
  {
    id: 3,
    name: "Cyber Security",
    value: "cyber-security",
    image: "url(/images/cyber-security.jpg)",
  },
  {
    id: 4,
    name: "Digital Signature",
    value: "digital-signature",
    image: "url(/images/Digital-Signature.png)",
  },
  {
    id: 5,
    name: "Empanelment",
    value: "empanelment",
    image: "url(/images/Empanelment.png)",
  },
  {
    id: 6,
    name: "Consultancy",
    value: "consultancy",
    image: "url(/images/Consultancy.png)",
  },
  {
    id: 7,
    name: "Vendor Registration",
    value: "vendor-registration",
    image: "url(/images/vendor-registration.jpg)",
  },
  {
    id: 8,
    name: "e-Procurement and e-Auction",
    value: "e-auction",
    image: "url(/images/eProcurement.jpg)",
  },
  {
    id: 9,
    name: "Partnerships with InnovativeTechnology Companies",
    value: "partnerships",
    image: "url(/images/Partnerships-ITC.png)",
  },
  {
    id: 10,
    name: "Preferential Market Access",
    value: "preferential-market-access",
    image: "url(/images/pac.jpg)",
  },
  {
    id: 11,
    name: "IIP Section",
    value: "iipsection",
    image: "url(/images/iip-section.jpg)",
  },
];

const renderServiceTabs = (item) => {
  const serviceTabs = [];
  ServiceTabData.map((serviceTab) => {
    serviceTabs.push(
      <Col>
        <Link href={serviceTab.link}>
          <a className="text-decoration-none">
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                outline: item.includes(serviceTab.value)
                  ? "5px #0386dd solid"
                  : "",
                padding: "20px 5px",
                borderRadius: "10px",
              }}
            >
              <FontAwesomeIcon icon={serviceTab.icon} className="font-icon-1" />
              <Card.Body>
                <Card.Title className="infra-tab-font text-nowrap">
                  {serviceTab.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Link>
      </Col>
    );
  });
  return serviceTabs;
};

const renderContent = (value) => {
  switch (value) {
    case "aadhar-services":
      return <Aadhar />;
    case "consultancy":
      return <Consultancy />;
    case "procurement":
      return <Procurement />;
    case "digital-signature":
      return <DigitalSignature />;
    case "cyber-security":
      return <CyberSecurity />;
    case "empanelment":
      return <Empanelment />;
    case "vendor-registration":
      return <VendorRegistration />;
    case "preferential-market-access":
      return <PreferentialMarketAccess />;
    case "e-auction":
      return <EProcurementeAuctionSystem />;
    case "partnerships":
      return <Partnerships />;
    case "iipsection":
      return <IIPSection />;
    default:
      return <ComingSoon />;
  }
};

export default function ServiceTabs() {
  const router = useRouter();
  const page = router.asPath.split("/")[2];
  return (
    <div>
      {breadcrumbNames
        .filter((filterItem) => filterItem.value === page)
        .map((item) => (
          <div key={item.id}>
            <div
              style={{
                backgroundImage: page.includes(item.value) ? item.image : "",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <div className="breadcrumb-names">
                <Container>
                  <h2 className="text-center mb-4 text-white apts-service-tittle">
                    OUR SERVICES
                  </h2>
                  <Row>{renderServiceTabs(router.asPath)}</Row>
                </Container>
              </div>
            </div>
            <section className="infra-sec-style">
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/">
                      <p className="infra-anchor-breadcrumb">Home</p>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link href={router.asPath}>
                      <p
                        style={{ display: "contents" }}
                        className="infra-anchor-breadcrumb"
                      >
                        Services
                      </p>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active className="text-black">
                    {page.includes(item.value) ? item.name : ""}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Container>
            </section>
          </div>
        ))}
      {renderContent(page)}
    </div>
  );
}
