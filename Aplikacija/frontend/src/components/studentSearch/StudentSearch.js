import { useTranslation } from "react-i18next";
import { Card, Container, Form, FormControl, Button } from "react-bootstrap";

import "./StudentSearch.style.css";

function StudentSearch() {
  const { t } = useTranslation(["misc"]);
  return (
    <Container>
      <Card className="search-card shadow">
        <Card.Body>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder={t("search")}
              aria-label="Search"
            />
            <Button type="submit" className="ms-3">
              {t("search")}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentSearch;
