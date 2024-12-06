import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Token in UserList:", process.env.REACT_APP_ADMIN_TOKEN);
        console.log("Token in DocumentList:", process.env.REACT_APP_ADMIN_TOKEN);
        
        const response = await axios.get("http://localhost:80/admin/users", {
          
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": process.env.REACT_APP_ADMIN_TOKEN,
          },
        });
        
        setUsers(response.data);
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

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:80/admin/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token":
          process.env.REACT_APP_ADMIN_TOKEN,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "niveau", headerName: "Level", width: 200 },
    {
      field: "password",
      headerName: "password",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
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

  const rows = users.map((user, index) => ({
    ...user,
    id: index + 1, // Assuming you want to display a serial number
  }));

  return (
    <div className="course-list-container">
      <div className="data-grid-container">
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

export default UserList;
