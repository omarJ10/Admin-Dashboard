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

function MatiereEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Matiere ID:", id);
    axios
      .get(`http://18.211.148.152/api/matieres/${id}`, {
        headers: {
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const matiereData = response.data;
        setName(matiereData.name);
        setImg(matiereData.img);
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
      img,
    };

    axios
      .put(`http://18.211.148.152/api/matieres/${id}`, matiereData, {
        headers: {
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      })
      .then(() => navigate("/matiere"))
      .catch((error) => {
        setError("Error updating matiere");
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Matiere
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
        <TextField
          fullWidth
          label="Image"
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
          Edit Matiere
        </Button>
      </Box>
    </Container>
  );
}

export default MatiereEdit;
