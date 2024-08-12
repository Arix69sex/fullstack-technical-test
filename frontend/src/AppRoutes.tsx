import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterView from "./RegisterView";
import LoginView from "./LoginView";
import PetsListView from "./PetListView";
import AdopterListView from "./AdopterListView";
import VolunteerListView from "./VolunteerListView";
import UserAdoptionListView from "./UserAdoptionListView";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/pets" element={<PetsListView />} />
        <Route path="/adopters" element={<AdopterListView />} />
        <Route path="/volunteers" element={<VolunteerListView />} />
        <Route path="/adoptions" element={<UserAdoptionListView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
