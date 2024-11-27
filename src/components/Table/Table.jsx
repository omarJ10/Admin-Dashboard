import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "./Table.css";

// A helper function for styling the status cell
const makeStyle = (status) => {
  if (status === 'accepted' || status === 'Approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    };
  } else if (status === 'Pending') {
    return {
      background: '#ffadad8f',
      color: 'red',
    };
  } else if (status === 'not valid') {
    return {
      background: '#d3d3d3', // Grey background for "not valid" status
      color: '#a9a9a9',      // Darker grey text color
    };
  } else {
    return {
      background: '#59bfff',
      color: 'white',
    };
  }
};

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // State for the selected filter

  useEffect(() => {
    fetch('http://localhost:8082/api/fetchrequests')
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    fetch(`http://localhost:8082/api/request/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedRequest => {
        setRows(prevRows =>
          prevRows.map(row =>
            row._id === updatedRequest._id ? updatedRequest : row
          )
        );
      })
      .catch(error => console.error('Error updating status:', error));
  };

  // Filter the rows based on the selected filter status
  const filteredRows = rows.filter((row) => {
    if (filterStatus === "all") return true; // Show all if filter is set to 'all'
    return row.status === filterStatus; // Filter by selected status
  });

  return (
    <div className="Table">
      <h3>Recent Documents Orders Requests</h3>

      {/* Status filter dropdown */}
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Filter by Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="not valid">Not Valid</MenuItem>
          <MenuItem value="waiting">Waiting</MenuItem>
        </Select>
      </FormControl>

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">User Email</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell align="left">Niveau</TableCell>
              <TableCell align="left">Num</TableCell>
              <TableCell align="left">Gmail</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {filteredRows.map((row) => (
              <TableRow
                key={row._id} // Use a unique key from your MongoDB data
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="left">{row.option2}</TableCell>
                <TableCell align="left">{row.option3}</TableCell>
                <TableCell align="left">{row.num}</TableCell>
                <TableCell align="left">{row.gmail}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">
                  <Button
                    variant="contained"
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate(row._id, row.status === 'waiting' ? 'accepted' : 'waiting')}
                  >
                    {row.status === 'waiting' ? 'Grant Access' : 'Revoke Access'}
                  </Button>
                  <Button
                    variant="contained"
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleStatusUpdate(row._id, 'not valid')}
                  >
                    x
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
