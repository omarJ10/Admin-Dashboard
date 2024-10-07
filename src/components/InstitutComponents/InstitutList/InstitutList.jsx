import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function InstitutList() {
  const [instituts, setUniversities] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/admin/institut"
        );
        setUniversities(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUniversities();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/admin/institut/${id}`);
      setUniversities(instituts.filter((university) => university._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/institut/update/${id}`);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "location", headerName: "Location", width: 200 },
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

  // const rows = instituts.map(university => {
  //   return {
  //     id: university._id,
  //     name: university.name,
  //     location: university.location,
  //     university: university.university,
  //   };
  // });

  const rows = instituts.map((institut, index) => ({
    ...institut,
    id: index + 1,
  }));
  return (
    <div className="course-list-container">
      <div className="data-grid-container">
        <a href="/instituts/add" className="btn btn-primary mb-2 mx-auto p-2">
          Add Instituts
        </a>
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

export default InstitutList;
