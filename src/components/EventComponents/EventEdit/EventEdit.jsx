import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";

function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [num, setNum] = useState("");
  const [meet, setMeet] = useState("");
  const [description, setDescription] = useState("");
  const [linkdocs, setLinkdocs] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/events/${id}`, {
        headers: {
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const eventData = response.data;
        setTitle(eventData.title);
        setStart(formatDate(eventData.start));
        setEnd(formatDate(eventData.end));
        setNum(eventData.num);
        setMeet(eventData.meet);
        setDescription(eventData.description);
        setLinkdocs(eventData.linkdocs);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const editEvent = (e) => {
    e.preventDefault();
    if (end < start) {
      setError("End date must be after the start date.");
      return;
    }
    setError("");
    const eventData = {
      title,
      start,
      end,
      num,
      meet,
      description,
      linkdocs,
    };

    axios
      .put(`http://localhost:80/api/events/${id}`, eventData, {
        headers: {
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      })
      .then(() => navigate("/events"))
      .catch((error) => console.log(error));
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Event
      </Typography>
      <Box component="form" onSubmit={editEvent} noValidate sx={{ mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Start Time"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Time"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Num"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Meeting Link"
          value={meet}
          onChange={(e) => setMeet(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Document Link"
          value={linkdocs}
          onChange={(e) => setLinkdocs(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Edit Event
        </Button>
      </Box>
    </Container>
  );
}

export default EventEdit;
