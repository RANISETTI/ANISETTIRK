import Link from 'next/link';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import AddVendorList from '../../../components/dashboard/vendorEmpanelment/vendorList/AddVendorList';
import Layout from '../../../components/layout/Layout';

export default function DSCApplicationFormPage() {
  return (
    <Layout>
      <div>
        <div className="DSC-application-pg-bg">
          <div className="about-sec-pad">
            <Container className="position-relative">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href="/">
                    <a className="text-dec-color">
                      Home
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-white">
                  <Link href="/services/empanelment">
                    <a style={{ color: '#f84b8b' }}>
                      Vendor Empanelment
                    </a>
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h2 className="text-white my-2 text-uppercase">
                Vendor Empanelment  Form
              </h2>
            </Container>
          </div>
        </div>
      </div>
      <Container className="pb-5 pt-3">
      <h2 className="apts-team-title">VENDOR EMPANELMENT FORM</h2>
        <AddVendorList isPublic />
      </Container>
    </Layout>
  );
}
