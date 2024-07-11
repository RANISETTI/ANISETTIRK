import Link from 'next/link';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import Layout from '../../../components/layout/Layout';
import VideoConferenceForm from '../../../components/videoConference/VideoConferenceForm';

export default function VideoConferenceFormPage() {
  return (
    <Layout>
      <div>
        <div className="VC-Management-pg-bg">
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
                  <Link href="/infrastructure-support/vc-management">
                    <a style={{ color: '#f84b8b' }}>
                      Infrastructure Support
                    </a>
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h2 className="text-white my-2 text-uppercase"> Video Conference</h2>
            </Container>
          </div>
        </div>
      </div>
      <div className="services-bg">
        <div className="">
          <div className="tender-scroll-text-container">
            <div className="tender-scroll-text">
              <Link href="/documents/U-O-Note-No-1636383-PU-A-2022-1.pdf">
                <a target="_blank" className="text-danger">
                  Please Download Attachment to follow the C.S directions on -VC by Secretaries/
                  HODs with District Collectors and Joint Collectors
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="tender-scroll-text-container">
            <div className="tender-scroll-text">
              <p className="">
                <h4 className="text-success">Please contact 9652230088 for your video conference booking slot confirmation.</h4>
              </p>
            </div>
          </div>
        </div>
        <Container className="pb-5">
        <div className="apts-downloads-title">
    <h2 className="text-center apts-services-title p-4">BOOK YOUR SLOT</h2>
      </div>
      
          <VideoConferenceForm className="" />
        </Container>
      </div>
    </Layout>
  );
}
