import React, { useState } from 'react';
import {
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  Collapse,
  Container,
  Row,
  Col,
} from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const GuestLinks = () => {
  const [menuOpen, toggleMenuOpen] = useState({
    open: false,
  });

  const toggleMenu = () => {
    toggleMenuOpen({ open: !menuOpen.open });
  };

  return (
    <div>
      <Collapse
        className='header-navbar d-lg-flex p-0 bg-white border-top'
        open={menuOpen.open}
        navbar>
        <Container className='bg-white'>
          <Row>
            <Col>
              <Nav
                navbar
                className='border-0 flex-column flex-lg-row header-navbar'>
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to='/demo-login'
                    className='text-nowrap py-4'>
                    Demo User
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to='/register'
                    className='text-nowrap py-4'>
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to='/login'
                    className='text-nowrap py-4'>
                    Login
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Collapse>
      <NavbarToggler
        onClick={toggleMenu}
        className='border-0 outline-override d-md-inline d-lg-none'
      />
    </div>
  );
};

export default GuestLinks;
