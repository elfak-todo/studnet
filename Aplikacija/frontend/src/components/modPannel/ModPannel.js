import "./ModPannel.style.css";
import ModStudentSearch from "./modStudentSearch/ModStudentSearch";
import ModStudentTable from "./modStudentTable/ModStudentTable";

import { useTranslation } from "react-i18next";
import { Card, Container, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";

function ModPannel() {
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
                </Tab>
                <Tab
                eventKey="search"
                tabClassName="profile-feed-tab"
                title={t("misc:search")}
                >
                <ModStudentSearch
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
        <ModStudentTable
        students={students}
        setStudents={setStudents}
        refresh={refresh}
        setRefresh={setRefresh}
        />
    </Container>
    );
}
   
export default ModPannel;