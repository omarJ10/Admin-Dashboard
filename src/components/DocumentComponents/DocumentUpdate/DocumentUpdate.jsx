import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function DocumentUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [institut, setInstitut] = useState("");
  const [Matieres, setMatieres] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8082/admin/document/${id}`)
      .then(response => {
        setInstitut(response.data.institut);
        setMatieres(response.data.Matieres.join(','));
        setDescription(response.data.description);
      })
      .catch(error => console.log(error));
  }, [id]);

  const editDocument = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('institut', institut);
    formData.append('Matieres', Matieres);
    formData.append('description', description);
    if (img) {
      formData.append('img', img);
    }

    axios.put(`http://localhost:8082/admin/document/${id}`, formData)
      .then(() => navigate('/documents'))
      .catch(error => console.log(error));
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Document
      </Typography>
      <Box component="form" onSubmit={editDocument} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Institut"
          value={institut}
          onChange={(e) => setInstitut(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Matieres (comma separated)"
          value={Matieres}
          onChange={(e) => setMatieres(e.target.value)}
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
         <Button variant="contained" fullWidth color="secondary" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImg(e.target.files[0])}
            />
          </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Edit Document
        </Button>
      </Box>
    </Container>
  );
}

export default DocumentUpdate;
