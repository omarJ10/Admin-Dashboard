import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, IconButton, Container, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function UniversityList() {
  const [universities, setUniversity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:8082/admin/university/");
        console.log(response.data);
        setUniversity(response.data);
      } catch (err) {
        console.error("Error fetching University:", err);
        if (err.response) {
          console.error("Status code:", err.response.status);
          console.error("Response data:", err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
      }
    };

    fetchUniversities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/admin/university/${id}`);
      setUniversity(universities.filter((document) => document._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/admin/university/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
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

  const rows = universities.map((document, index) => ({
    ...document,
    id: index + 1,
  }));

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h1">
          University List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/university/insert"
          style={{ textTransform: "none" }}
        >
          Add University
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

export default UniversityList;
