import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, IconButton, Container, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function DocumentList() {
  const [documents, setDocument] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        console.log(process.env.ADMIN_TOKEN);
        const response = await axios.get(
          "http://18.211.148.152/admin/document",
          {
            headers: {
              "Content-Type": "application/json",
              "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
            },
          }
        );
        setDocument(response.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://18.211.148.152/admin/document/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
        },
      });
      setDocument(documents.filter((document) => document._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/documents/update/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "university", headerName: "University", flex: 1 },
    { field: "institut", headerName: "Institut", flex: 1 },
    { field: "Matieres", headerName: "Matieres", flex: 1 },
    { field: "niveau", headerName: "Niveau", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "link", headerName: "Link", flex: 1 },
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

  const rows = documents.map((document, index) => ({
    ...document,
    id: index + 1,
  }));

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" component="h1">
          Document List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/documents/add"
          style={{ textTransform: "none" }}
        >
          Add Document
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
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e0e0e0",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              padding: "8px",
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default DocumentList;
