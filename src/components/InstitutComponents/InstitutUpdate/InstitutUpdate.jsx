import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function InstitutUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [universities, setUniversities] = useState([]); // List of universities
    const [error, setError] = useState("");

    // Fetch the list of universities from the database
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get("http://localhost:80/admin/university", 
                    { 
                        headers: { "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN },
                        
                    
                    }); // Adjust endpoint if needed
                setUniversities(response.data);
            } catch (error) {
                setError("Error fetching universities list");
                console.error(error);
            }
        };

        fetchUniversities();
    }, []);

    // Fetch specific institut details to prefill the form
    useEffect(() => {
        axios.get(`http://localhost:80/admin/institut/${id}`,
            { headers: { "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN } })
            .then(response => {
                const institutData = response.data;
                setName(institutData.name);
                setUniversity(institutData.university);
                console.log(institutData);
                
            })
            .catch(error => {
                setError("Error fetching institut data");
                console.error(error);
            });
    }, [id]);

    const editInstitut = (e) => {
        e.preventDefault();
        setError("");

        const institutData = {
            name,
            university
        };

        axios.put(`http://localhost:80/admin/institut/${id}`, institutData, 
            {
                headers: {
                    "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN
                }
            })
            .then(() => navigate('/institut'))
            .catch(error => {
                setError("Error updating institut");
                console.error(error);
            });
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Edit Institut
            </Typography>
            <Box component="form" onSubmit={editInstitut} noValidate sx={{ mt: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}

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
                        label="University"
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
                    Edit Institut
                </Button>
            </Box>
        </Container>
    );
}

export default InstitutUpdate;
