import Link from 'next/link';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import ContactUs from './home/blocks/ContactUs';

export default function Contact() {
  return (
    <div>
      <div className='contact-page-bg-style'>
        <div className='contact-page-bg-style1'>
          <Container className="position-relative innerPage">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href='/'>
                  <a className='contact-text-dec'>
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Contact Us 1</Breadcrumb.Item>
            </Breadcrumb>
          </Container>
        </div>
      </div>
      <ContactUs />
    </div>
  );
}
