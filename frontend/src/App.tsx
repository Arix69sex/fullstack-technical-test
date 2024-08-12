import "./App.css";
import { MantineProvider, createTheme } from "@mantine/core";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetsListView from "./PetListView";
import AdopterListView from "./AdopterListView";
import VolunteerListView from "./VolunteerListView";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',

  primaryColor: 'cyan',
});

function App() {
  
  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/register"
                element={
                  <ProtectedRoute>
                    <RegisterView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <LoginView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pets"
                element={
                  <ProtectedRoute>
                    <PetsListView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/adopters"
                element={
                  <ProtectedRoute>
                    <AdopterListView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteers"
                element={
                  <ProtectedRoute>
                    <VolunteerListView />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </MantineProvider>
  );
}

export default App;
