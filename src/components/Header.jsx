import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.currentUser);
  const { user } = userLogin;

  return (
    <header>
      <Navbar variant='light' bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Hacker News</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Item>
                <Nav.Link href='/new'>New</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/past'>Past</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/comments/recent'>Comments</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/story/create'>Submit</Nav.Link>
              </Nav.Item>
              {user ? (
                <NavDropdown title={user.id} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link href='/user/profile'>Profile</Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link onClick={() => dispatch(logout())}>
                      Logout
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Nav.Link href='/user/login'>Login</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
