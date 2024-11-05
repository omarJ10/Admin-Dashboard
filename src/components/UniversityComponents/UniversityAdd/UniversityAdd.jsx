import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, MenuItem,Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

function UniveristyAdd() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const addMatiere = async (e) => {
        e.preventDefault();



        const matiereData = {
            name,

        };

        try {
            const response = await axios.post("http://localhost:8082/admin/university/insert", matiereData);
            console.log(response.data);
            navigate("/univerity/");
        } catch (error) {
            console.error("Error adding matiere:", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h4" component="h2" gutterBottom>
                Add University
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
    )
}

export default UniveristyAdd;