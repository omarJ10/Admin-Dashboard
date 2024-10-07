import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function EventList() {

    const [events, setDocument] = useState([]);
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("http://localhost:8082/api/events/");
          console.log(response.data);
          setDocument(response.data);
        } catch (err) {
          console.error("Error fetching events:", err);
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
  
      fetchEvents();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8082/api/events/${id}`);
        setDocument(events.filter((document) => document._id !== id));
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleEdit = (id,event) => {
      event.stopPropagation();
      navigate(`/events/update/${id}`); // Use navigate function
    };
  
    const columns = [
      { field: "_id", headerName: "ID", width: 70 },
      { field: "title", headerName: "Title", width: 100 },
      { field: "start", headerName: "start", width: 150 },
      { field: "end", headerName: "end", width: 150 },
      { field: "num", headerName: "num", width: 50 },
      { field: "meet", headerName: "meet", width: 200 },
      { field: "description", headerName: "description", width: 100 },
      { field: "linkdocs", headerName: "linkdocs", width: 200 },
      
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
  
    const rows = events.map((document, index) => ({
      ...document,
      id: index + 1, // Assuming you want to display a serial number
    }));


  return (
    <div className="course-list-container">
      <div className="data-grid-container">
        <a href="/events/add" className="btn btn-primary mb-2 mx-auto p-2">Add Event</a>
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
  )
}

export default EventList
