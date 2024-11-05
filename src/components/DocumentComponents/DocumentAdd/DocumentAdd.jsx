import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {useNavigate} from "react-router-dom";

function DocumentAdd() {
  const navigate = useNavigate();
  const [institut, setInstitute] = useState("");
  const [university, setUniversity] = useState("");
  const [niveau, setNiveau] = useState(""); // New state for niveau
  const [materials, setMaterials] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [universityOptions, setUniversityOptions] = useState([]);
  const [institutOptions, setInstitutOptions] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:8082/admin/university");
        setUniversityOptions(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    const fetchInstituts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/admin/institut");
        setInstitutOptions(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchUniversities();
    fetchInstituts();
  }, []);

  const addDocument = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/admin/document/insert", {
        university,
        institut,
        niveau,
        Matieres: materials,
        description,
        link,
      });
      console.log(response.data);
      navigate("/documents/");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
      <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Add Document
        </Typography>
        <Box component="form" onSubmit={addDocument} noValidate sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>University</InputLabel>
            <Select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                label="University"
            >
              {universityOptions.map((uni) => (
                  <MenuItem key={uni._id} value={uni.name}>
                    {uni.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Institute</InputLabel>
            <Select
                value={institut}
                onChange={(e) => setInstitute(e.target.value)}
                label="Institute"
            >
              {institutOptions.map((inst) => (
                  <MenuItem key={inst._id} value={inst.name}>
                    {inst.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                label="Level"
            >
              <MenuItem value="1er Année">1er Année</MenuItem>
              <MenuItem value="2eme Année">2eme Année</MenuItem>
              <MenuItem value="3eme Année">3eme Année</MenuItem>
            </Select>
          </FormControl>

          <TextField
              fullWidth
              label="Materials (comma separated)"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              margin="normal"
              variant="outlined"
          />
          <TextField
              fullWidth
              label="Description (comma separated)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              variant="outlined"
          />
          <TextField
              fullWidth
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

export default DocumentAdd;
