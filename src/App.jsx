import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CssBaseline,
} from "@mui/material";

function App() {
  const [reason, setReason] = useState("");

  const getRejection = async () => {
    const res = await fetch("http://localhost:3003/no");
    const data = await res.json();
    setReason(data.reason);
  };

  useEffect(() => {
    getRejection(); // get first rejection on load
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Ask Me Anything
        </Typography>

        <Button
          variant="contained"
          onClick={getRejection}
          size="large"
          sx={{ mt: 2 }}
        >
          Get Your Answer
        </Button>

        <Paper elevation={3} sx={{ mt: 5, p: 3 }}>
          <Typography variant="h6" color="text.secondary">
            {reason || "Thinking..."}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default App;
