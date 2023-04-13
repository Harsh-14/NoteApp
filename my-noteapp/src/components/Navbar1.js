import React from "react";
import { Navbar, Nav,  Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/authReducers";

export default function Navbar1() {
  const dispatch = useDispatch();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <Navbar.Brand to="/">Note Karo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link className="nav-link" to="/">
              AddNote{" "}
            </Link>
            <Link className="nav-link" to="/FindNote">
              Search
            </Link>
          </Nav>
          <Nav>
          
          <Button
             
            variant="danger"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
