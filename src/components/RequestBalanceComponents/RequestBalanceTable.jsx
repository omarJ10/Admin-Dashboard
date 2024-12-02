import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RequestBalanceTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch request balances from the server
    fetch("http://localhost:80/api/fetchRequestBalances",{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": process.env.ADMIN_TOKEN
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched request balances:", data); // Debug log
        setRequests(data); // Update state with fetched data
      })
      .catch(error => console.error("Error fetching request balances:", error));
  }, []);

  return (
    <div>
      <h3>Request Balance Listing</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="request balance table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Credits</TableCell>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Authorization Code</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{request.email}</TableCell>
                <TableCell align="left">{request.credits}</TableCell>
                <TableCell align="left">{request.num}</TableCell>
                <TableCell align="left">{request.aut}</TableCell>
                <TableCell align="left">{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequestBalanceTable;
