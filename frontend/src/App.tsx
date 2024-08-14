import "./App.css";
import { MantineProvider, createTheme } from "@mantine/core";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./service/AuthContext";
import AppRoutes from "./components/AppRoutes";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "orange"
});

function App() {
  return (
    
    <MantineProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <Router>
            <Navbar />
            <AppRoutes />
          </Router>
        </AuthProvider>
      </div>
    </MantineProvider>
  );
}

export default App;
