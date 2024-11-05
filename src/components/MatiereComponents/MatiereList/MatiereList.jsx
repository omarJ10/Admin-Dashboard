import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, IconButton, Container, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function MatiereList() {
  const [matieres, setDocument] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/matieres/");
        console.log(response.data);
        setDocument(response.data);
      } catch (err) {
        console.error("Error fetching matieres:", err);
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

    fetchMatieres();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/matieres/${id}`);
      setDocument(matieres.filter((document) => document._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/matiere/update/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "img", headerName: "Image URL", width: 300 }, // Changed header name for clarity
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

  const rows = matieres.map((document, index) => ({
    ...document,
    id: index + 1,
  }));

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h1">
          Matiere List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/matiere/add"
          style={{ textTransform: "none" }}
        >
          Add Matiere
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

export default MatiereList;
