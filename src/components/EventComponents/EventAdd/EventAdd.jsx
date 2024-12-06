import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EventAdd() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [meet, setMeet] = useState("");
  const [description, setDescription] = useState("");
  const [linkdocs, setLinkdocs] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of matieres from the server
    axios
      .get("http://localhost:80/api/matieres", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
        },
      })
      .then((response) => {
        setMatieres(response.data); // Set the fetched matieres data
      })
      .catch((error) => {
        console.error("Error fetching matieres:", error);
        setError("Failed to load matieres. Please try again.");
      });
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    if (end < start) {
      setError("End date must be after the start date.");
      return;
    }

    const eventData = {
      title,
      start,
      end,
      num: selectedMatiere,
      meet,
      description,
      linkdocs,
    };

    try {
      const response = await axios.post(
        "http://localhost:80/api/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          },
        }
      );
      console.log(response.data);
      navigate("/events/");
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Error adding event. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h4" component="h2" gutterBottom>
        Add Event
      </Typography>
      <Box component="form" onSubmit={addEvent} noValidate sx={{ mt: 2 }}>
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
          select
          fullWidth
          label="Matiere"
          value={selectedMatiere}
          onChange={(e) => setSelectedMatiere(e.target.value)}
          margin="normal"
          variant="outlined"
        >
          {matieres.map((matiere) => (
            <MenuItem key={matiere._id} value={matiere._id}>
              {matiere.name}
            </MenuItem>
          ))}
        </TextField>
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
          Add Event
        </Button>
      </Box>
    </Container>
  );
}

export default EventAdd;
