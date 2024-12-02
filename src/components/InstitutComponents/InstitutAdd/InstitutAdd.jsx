import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function InstitutAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [universities, setUniversities] = useState([]); // State for universities list

  // Fetch universities from the database
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:80/admin/university",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': process.env.ADMIN_TOKEN
          },
        }); // Replace with your API endpoint
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const addInstitut = async (e) => {
    e.preventDefault();
    const data = { name, university };

    try {
      const response = await axios.post("http://localhost:80/admin/institut/insert", data, {
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': process.env.ADMIN_TOKEN
        }

      });

      console.log(response.data);
      navigate("/institut/");
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
                  <MenuItem key={uni._id} value={uni.name}>
                    {uni.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

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
