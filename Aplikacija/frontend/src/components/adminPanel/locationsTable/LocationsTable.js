import axios from "axios";
import { useTransition } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

import "./LocationsTable.style.css";
import { useTranslation } from "react-i18next";

function LocationsTable({ locations, setLocations, refresh, setRefresh }) {
    const { t } = useTranslation(["register", "misc"]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!refresh) return;
        axios
        .get("Location/GetAllLocations/0")
        .then((res) => {
            setLocations(res.data);
            setRefresh(false);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }, [refresh, setRefresh, setLocations]);

    const getType = (type) =>{
        switch (type) {
            case 0: return t("cafe");
            case 1: return t("club");
            case 2: return t("brewery");
            case 3: return t("bar");
            case 4: return t(); 
            case 5: return t();
            case 6: return t();
            case 7: return t();
            case 8: return t();
            case 9: return t();
            case 10: return t();
            case 11: return t();
            case 12: return t();
            case 13: return t();
            case 14: return t();
            case 15: return t();
        }
    }
}