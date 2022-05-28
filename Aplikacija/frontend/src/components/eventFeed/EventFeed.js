import "bootstrap/dist/css/bootstrap.min.css";
import "./Feed.style.css";
import axios from "axios";
import EventPost from "../eventPost/EventPost";
import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Card, Spinner } from "react-bootstrap";

function EventFeed()
{
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(false);
    
}

export default EventFeed