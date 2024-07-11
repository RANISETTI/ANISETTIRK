import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../slices/SidebarSlice';
import NavbarUser from './NavbarUser';

export default function NavbarComponent() {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <Navbar variant="light" expand className="navbar-bg position-sticky" fixed="top">
      <span
        className="sidebar-toggle d-flex mx-1"
        onClick={() => {
          dispatch(toggleSidebar({ isSidebarOpen: !isSidebarOpen }));
        }}
      >
        <i className="hamburger align-self-center" />
      </span>
      <Navbar.Collapse>
        <Nav className="navbar-align">
          <NavbarUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
