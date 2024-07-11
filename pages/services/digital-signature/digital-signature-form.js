import Link from "next/link";
import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import AddDSE from "../../../components/dashboard/digitalcerticate/dse/AddDSE";
import Layout from "../../../components/layout/Layout";

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
                    <p className="text-dec-color">Home</p>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-white">
                  <Link href="/services/digital-signature">
                    <a style={{ color: "#f84b8b" }}>Digital Signature</a>
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h2 className="text-white my-2 text-uppercase">
                Digital Signature Certificate Form
              </h2>
            </Container>
          </div>
        </div>
      </div>
      <Container className="pb-5 pt-3">
        <AddDSE />
      </Container>
    </Layout>
  );
}
