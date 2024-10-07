import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, MenuItem,Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

function EventAdd() { 
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [num, setNum] = useState("");
    const [meet, setMeet] = useState("");
    const [description, setDescription] = useState("");
    const [linkdocs, setLinkdocs] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
  
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
        num,
        meet,
        description,
        linkdocs
      };
  
      try {
        const response = await axios.post("http://localhost:8082/api/events", eventData);
        console.log(response.data);
        navigate("/events/");
      } catch (error) {
        console.error("Error adding event:", error);
      }
    };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
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
          label="Num"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          margin="normal"
          variant="outlined"
        >
          {[{ value: 1, label: "Math" }, { value: 2, label: "DB" }, { value: 3, label: "Science" }, { value: 4, label: "History" }, { value: 5, label: "Art" }, { value: 6, label: "Music" }].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
  )
}

export default EventAdd;