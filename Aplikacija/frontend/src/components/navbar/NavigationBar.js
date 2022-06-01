import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import logo from "../../images/logoSmall.png";

import ProfileDropdown from "../profile/profileDropdown/ProfileDropdown";
import SelectLanguage from "../selectLanguage/SelectLanguage";

function NavigationBar() {
  const { t } = useTranslation(["navbar"]);
  const location = useLocation();

  return location.pathname !== "/" && location.pathname !== "/register" ? (
    <Navbar sticky collapseOnSelect expand="md" bg="primary" variant="dark">
      <Container fluid className="p-1">
        <Navbar.Brand as={Link} to="/home">
          <img
            src={logo}
            className="d-inline-block align-top"
            alt="Logo"
            style={{ height: "1.6rem", width: "auto", marginLeft: "1rem" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events" className="text-light">
              {t("events")}
            </Nav.Link>
            <Nav.Link as={Link} to="/locations" className="text-light">
              {t("locations")}
            </Nav.Link>
          </Nav>
          <Nav className="me-5 pe-5">
            <ProfileDropdown />
            <SelectLanguage />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null;
}

export default NavigationBar;
