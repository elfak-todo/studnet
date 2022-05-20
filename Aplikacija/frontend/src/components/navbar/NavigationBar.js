import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function NavigationBar() {
  const { t } = useTranslation(["navbar"]);
  const location = useLocation();

  return (location.pathname!=="/" && location.pathname!=="/register") ? (
    <Navbar sticky collapseOnSelect expand="md" bg="light" variant="light">
      <Container fluid className="p-1">
        <Navbar.Brand as={Link} to="/home">
          StudNet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events">
              {t("events")}
            </Nav.Link>
            <Nav.Link as={Link} to="/locations">
              {t("locations")}
            </Nav.Link>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder={t("searchPlaceholder")}
                className="me-2"
                aria-label="Search"
              />
              <Button variant="primary">{t("search")}</Button>
            </Form>
          </Nav>
          <Nav>
            <ProfileDropdown />
            <SelectLanguage />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null;
}

export default NavigationBar;
