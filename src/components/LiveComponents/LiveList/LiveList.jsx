import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Container } from "@mui/material";

const makeStyle = (status) => {
    switch (status) {
        case 'accepted':
        case 'Approved':
            return {
                background: 'rgba(145, 254, 159, 0.47)',
                color: 'green',
            };
        case 'Pending':
            return {
                background: '#ffadad8f',
                color: 'red',
            };
        case 'not valid':
            return {
                background: '#d3d3d3',
                color: '#a9a9a9',
            };
        default:
            return {
                background: '#59bfff',
                color: 'white',
            };
    }
};

function LiveList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8082/api/fetchrequests1')
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        fetch(`http://localhost:8082/api/request1/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => response.json())
            .then(updatedRequest => {
                setRows(prevRows =>
                    prevRows.map(row =>
                        row._id === updatedRequest._id ? updatedRequest : row
                    )
                );
            })
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Live Requests
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
                <Table sx={{ minWidth: 650 }} aria-label="live requests table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">User Email</TableCell>
                            <TableCell align="left">Seance</TableCell>
                            <TableCell align="left">Num</TableCell>
                            <TableCell align="left">Num AUTH</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="left">{row.seance}</TableCell>
                                <TableCell align="left">{row.num}</TableCell>
                                <TableCell align="left">{row.aut}</TableCell>
                                <TableCell align="left">
                                    <span className="status" style={makeStyle(row.status)}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <Box display="flex" flexDirection="column">
                                        <Button
                                            variant="contained"
                                            onClick={() => handleStatusUpdate(row._id, row.status === 'waiting' ? 'accepted' : 'waiting')}
                                        >
                                            {row.status === 'waiting' ? 'Grant Access' : 'Revoke Access'}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ marginTop: '10px' }}
                                            onClick={() => handleStatusUpdate(row._id, 'not valid')}
                                        >
                                            Mark as Not Valid
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default LiveList;
