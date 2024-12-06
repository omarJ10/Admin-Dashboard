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

function UniversityUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Matiere ID:", id);
    axios
      .get(`http://localhost:80/admin/university/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
        },
      })
      .then((response) => {
        const matiereData = response.data;
        setName(matiereData.name);
      })
      .catch((error) => {
        setError("Error fetching matiere data");
        console.log(error);
      });
  }, [id]);

  const editMatiere = (e) => {
    e.preventDefault();
    setError("");

    const matiereData = {
      name,
    };

    axios
      .put(`http://localhost:80/admin/university/${id}`, matiereData, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
        },
      })
      .then(() => navigate("/university/"))
      .catch((error) => {
        setError("Error updating univerity");
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit University
      </Typography>
      <Box component="form" onSubmit={editMatiere} noValidate sx={{ mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Edit University
        </Button>
      </Box>
    </Container>
  );
}

export default UniversityUpdate;
