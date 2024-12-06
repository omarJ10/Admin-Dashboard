import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, IconButton, Container, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function InstitutList() {
  const [instituts, setInstituts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstituts = async () => {
      try {
        const response = await axios.get("http://localhost:80/admin/institut", {
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          },
        });
        setInstituts(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching instituts:", err);
      }
    };

    fetchInstituts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:80/admin/institut/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
        },
      });
      setInstituts(instituts.filter((institut) => institut._id !== id));
    } catch (err) {
      console.error("Error deleting institut:", err);
    }
  };

  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/institut/update/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "university", headerName: "University", width: 200 },
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

  const rows = instituts.map((institut, index) => ({
    ...institut,
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
          Institut List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/instituts/add"
          style={{ textTransform: "none" }}
        >
          Add Institut
        </Button>
      </Box>
      <Box
        style={{
          height: 400,
          width: "100%",
        }}
      >
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

export default InstitutList;
