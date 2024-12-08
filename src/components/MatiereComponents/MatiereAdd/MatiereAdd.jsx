import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MatiereAdd() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const addMatiere = async (e) => {
    e.preventDefault();

    const matiereData = {
      name,
      img,
    };

    try {
      const response = await axios.post(
        "http://18.211.148.152/api/matieres/add",
        matiereData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          },
        }
      );
      console.log(response.data);
      navigate("/matiere/");
    } catch (error) {
      console.error("Error adding matiere:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h4" component="h2" gutterBottom>
        Add Matiere
      </Typography>
      <Box component="form" onSubmit={addMatiere} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Image Url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
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
          Add Matiere
        </Button>
      </Box>
    </Container>
  );
}

export default MatiereAdd;
