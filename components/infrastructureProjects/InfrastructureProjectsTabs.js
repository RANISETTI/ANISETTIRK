import { faCamera, faGlobe, faNetworkWired, faServer, faShieldAlt, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Breadcrumb, Card, Col, Container, Row
} from 'react-bootstrap';
import ComingSoon from '../ComingSoon';
import APCSOC from './APCSOC';
import APSCAN from './APSCAN';
import APSDC from './APSDC';
import APSWAN from './APSWAN';
import PublicBroadcast from './PublicBroadcast';
import VCManagement from './VCManagement';

const InfrastructureProjectTabData = [

  {
    id: 1,
    icon: faNetworkWired,
    name: 'APSDWAN',
    active: 'true',
    link: '/infrastructure-support/apswan',
    value: 'apswan',
  },

  {
    id: 2,
    icon: faServer,
    name: 'APSDC',
    active: 'false',
    link: '/infrastructure-support/apsdc',
    value: 'apsdc',
  },
  {
    id: 3,
    icon: faWifi,
    name: 'APSCAN',
    active: 'false',
    link: '/infrastructure-support/apscan',
    value: 'apscan',
  },

  /* {
    id: 4,
    icon: faGlobe,
    name: 'PB&FTS',
    active: 'false',
    link: '/infrastructure-support/public-broadcast',
    value: 'public-broadcast',
  }, */

  {
    id: 4,
    icon: faShieldAlt,
    name: 'APCSOC',
    active: 'false',
    link: '/infrastructure-support/apcsoc',
    value: 'apcsoc',
  },
  {
    id: 5,
    icon: faCamera,
    name: 'VC Management',
    active: 'false',
    link: '/infrastructure-support/vc-management',
    value: 'vc-management',
  },

];

const breadcrumbNames = [

  {
    id: 1,
    name: 'APSDWAN',
    value: 'apswan',
    image: 'url(/images/APSWAN.jpg)',
  },
  {
    id: 2,
    name: 'VC Management',
    value: 'vc-management',
    image: 'url(/images/vc-management.png)',
  },
  {
    id: 3,
    name: 'APSDC',
    value: 'apsdc',
    image: 'url(/images/data-center.jpg)',
  },
  {
    id: 4,
    name: 'APSCAN',
    value: 'apscan',
    image: 'url(/images/APSCAN.jpg)',
  },
  {
    id: 5,
    name: 'Public Broadcast & Feedback Telephony System',
    value: 'public-broadcast',
    image: 'url(/images/PB&FTS.png)',
  },
  {
    id: 6,
    name: 'Andhra Pradesh Cyber Security Operational Center',
    value: 'apcsoc',
    image: 'url(/images/cybersecurity.jpg)',
  },
];

const renderInfrastructureProjectTabs = (item) => {
  const InfrastructureProjectTabs = [];
  InfrastructureProjectTabData.map((InfrastructureProjectTab) => {
    InfrastructureProjectTabs.push(
      <Col>
        <Link href={InfrastructureProjectTab.link}>
          <a className="text-decoration-none">
            <Card style={{
              display: 'flex', alignItems: 'center', outline: item.includes(InfrastructureProjectTab.value) ? '5px #0386dd solid' : '', padding: '20px 5px', borderRadius: '10px',
            }}
            >
              <FontAwesomeIcon icon={InfrastructureProjectTab.icon} className="font-icon-1" />
              <Card.Body>
                <Card.Title className="infra-tab-font text-nowrap">{InfrastructureProjectTab.name}</Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Link>
      </Col>,
    );
  });
  return InfrastructureProjectTabs;
};

const renderContent = (value) => {
  switch (value) {
    case 'apswan':
      return (<APSWAN />);
    case 'vc-management':
      return (<VCManagement />);
    case 'apsdc':
      return (<APSDC />);
    case 'apscan':
      return (<APSCAN />);
    /* case 'public-broadcast':
      return (<PublicBroadcast />); */
    case 'apcsoc':
      return (<APCSOC />);
    default:
      return (<ComingSoon />);
  }
};

export default function InfrastructureProjectsTabs() {
  const router = useRouter();
  const page = router.asPath.split('/')[2];
  return (
    <div>
      {breadcrumbNames.filter((filterItem) => filterItem.value === page).map((item) => (
        <div key={item.id}>
          <div style={{ backgroundImage: page.includes(item.value) ? item.image : '', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <div className="breadcrumb-names">
              <Container>
                <h2 className="text-center mb-4 text-white apts-service-tittle">Infrastructure Support</h2>
                <Row>
                  {renderInfrastructureProjectTabs(router.asPath)}
                </Row>
              </Container>
            </div>
          </div>
          <section className="infra-sec-style">
            <Container>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href="/">
                    <a className="infra-anchor-breadcrumb">
                      Home
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link href={router.asPath}>
                    <a className="infra-anchor-breadcrumb">
                      Infrastructure Support
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-black">{page.includes(item.value) ? item.name : ''}</Breadcrumb.Item>
              </Breadcrumb>
            </Container>
          </section>
        </div>
      ))}
      {renderContent(page)}
    </div>
  );
}
