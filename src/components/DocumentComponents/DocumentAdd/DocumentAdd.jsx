import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function DocumentAdd() {
  // Define state variables for each field in the form
  const [institut, setInstitute] = useState("");
  const [Matieres, setMaterials] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState(null);

  // Function to handle form submission
  const addDocument = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object to hold the form data
    const formData = new FormData();
    formData.append("institut", institut); // Append the 'institut' field
    formData.append("Matieres", Matieres); // Append the 'Matieres' field
    formData.append("description", description); // Append the 'description' field
    formData.append("link", link); // Append the 'link' field
    formData.append("img", img); // Append the 'img' field

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    try {
      
      // Send a POST request to the backend with the form data
      const response = await axios.post("http://localhost:8082/admin/document/insert", formData);
      console.log(response);
      console.log(response.data); // Log the response data to the console
    } catch (error) {
      console.error("Error adding document:", error); // Log any errors that occur
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Document
      </Typography>
      <Box component="form" onSubmit={addDocument} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Institute"
          value={institut}
          onChange={(e) => setInstitute(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Materials (comma separated)"
          value={Matieres}
          onChange={(e) => setMaterials(e.target.value)}
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
          label="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
          Add
        </Button>
      </Box>
    </Container>
  );
}

export default DocumentAdd;
