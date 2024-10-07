import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function DocumentList() {
  const [documents, setDocument] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8082/admin/document");
        console.log(response.data);
        setDocument(response.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          console.error("Status code:", err.response.status);
          console.error("Response data:", err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", err.message);
        }
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/admin/document/${id}`);
      setDocument(documents.filter((document) => document._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id,event) => {
    event.stopPropagation();
    navigate(`/documents/update/${id}`); // Use navigate function
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "institut", headerName: "Institut", width: 200 },
    { field: "Matieres", headerName: "Matieres", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "img",
      headerName: "Image",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={(event) => handleEdit(params.row._id, event)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = documents.map((document, index) => ({
    ...document,
    id: index + 1, // Assuming you want to display a serial number
  }));

  return (
    <div className="course-list-container">
      <div className="data-grid-container">
        <a href="/documents/add" className="btn btn-primary mb-2 mx-auto p-2">Add Document</a>
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
      </div>
    </div>
  );
}

export default DocumentList;



