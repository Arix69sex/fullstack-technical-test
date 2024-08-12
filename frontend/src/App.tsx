import "./App.css";
import { MantineProvider, createTheme } from "@mantine/core";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetsListView from "./views/PetListView";
import AdopterListView from "./views/AdopterListView";
import VolunteerListView from "./views/VolunteerListView";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./service/AuthContext";
import UserAdoptionListView from "./views/AdoptionListView";

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
                path="/adoptions"
                element={
                  <ProtectedRoute>
                    <UserAdoptionListView />
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
