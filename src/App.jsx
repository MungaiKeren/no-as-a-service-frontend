import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const getRejection = async () => {
    const res = await fetch("http://localhost:3003/no");
    const data = await res.json();
    console.log(data);    
    setReason(data.reason);
  };

  useEffect(() => {
    getRejection(); // get first rejection on load
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

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
    </ThemeProvider>
  );
}

export default App;
