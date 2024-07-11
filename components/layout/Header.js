import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'

export default function Header() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Navbar
      collapseOnSelect
      variant="light"
      expand="lg"
      fixed="top"
      className="shadow bg-white"
    >
      <Container>
        <Link href="/">
          <a className="cust-height-71">
            <Navbar.Brand className="mx-1 cust-inline">
              <img
                src="/images/logo_beta.png"
                alt="APTS Logo"
                width="151"
                className="my-2 d-inline-block align-top cust-logo-apts"
              />
            </Navbar.Brand>
          </a>
        </Link>
        {/* <Link href="https://harghartiranga.com/">
          <a className="cust-height-71" target="_blank">
            <Navbar.Brand className="mx-0 cust-inline">
               <img
                src="/images/logo_harghartiranga.png"
                width="97"
                alt="HarGharTiranga Logo"
                className="ms-2 my-2 d-inline-block align-top cust-logo-hgt"
              /> 
            </Navbar.Brand>
          </a>
        </Link> */}
        <Link href="/documents/ISO-9001-2015.pdf">
          <a className="cust-height-71" target="_blank">
            <Navbar.Brand className="mx-0 cust-inline">
              <img
                src="/images/ISO-9001.png"
                width="60"
                alt="ISO-9001:2015"
                title="ISO-9001:2015"
                className="ms-2 my-2 d-inline-block align-top cust-logo-hgt"
              />
            </Navbar.Brand>
          </a>
        </Link>
        <Link href="/documents/ISO-27001-2013.pdf">
          <a className="cust-height-71" target="_blank">
            <Navbar.Brand className="mx-0 cust-inline">
              <img
                src="/images/ISO-27001.png"
                width="60"
                alt="ISO-27001:2013"
                title="ISO-27001:2013"
                className="ms-2 my-2 d-inline-block align-top cust-logo-hgt"
              />
            </Navbar.Brand>
          </a>
        </Link>
        <Link href="https://g20.mygov.in/">
          <a className="cust-height-71" target="_blank">
            <Navbar.Brand className="mx-0 cust-inline">
              <img
                src="/images/g20-logo.png"
                alt="G20 Logo"
                width="106"
                className="ms-2 my-2 d-inline-block align-top cust-logo-hgt"
              />
            </Navbar.Brand>
          </a>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav as="ul" className="ms-auto cust-effect">
            <Link href="/" passHref>
              <Nav.Link as="a">Home</Nav.Link>
            </Link>
            <Link href="/about-us" passHref>
              <Nav.Link
                as="a"
                className={router.asPath.includes("about-us") ? "active" : ""}
              >
                About Us
              </Nav.Link>
            </Link>
            <span>
              <NavDropdown
                title="Services"
                id="basic-nav-dropdown"
                className={router.asPath.includes("services") ? "active" : ""}
              >
                <Link href="/services/consultancy" passHref>
                  <NavDropdown.Item as="a">Consultancy</NavDropdown.Item>
                </Link>
                <Link href="/services/procurement" passHref>
                  <NavDropdown.Item as="a">Procurement</NavDropdown.Item>
                </Link>
                <Link href="/services/digital-signature" passHref>
                  <NavDropdown.Item as="a">Digital Signature</NavDropdown.Item>
                </Link>
                <Link href="/services/cyber-security" passHref>
                  <NavDropdown.Item as="a">Cyber Security</NavDropdown.Item>
                </Link>
                <Link href="/services/empanelment" passHref>
                  <NavDropdown.Item as="a">Empanelment</NavDropdown.Item>
                </Link>
                {/* 
              <NavDropdown title="Empanelment" className="custSubmenu custSubmenu3">
                <Link href="/services/vendor-registration" passHref>
                  <NavDropdown.Item as="a">Vendor Registration</NavDropdown.Item>
                </Link>
                <Link href="/services/preferential-market-access" passHref>
                  <NavDropdown.Item as="a">Preferential Market Access</NavDropdown.Item>
                </Link>
              </NavDropdown>
              */}
                <Link href="/services/aadhar-services" passHref>
                  <NavDropdown.Item as="a">
                    Aadhaar - AUA/KUA Services
                  </NavDropdown.Item>
                </Link>
                {/*  <NavDropdown.Item href="/services/e-auction">e-Procurement and e-Auction</NavDropdown.Item> 
              <Link href="/services/partnerships" passHref>
                <NavDropdown.Item as="a">
                  {' '}
                  Partnerships with Innovative
                  {' '}
                  <br />
                  Technology Companies
                  {' '}
                </NavDropdown.Item>
              </Link>
              <Link href="/services/iipsection" passHref>
                <NavDropdown.Item as="a">IIP Section</NavDropdown.Item>
              </Link> */}
              </NavDropdown>
            </span>
            <NavDropdown
              title="Infrastructure Support"
              id="basic-nav-dropdown"
              className={
                router.asPath.includes("infrastructure-support") ? "active" : ""
              }
            >
              <Link href="/infrastructure-support/apswan" passHref>
                <NavDropdown.Item as="a">APSDWAN</NavDropdown.Item>
              </Link>
              <Link href="/infrastructure-support/apsdc" passHref>
                <NavDropdown.Item as="a">APSDC</NavDropdown.Item>
              </Link>
              <Link href="/infrastructure-support/apscan" passHref>
                <NavDropdown.Item as="a">APSCAN</NavDropdown.Item>
              </Link>
              <Link href="/infrastructure-support/apcsoc" passHref>
                <NavDropdown.Item as="a">APCSOC</NavDropdown.Item>
              </Link>
              <Link href="/infrastructure-support/vc-management" passHref>
                <NavDropdown.Item as="a">Video Conference</NavDropdown.Item>
              </Link>
              {/* <NavDropdown.Item href="/infrastructure-support/public-broadcast">Public Broadcast &amp;<br /> Feedback Telephony System</NavDropdown.Item> */}
            </NavDropdown>
            <Link href="/tenders" passHref>
              <Nav.Link
                as="a"
                className={router.asPath.includes("tenders") ? "active" : ""}
              >
                Tenders
              </Nav.Link>
            </Link>
            <Link href="/downloads" passHref>
              <Nav.Link
                as="a"
                className={router.asPath.includes("downloads") ? "active" : ""}
              >
                Downloads
              </Nav.Link>
            </Link>
            {/*
        <Nav.Link as="a" href="/infrastructure-support" className={router.asPath.includes('infrastructure-support') ? 'active' : ''}>Infrastructure Support</Nav.Link>
        */}
            <Link href="/careers" passHref>
              <Nav.Link
                as="a"
                className={router.asPath.includes("careers") ? "active" : ""}
              >
                Careers
              </Nav.Link>
            </Link>
            <Link href="/ourteam" passHref>
              <Nav.Link
                as="a"
                className={router.asPath.includes("ourteam") ? "active" : ""}
              >
                Our Team
              </Nav.Link>
            </Link>
            <Button
              href="/user/login"
              style={{ borderRadius: "20px" }}
              className={
                router.asPath.includes("login")
                  ? "signin-btn active"
                  : "signin-btn"
              }
            >
              {isLoggedIn ? "Dashboard" : "Sign In"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
