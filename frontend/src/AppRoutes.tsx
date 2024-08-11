import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import PetsListView from "./PetListView";
import AdopterListView from "./AdopterListView";
import VolunteerListView from "./VolunteerListView";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/pets" element={<PetsListView />} />
        <Route path="/adopters" element={<AdopterListView />} />
        <Route path="/volunteers" element={<VolunteerListView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
