import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Card, Container, Tabs, Tab } from "react-bootstrap";

import StudentFilter from "../studentFilter/StudentFilter.js";
import StudentSearch from "../studentSearch/StudentSearch.js";
import StudentTable from "../studentTable/StudentTable.js";

function AdminPanel() {
  const { t } = useTranslation(["misc"]);

  const [refresh, setRefresh] = useState(true);
  const [students, setStudents] = useState(null);
  const [showSearchLabel, setShowSearchLabel] = useState(false);
  const [showFilterLabel, setShowFilterLabel] = useState(false);

  const onTabSelect = (e) => {
    if (e === "filter") {
      setShowSearchLabel(false);
      setRefresh(true);
    } else if (e === "search") {
      setShowFilterLabel(false);
      setRefresh(true);
    }
  };

  return (
    <Container fluid className="mt-3">
      <div className="d-flex justify-content-center">
        <Card className="filter-card shadow">
          <Card.Body>
            <Tabs
              fill
              transition
              defaultActiveKey="filter"
              onSelect={onTabSelect}
            >
              <Tab
                eventKey="filter"
                tabClassName="profile-feed-tab"
                title={t("misc:filter")}
              >
                <StudentFilter
                  setStudents={setStudents}
                  setRefresh={setRefresh}
                  showFilterLabel={showFilterLabel}
                  setShowFilterLabel={setShowFilterLabel}
                />
              </Tab>
              <Tab
                eventKey="search"
                tabClassName="profile-feed-tab"
                title={t("misc:search")}
              >
                <StudentSearch
                  setStudents={setStudents}
                  setRefresh={setRefresh}
                  showSearchLabel={showSearchLabel}
                  setShowSearchLabel={setShowSearchLabel}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
      <StudentTable
        students={students}
        setStudents={setStudents}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Container>
  );
}

export default AdminPanel;
