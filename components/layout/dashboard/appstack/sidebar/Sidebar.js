import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Briefcase, Database, DollarSign, Layout, Shield, ShoppingCart, User, Users, Video
} from 'react-feather';
import { useSelector } from 'react-redux';
import SidebarMenuGroup from './SidebarMenuGroup';

const adminMenuItems = [
  {
    header: '',
    title: 'Tenders',
    titleIcon: DollarSign,
    titlePath: '/dashboard/tenders',
    children: [
      {
        title: 'Tenders', path: '/dashboard/tenders/list', value: 'list', childPermissions: ['Admin', 'Tenders', 'Procurement', 'DSC Admin'],
      },
      {
        title: 'Auditor Applications', path: '/dashboard/tenders/auditor-applications', value: 'applications', childPermissions: ['Admin', 'Tenders'],
      },
    ],
    value: 'tenders',
    permissions: ['Admin', 'Tenders', 'Procurement', 'DSC Admin'],
  },
  {
    header: '',
    title: 'Careers',
    titleIcon: Briefcase,
    titlePath: '/dashboard/careers',
    children: [
      {
        title: 'Jobs', path: '/dashboard/careers/jobs', value: 'jobs', childPermissions: ['Admin', 'Careers'],
      },
      {
        title: 'Applicants', path: '/dashboard/careers/applicants', value: 'applicants', childPermissions: ['Admin', 'Careers'],
      },
    ],
    value: 'careers',
    permissions: ['Admin', 'Careers'],
  },
  {
    header: '',
    title: 'Assets',
    titleIcon: Shield,
    titlePath: '/dashboard/assets',
    children: [
      {
        title: 'Applications',
        path: '/dashboard/assets/applications',
        value: 'applications',
        childPermissions: ['Admin', 'Assets'],
        // childPermissions: [],
      },
      {
        title: 'Software',
        path: '/dashboard/assets/software',
        value: 'software',
        childPermissions: ['Admin', 'Assets'],
        // childPermissions: [],
      },
      {
        title: 'Hardware',
        path: '/dashboard/assets/hardware',
        value: 'hardware',
        childPermissions: ['Admin', 'Assets'],
        // childPermissions: [],
      },
      {
        title: 'NW and Security Devices',
        path: '/dashboard/assets/networking-devices',
        value: 'networking-devices',
        childPermissions: ['Admin', 'Assets'],
        // childPermissions: [],
      },
      {
        title: 'Security-Audit',
        path: '/dashboard/assets/security-audit',
        value: 'security-audit',
        childPermissions: ['Admin', 'Assets', 'Audits'],
        // childPermissions: [],
      },
      // {
      //   title: 'Security-Audit-Hisroty',
      //   path: '/dashboard/assets/audit-history',
      //   value: 'audit-history',
      //   childPermissions: ['Admin', 'Assets'],
      //   // childPermissions: [],
      // },
      // {
      //   title: 'DSE',
      //   path: '/dashboard/assets/dse',
      //   value: 'dse',
      //   childPermissions: ['Admin', 'Assets'],
      //   // childPermissions: [],
      // },
    ],
    value: 'assets',
    permissions: ['Admin', 'Assets', 'Audits'],
    // permissions: [],
  },

  {
    header: '',
    title: 'Digital Certificate',
    titlePath: '/dashboard/digital-certificate',
    titleIcon: Users,
    children: [{
      title: 'DSC',
      path: '/dashboard/digital-certificate/dse',
      value: 'dse',
      childPermissions: ['Admin', 'DSC User', 'DSC Admin'],
      // childPermissions: [],
    }],
    value: 'digital-certificate',
    permissions: ['Admin', 'DSC User', 'DSC Admin'],
  },
  {
    header: '',
    title: 'Vendor Empanelment',
    titleIcon: Users,
    titlePath: '/dashboard/vendor-empanelment',
    children: [
      {
        title: 'Vendor List',
        path: '/dashboard/vendor-empanelment/vendorlist',
        value: 'vendor-list',
        childPermissions: ['Admin', 'Vendor'],
        // childPermissions: [],
      },
      {
        title: 'Empanelment Category',
        path: '/dashboard/vendor-empanelment/empanelment-category-list',
        value: 'empanelment-category',
        childPermissions: ['Admin', 'Vendor'],
        // childPermissions: [],
      },
      {
        title: 'Empanelment Category Refunds',
        path: '/dashboard/vendor-empanelment/empanelment-category-refunds',
        value: 'empanelment-refunds',
        childPermissions: ['Admin', 'Vendor'],
        // childPermissions: [],
      },
      {
        title: 'Empanelment List Document',
        path: '/dashboard/vendor-empanelment/empanelmentlist',
        value: 'empanelmentlist',
        childPermissions: ['Admin', 'Vendor', 'Procurement', 'Product Manager'],
      },
    ],
    value: 'vendor-empanelment',
    permissions: ['Admin', 'Vendor', 'Procurement', 'Product Manager'],
    // permissions: [],
  },
  {
    header: '',
    title: 'Procurement',
    titleIcon: ShoppingCart,
    titlePath: '/dashboard/procurement',
    children: [
      {
        title: 'New ',
        path: '/dashboard/procurement/new',
        value: 'new',
        childPermissions: ['Admin', 'Procurement'],
        // childPermissions: [],
      },
      {
        title: 'My Cart ',
        path: '/dashboard/procurement/cart?step=cart',
        value: 'cart',
        childPermissions: ['Admin', 'Procurement'],
        // childPermissions: [],
      },
      {
        title: 'My Orders',
        path: '/dashboard/procurement/orders',
        value: 'orders',
        childPermissions: ['Admin', 'Procurement', 'Finance'],
        // childPermissions: ['Procurement', 'Finance'],
      },
      {
        title: 'Manage Addresses',
        path: '/dashboard/procurement/manage-address',
        value: 'manage-address',
        childPermissions: ['Admin', 'Procurement'],
        // childPermissions: [],
      },
    ],
    value: 'procurement',
    permissions: ['Admin', 'Procurement', 'Finance'],
    // permissions: ['Procurement', 'Finance'],
  },
  {
    header: '',
    title: 'CMS',
    titleIcon: Layout,
    value: 'cms',
    titlePath: '/dashboard/cms',
    permissions: ['Admin'],
    children: [
      {
        title: 'Carousels',
        path: '/dashboard/cms/carousels',
        value: 'carousels',
        childPermissions: ['Admin'],
      },
      {
        title: 'Procurement Document',
        path: '/dashboard/cms/procurement-document',
        childPermissions: ['Admin'],
        value: 'procurement-document',
      },
      {
        title: 'Teams',
        path: '/dashboard/cms/teams',
        childPermissions: ['Admin'],
        value: 'teams',
      },
      {
        title: 'News',
        path: '/dashboard/cms/news',
        value: 'news',
        childPermissions: ['Admin'],
      },
      {
        title: 'Helpdesk',
        path: '/dashboard/cms/helpdesk',
        value: 'helpdesk',
        childPermissions: ['Admin'],
      },
    ],
  },
  {
    header: '',
    title: 'User Management',
    titleIcon: User,
    value: 'user-management',
    permissions: ['Admin'],
    titlePath: '/dashboard/user-management',
    children: [
      {
        title: 'Users',
        path: '/dashboard/user-management/users',
        value: 'user',
        childPermissions: ['Admin'],
      },
      // {
      //   title: 'Roles',
      //   path: '/dashboard/user-management/roles',
      //   value: 'role',
      //   childPermissions: ['Admin'],
      // },
    ],
  },
  {
    header: '',
    title: 'Masters',
    titleIcon: Database,
    value: 'masters',
    titlePath: '/dashboard/masters',
    permissions: ['Admin', 'Procurement', 'Product Manager'],
    // permissions: [],
    children: [
      // {
      //   title: 'Roles',
      //   path: '/dashboard/masters/roles',
      //   value: 'roles',
      //   childPermissions: ['Admin'],
      //   // childPermissions: [],
      // },
      // {
      //   title: 'Users',
      //   path: '/dashboard/masters/users',
      //   value: 'user',
      //   childPermissions: ['Admin'],
      //   // childPermissions: [],
      // },
      {
        title: 'Categories',
        path: '/dashboard/masters/categories',
        value: 'categories',
        childPermissions: ['Admin', 'Procurement', 'Product Manager'],
        // childPermissions: [],
      },
      {
        title: 'Category Documents',
        path: '/dashboard/masters/category-documents',
        value: 'category-documents',
        childPermissions: ['Admin', 'Procurement', 'Product Manager'],
        // childPermissions: [],
      },
      {
        title: 'Products',
        path: '/dashboard/masters/products',
        childPermissions: ['Admin', 'Procurement', 'Product Manager'],
        // childPermissions: [],
        value: 'products',
      },
      // {
      //   title: 'Vendors',
      //   path: '/dashboard/masters/vendors',
      //   childPermissions: ['Admin', 'Procurement', 'Product Manager'],
      //   // childPermissions: [],
      //   value: 'vendors',
      // },
      {
        title: 'Departments',
        path: '/dashboard/masters/department',
        childPermissions: ['Admin', 'Procurement'],
        // childPermissions: [],
        value: 'department',
      },
    ],
  },
  {
    header: '',
    title: 'Video Conference',
    titleIcon: Video,
    value: 'conference',
    titlePath: '/dashboard/conference',
    permissions: ['Admin', 'Conferences'],
    // permissions: [],
    children: [
      {
        title: 'Book a Slot',
        path: '/dashboard/conference/add-conference-booking',
        value: 'add-conference',
        childPermissions: ['Admin', 'Conferences'],
        // childPermissions: [],
      },
      {
        title: 'Active Bookings',
        path: '/dashboard/conference/bookings?page=1',
        value: 'bookings',
        childPermissions: ['Admin', 'Conferences'],
        // childPermissions: [],
      },
      {
        title: 'All Bookings',
        path: '/dashboard/conference/all-records?page=1',
        value: 'all',
        childPermissions: ['Admin', 'Conferences'],
        // childPermissions: [],
      },
      {
        title: 'VC-Departments',
        path: '/dashboard/conference/vc-departments',
        childPermissions: ['Admin', 'Conferences'],
        // childPermissions: [],
        value: 'vc-departments',
      },
      {
        title: 'VC-Locations',
        path: '/dashboard/conference/vc-locations',
        childPermissions: ['Admin', 'Conferences'],
        // childPermissions: [],
        value: 'vc-locations',
      },
    ],
  },
];

const departmentMenuItems = [
  {
    header: '',
    title: 'Procurement',
    titleIcon: ShoppingCart,
    titlePath: '/dashboard/procurement',
    children: [
      {
        title: 'New ',
        path: '/dashboard/procurement/new',
        value: 'new',
        childPermissions: ['Admin'],
        // childPermissions: [],
      },
      {
        title: 'My Cart ',
        path: '/dashboard/procurement/cart/?step=cart',
        value: 'cart',
        childPermissions: ['Admin'],
        // childPermissions: [],
      },
      {
        title: 'My Orders',
        path: '/dashboard/procurement/orders',
        value: 'orders',
        childPermissions: ['Admin'],
        // childPermissions: [],
      },
      {
        title: 'Manage Addresses',
        path: '/dashboard/procurement/manage-address',
        value: 'manage-address',
        childPermissions: ['Admin'],
        // childPermissions: [],
      },
    ],
    value: 'procurement',
    permissions: ['Admin'],
    // permissions: [],
  },
  {
    header: '',
    title: 'Assets',
    titleIcon: Shield,
    titlePath: '/dashboard/assets',
    children: [
      {
        title: 'Software', path: '/dashboard/assets/software', value: 'software', childPermissions: ['Admin'],
      },
      {
        title: 'Applications', path: '/dashboard/assets/applications', value: 'applications', childPermissions: ['Admin'],
      },
      {
        title: 'Hardware', path: '/dashboard/assets/hardware', value: 'hardware', childPermissions: ['Admin'],
      },
      {
        title: 'NW and Security Devices', path: '/dashboard/assets/networking-devices', value: 'networking-devices', childPermissions: ['Admin'],
      },
      {
        title: 'Security-Audit',
        path: '/dashboard/assets/security-audit',
        value: 'security-audit',
        childPermissions: ['Admin', 'Assets'],
        // childPermissions: [],
      },
    ],
    value: 'assets',
    permissions: ['Admin'],
  },
];

const vendorMenuItems = [
  {
    header: '',
    title: 'Procurement',
    titleIcon: ShoppingCart,
    titlePath: '/dashboard/procurement',
    children: [
      {
        title: 'Orders',
        path: '/dashboard/procurement/orders',
        value: 'orders',
      },
      {
        title: 'Products',
        path: '/dashboard/procurement/products',
        value: 'products',
      },
    ],
    value: 'procurement',
  },
  {
    header: '',
    title: 'Vendor Empanelment',
    titleIcon: Users,
    titlePath: '/dashboard/vendor-empanelment',
    children: [
      // {
      //   title: 'Vendor List',
      //   path: '/dashboard/vendor-empanelment/vendorlist',
      //   value: 'vendor-list',
      //   // childPermissions: ['Vendor'],
      //   childPermissions: [],
      // },
      {
        title: 'Empanelment Category',
        path: '/dashboard/vendor-empanelment/empanelment-category',
        value: 'empanelment-category',
        // childPermissions: ['Vendor'],
        childPermissions: [],
      },
      // {
      //   title: 'Empanelment List',
      //   path: '/dashboard/vendor-empanelment/empanelmentlist',
      //   value: 'empanelled',
      //   // childPermissions: ['Vendor'],
      //   childPermissions: [],
      // },
    ],
    value: 'vendor-empanelment',
    // permissions: ['Vendor'],
    // permissions: [],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const { userDetails: { type, roles } } = useSelector((state) => state.user);
  const [active, setActive] = useState(router.asPath.split('/'));

  const renderMenuItems = () => {
    if (type === 'DEPARTMENT') {
      const renderDepartmentMenuItems = departmentMenuItems.map(
        (menuItem) => <SidebarMenuGroup active={active} setActive={setActive} {...menuItem} />,
      );
      return renderDepartmentMenuItems;
    }
    if (type === 'VENDOR') {
      const renderVendorMenuItems = vendorMenuItems.map(
        (menuItem) => <SidebarMenuGroup active={active} setActive={setActive} {...menuItem} />,
      );
      return renderVendorMenuItems;
    }
    if (roles && roles.length) {
      const renderAdminMenuItems = adminMenuItems.map(
        (menuItem) => <SidebarMenuGroup active={active} setActive={setActive} {...menuItem} />,
      );
      return renderAdminMenuItems;
    }
    return null;
  };

  return (
    <nav className={`sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-content sidebar-cust sidebar-cust-scrollbar ">
        <Link href="/dashboard" passHref>
          <a className="sidebar-brand text-decoration-none">
            <img src="/images/logo-admin.png" alt="APTS Logo" />
            {/* <span className="align-middle me-3 px-2">APTS</span> */}
          </a>
        </Link>
        <ul className="sidebar-nav h-auto">
          {renderMenuItems()}
        </ul>
      </div>
    </nav>
  );
}
