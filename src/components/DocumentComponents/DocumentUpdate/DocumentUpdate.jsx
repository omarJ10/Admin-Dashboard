import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DocumentUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [university, setUniversity] = useState("");
    const [niveau, setNiveau] = useState("");
    const [institut, setInstitut] = useState("");
    const [Matieres, setMatieres] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const [universityOptions, setUniversityOptions] = useState([]);
    const [institutOptions, setInstitutOptions] = useState([]);

    useEffect(() => {
        // Fetch the document data
        axios.get(`http://localhost:8082/admin/document/${id}`)
            .then(response => {
                setUniversity(response.data.university);
                setInstitut(response.data.institut);
                setNiveau(response.data.niveau);
                setMatieres(response.data.Matieres.join(','));
                setDescription(response.data.description);
                setLink(response.data.link);
            })
            .catch(error => console.log(error));

        // Fetch universities and institutes for dropdowns
        axios.get("http://localhost:8082/admin/university")
            .then(response => setUniversityOptions(response.data))
            .catch(error => console.log("Error fetching universities:", error));

        axios.get("http://localhost:8082/admin/institut")
            .then(response => setInstitutOptions(response.data))
            .catch(error => console.log("Error fetching institutes:", error));
    }, [id]);

    const editDocument = (e) => {
        e.preventDefault();
        const data = {
            university,
            institut,
            niveau,
            Matieres,
            description,
            link
        };

        axios.put(`http://localhost:8082/admin/document/${id}`, data)
            .then(() => navigate('/documents'))
            .catch(error => console.log(error));
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Edit Document
            </Typography>
            <Box component="form" onSubmit={editDocument} noValidate sx={{ mt: 2 }}>
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
                        onChange={(e) => setInstitut(e.target.value)}
                        label="Institute"
                    >
                        {institutOptions.map((inst) => (
                            <MenuItem key={inst._id} value={inst.name}>
                                {inst.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Matieres (comma separated)"
                    value={Matieres}
                    onChange={(e) => setMatieres(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />

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
