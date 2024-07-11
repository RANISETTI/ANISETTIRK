import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Button, Card, Col, Container, Row, Spinner
} from 'react-bootstrap';
import ContactUs from '../home/blocks/ContactUs';
import CareersList from './CareersList';


export default function Careers() {
  return (
    <div className=''>
      <div className='careers-banner'>
        <div className='careers-banner-background'>
          <Container className="position-relative">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a className='text-dec-color'>
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Careers</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-white my-2 text-uppercase">APTS Careers</h2>
          </Container>
        </div>
      </div>
      <div className='about-pg-content'>
        <h2 className="apts-team-title">Careers</h2>
        <Container className="apts-careers-headings">
          <h3 className='color-pink'>ANDHRA PRADESH TECHNOLOGY SERVICES (APTS)</h3>
          <h5>Government of Andhra Pradesh</h5>
          <h4>DETAILED NOTIFICATION FOR RECRUITMENT 2022-23</h4>
        </Container>
        <Container className="apts-careers-headings mb-5">
          <CareersList />
        </Container>
      </div>
    </div>

  );
}
