import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import APSCAN from './APSCAN';
import PublicBroadcast from './PublicBroadcast';

const breadcrumbNames = [
  {
    id: 1,
    name: 'APSCAN',
    value: 'apscan',
    image: 'url(/images/aadhaar-card.jpg)',
  },
  {
    id: 2,
    name: 'APSWAN',
    value: 'apswan',
    image: 'url(/images/aadhaar-card.jpg)',
  },
  {
    id: 3,
    name: 'APSDC',
    value: 'apsdc',
    image: 'url(/images/aadhaar-card.jpg)',
  },
  {
    id: 4,
    name: 'VC Management',
    value: 'vc-management',
    image: 'url(/images/aadhaar-card.jpg)',
  },
  {
    id: 5,
    name: 'Public Broadcast & Feedback Telephony System',
    value: 'public-broadcast',
    image: 'url(/images/aadhaar-card.jpg)',
  },
];

const renderBreadcrumbNames = (value) => (
  breadcrumbNames.filter((breadcrumbName) => breadcrumbName.value === value).map((breadcrumb) => (
    <Container>
      <section className='pad-14-0-2-0'>
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">
                <a className="text-black text-decoration-none" >
                  HOME
                </a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/">
                <a className="text-black text-decoration-none">
                  Infrastructure Projects
                </a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {value.includes(breadcrumb.value) ? breadcrumb.name : ''}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
    </Container>
  ))
);

const renderContent = (value) => {
  switch (value) {
    case 'apscan':
      return (<APSCAN />);
      case 'public-broadcast':
        return (<PublicBroadcast />);
    default:
      break;
  }
}

export default function InfrastructureProjects() {
  const router = useRouter();
  const page = router.asPath.split('/')[2];
  return (
    <div className='min-h-70-vh'>
      {renderBreadcrumbNames(page)}
      <Container>
        {renderContent(page)}
      </Container>
    </div>
  );
}
