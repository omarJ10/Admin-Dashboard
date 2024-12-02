import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Container } from "@mui/material";

function MessageDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/contact_messages/${id}`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
        "x-admin-token": process.env.ADMIN_TOKEN
          },
        });
        // Assuming response.data is an object with a `message` key
        setMessage(response.data.message);
        console.log(response.data.message);
      } catch (err) {
        console.error("Error fetching message details:", err);
      }
    };

    fetchMessage();
  }, [id]);

  if (!message) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card variant="outlined" style={{ padding: "20px" }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Message Details
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Name:
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {message.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Email:
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {message.email}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Message:
          </Typography>
          <Typography
            variant="body1"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default MessageDetails;
