import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/contact_messages"
        );

        // Check if response.data.messages is an array
        if (response.data && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  function getDetails(_id, event) {
    event.stopPropagation();
    navigate(`/messages/${_id}`);
  }

  function handleDelete(id) {
    try {
      axios.delete(`http://localhost:8082/api/contact_messages/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "number", headerName: "Number", width: 150 },
    { field: "message", headerName: "Message", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={(event) => getDetails(params.row._id, event)}
          >
            <InfoIcon />
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

  const rows = messages.map((message, index) => ({
    ...message,
    id: message._id || index, // Use message._id if available, otherwise use the index
  }));

  return (
    <div
      className="data-grid-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Messages Management</h1>
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
  );
}

export default MessageList;
