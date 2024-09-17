import { useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, movies, onLoggedOut }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar className="navbar navbar-light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-item">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} to="/">
                  Logout
                </Nav.Link>

                <Form className="d-flex">
                  <Form.Control
                    id="search-bar"
                    className="me-3"
                    type="search"
                    value={searchQuery}
                    placeholder="Search movie title ..."
                    aria-label="search bar"
                    onChange={(e) => handleSearchQuery}
                  />
                  <Button className="btn-dark" style={{ cursor: "pointer" }} onClick={handleSearchQuery}>Search</Button>
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};