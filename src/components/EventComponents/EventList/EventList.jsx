import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, IconButton, Container, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function EventList() {
    const [events, setDocument] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:80/api/events/", {
                    headers: {
                        "Content-Type": "application/json",
                        "x-admin-token":
                            process.env.REACT_APP_ADMIN_TOKEN,
                    },
                });
                setDocument(response.data);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:80/api/events/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token":
                        process.env.REACT_APP_ADMIN_TOKEN,
                },
            });
            setDocument(events.filter((document) => document._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (id, event) => {
        event.stopPropagation();
        navigate(`/events/update/${id}`);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Title", flex: 1 },
        { field: "start", headerName: "Start", flex: 1 },
        { field: "end", headerName: "End", flex: 1 },
        { field: "num", headerName: "Num", width: 80 },
        { field: "meet", headerName: "Meet", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "linkdocs", headerName: "Link Docs", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="edit"
                        onClick={(event) => handleEdit(params.row._id, event)}
                    >
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <DeleteIcon color="error" />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = events.map((document, index) => ({
        ...document,
        id: index + 1,
    }));

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h1">
                    Event List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/events/add"
                    style={{ textTransform: "none" }}
                >
                    Add Event
                </Button>
            </Box>
            <Box style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Box>
        </Container>
    );
}

export default EventList;
