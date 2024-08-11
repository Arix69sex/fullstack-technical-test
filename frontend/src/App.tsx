import "./App.css";
import { MantineProvider, createTheme } from "@mantine/core";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetsListView from "./PetListView";
import AdopterListView from "./AdopterListView";
import VolunteerListView from "./VolunteerListView";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "green",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/pets" element={<PetsListView />} />
            <Route path="/adopters" element={<AdopterListView />} />
            <Route path="/volunteers" element={<VolunteerListView />} />
          </Routes>
        </Router>
      </div>
    </MantineProvider>
  );
}

export default App;
