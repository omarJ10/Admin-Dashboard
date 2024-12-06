import * as React from "react";
import { useState, useEffect, useCallback } from "react";
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

// A helper function for styling the status cell
const makeStyle = (status) => {
  switch (status) {
    case "accepted":
      return { background: "rgb(145 254 159 / 47%)", color: "green" };
    case "pending":
      return { background: "#ffadad8f", color: "red" };
    case "not valid":
      return { background: "#d3d3d3", color: "#a9a9a9" };
    default:
      return { background: "#59bfff", color: "white" };
  }
};

export default function PaymentTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show a spinner while data is fetched
  const [error, setError] = useState(null); // Error handling
  const [filterStatus, setFilterStatus] = useState("all"); // State for the selected filter

  const fetchPayments = useCallback(async () => {
    try {
      console.log("hello "+process.env.REACT_APP_ADMIN_TOKEN);
      const response = await fetch("http://localhost:80/api/fetchrequests2",{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "gqAe5BCRtlGOVfA1tsE6MJQb69mbLElAok7vGp8PIyKRdkmqkXvqSurpZEHjasser"
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched payment data:", data);
      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleStatusUpdate = (id, newStatus) => {
    fetch(`http://localhost:80/api/request2/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" ,
        'x-admin-token': process.env.REACT_APP_ADMIN_TOKEN
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedPayment) => {
        console.log("Updated payment:", updatedPayment);
        setRows((prevRows) =>
          prevRows.map((row) => (row._id === updatedPayment._id ? updatedPayment : row))
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const filteredRows = rows.filter((row) => {
    if (filterStatus === "all") return true; // Show all if filter is set to 'all'
    return row.status === filterStatus; // Filter by selected status
  });

  if (loading) {
    return <div>Loading...</div>; // Add a loading message or spinner
  }

  if (error) {
    return <div>Error: {error}</div>; // Add error handling message
  }

  return (
    <div className="Table">
      <h3>Payment Requests</h3>

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

      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="payment table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">User Email</TableCell>
              <TableCell align="left">Credits</TableCell>
              <TableCell align="left">Num</TableCell>
              <TableCell align="left">Auth</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.credits}</TableCell>
                <TableCell align="left">{row.num}</TableCell>
                <TableCell align="left">{row.aut}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">
                  <Button
                    variant="contained"
                    className="btn btn-primary"
                    onClick={() =>
                      handleStatusUpdate(row._id, row.status === "waiting" ? "accepted" : "waiting")
                    }
                  >
                    {row.status === "waiting" ? "Mark as Paid" : "Revoke Payment"}
                  </Button>
                  <Button
                    variant="contained"
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleStatusUpdate(row._id, "not valid")}
                  >
                    Decline
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
