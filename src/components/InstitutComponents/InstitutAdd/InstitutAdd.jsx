import React, { useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const universities = [
  "ISET",
  "University of Tunis", 
  "University of Manouba",
  "University of Carthage",
  "University of Nabeul",
  "University of Sfax",
  "University of Sousse",
  "University of Monastir",
  "University of Zaghouan",
  "University of Gabes",
  "University of Gafsa",
  "University of Jendouba",
  "University of Kairouan",
  "University of Kasserine",
  "University of Kebili",
  "University of Kef",
  "University of Mahdia",
  "University of Medenine",
  "University of Sidi Bouzid",
  "University of Siliana",
  "University of Tataouine",
  "University of Tozeur",
];
function InstitutAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [location, setLocation] = useState("");

  const addInstitut = async (e) => {
    e.preventDefault();
  
    const data = {
      name,
      university,
      location
    };
  
    try {
      const response = await axios.post("http://localhost:8082/admin/institut/insert", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error adding institut:", error);
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Institut
      </Typography>
      <Box component="form" onSubmit={addInstitut} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>University</InputLabel>
          <Select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          >
            {universities.map((uni) => (
              <MenuItem key={uni} value={uni}>
                {uni}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          Add
        </Button>
      </Box>
    </Container>
  );
}

export default InstitutAdd;
