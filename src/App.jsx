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
  TextField,
  Fade,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./App.css";

function App() {
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
    },
    typography: {
      fontFamily: "Montserrat, Roboto, Arial",
    },
  });

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const getRejection = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setShowAnswer(false);
    try {
      const res = await fetch(
        `http://localhost:3003/no?question=${encodeURIComponent(question)}`
      );
      const data = await res.json();
      setReason(data.reason);
      setShowAnswer(true);
    } catch (e) {
      setReason("Sorry, something went wrong. Please try again.");
      setShowAnswer(true);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Will you take me on a date this weekend?",
    "Can I have a raise for doing nothing?",
    "Will you do my homework for me?",
    "Can I call in sick for the rest of the year?",
    "Will you pay my rent this month?",
    "Can I eat cake for breakfast every day?",
  ];

  useEffect(() => {
    getRejection(); // get first rejection on load
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 8 }}>
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <HelpOutlineIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Request Denied
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Get a creative (or blunt) answer to any question!
        </Typography>

        {/* Suggestions Row */}
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 2 }}>
          {suggestions.map((s, i) => (
            <Button
              key={i}
              variant="outlined"
              size="small"
              onClick={() => setQuestion(s)}
              sx={{ textTransform: "none" }}
              disabled={loading}
            >
              {s}
            </Button>
          ))}
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            getRejection();
          }}
          sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}
        >
          <TextField
            label="Type your question..."
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
            autoFocus
            disabled={loading}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={!question.trim() || loading}
            sx={{ minWidth: 120, fontWeight: 600 }}
          >
            {loading ? "Thinking..." : "Ask"}
          </Button>
        </Box>

        <Fade in={showAnswer} timeout={600}>
          <Paper
            elevation={6}
            sx={{
              mt: 5,
              p: 4,
              borderRadius: 3,
              maxWidth: 500,
              width: "100%",
              mx: "auto",
              background:
                mode === "dark"
                  ? "rgba(30,30,30,0.95)"
                  : "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontStyle: "italic", minHeight: 32 }}
            >
              {reason ||
                (loading ? "Thinking..." : "Ask a question to get an answer!")}
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}

export default App;
