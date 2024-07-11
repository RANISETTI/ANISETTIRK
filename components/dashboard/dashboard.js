import {
  faBriefcase, faDatabase, faFileLines, faIdCardClip, faSackDollar, faShoppingCart, faTable, faUsers, faUserTie, faVideo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const dashboardLinks = [
  {
    id: 1,
    icon: faFileLines,
    name: 'Tenders',
    link: '/dashboard/tenders/list',
    permissions: ['Admin', 'Tenders', 'Procurement', 'DSC Admin'],
  },
  {
    id: 2,
    icon: faBriefcase,
    name: 'Careers',
    link: '/dashboard/careers/jobs',
    permissions: ['Admin', 'Careers'],
  },
  {
    id: 3,
    icon: faSackDollar,
    name: 'Assets',
    link: '/dashboard/assets/applications',
    permissions: ['Admin', 'applications'],
  },
  {
    id: 4,
    icon: faIdCardClip,
    name: 'Digital Certificate',
    link: '/dashboard/digital-certificate/dse',
    permissions: ['Admin', 'DSC User', 'DSC Admin'],
  },
  {
    id: 5,
    icon: faUserTie,
    name: 'Vendor Empanelment',
    link: '/dashboard/vendor-empanelment/vendorlist',
    permissions: ['Admin', 'Vendor'],
  },
  {
    id: 6,
    icon: faShoppingCart,
    name: 'Procurement',
    link: '/dashboard/procurement/new',
    permissions: ['Admin', 'Procurement', 'Finance'],
  },
  {
    id: 7,
    icon: faTable,
    name: 'CMS',
    link: '/dashboard/cms/carousels',
    permissions: ['Admin'],
  },
  {
    id: 8,
    icon: faUsers,
    name: 'User Management',
    link: '/dashboard/user-management/users',
    permissions: ['Admin'],
  },
  {
    id: 9,
    icon: faDatabase,
    name: 'Masters',
    link: '/dashboard/masters/categories',
    permissions: ['Admin', 'Procurement', 'Product Manager'],
  },
  {
    id: 10,
    icon: faVideo,
    name: 'Conference',
    link: '/dashboard/conference/add-conference-booking',
    permissions: ['Admin', 'Conferences'],
  },

];

const departmentDashboardLinks = [
  {
    id: 1,
    icon: faShoppingCart,
    name: 'Procurement',
    link: '/dashboard/procurement/new',
    permissions: ['Admin', 'Procurement'],
  },
];

const vendorDashboardLinks = [
  {
    id: 1,
    icon: faShoppingCart,
    name: 'Procurement',
    link: '/dashboard/procurement/orders',
  },
  {
    id: 2,
    icon: faUserTie,
    name: 'Vendor Empanelment',
    link: '/dashboard/vendor-empanelment/vendorlist',
  },
];

export default function Dashboard() {
  const { userDetails: { type, roles } } = useSelector((state) => state.user);
  let dashboard = [];
  if (type === 'APTS') {
    dashboard = dashboardLinks;
  } else if (type === 'DEPARTMENT') {
    dashboard = departmentDashboardLinks;
  }
  if (type === 'VENDOR') {
    return (
      <div className="admin-section">
        <Row>
          {vendorDashboardLinks.map((item) => (
            <Col xs={6} md={3} lg={4}>
              <Link href={item.link}>
                <a>
                  <Card>
                    <Card.Body className="d-flex justify-content-center">
                      <blockquote className="m-3">
                        <p>
                          {' '}
                          <FontAwesomeIcon icon={item.icon} className="font-icon-1" />
                        </p>
                        <p>
                          {item.name}
                        </p>
                      </blockquote>
                    </Card.Body>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <Row>
        {dashboard.map((item) => {
          const { link, icon, name } = item;
          if (roles && item.permissions.some((role) => roles.includes(role))) {
            return (
              <Col xs={6} md={3} lg={4}>
                <Link href={link}>
                  <a>
                    <Card>
                      <Card.Body className="d-flex justify-content-center">
                        <blockquote className="m-3">
                          <p className="text-center">
                            {' '}
                            <FontAwesomeIcon icon={icon} className="font-icon-1" />
                          </p>
                          <p>
                            {name}
                          </p>
                        </blockquote>
                      </Card.Body>
                    </Card>
                  </a>
                </Link>
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </div>
  );
}
