import { Container, Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import VideoConferenceForm from '../components/videoConference/VideoConferenceForm';

export default function VideoConferenceFormPage() {
  return (
    <Layout>
      <div >
      <div className="VC-Management-pg-bg">
        <div className="about-sec-pad">
          <Container className="position-relative">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href='/'>
                  <a className="text-dec-color">
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Infrastructure Support</Breadcrumb.Item>
            </Breadcrumb>
          <h2 className="text-white my-2 text-uppercase"> Video Conference</h2>
          </Container>
        </div>
      </div>
      
    </div>
    <div className="services-bg">
      <Container className='py-5'>
      <VideoConferenceForm className="" />
      </Container>
      </div>
    </Layout>
  )
}
