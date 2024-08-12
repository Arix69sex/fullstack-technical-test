import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import PetsListView from "../views/PetListView";
import AdopterListView from "../views/AdopterListView";
import VolunteerListView from "../views/VolunteerListView";
import UserAdoptionListView from "../views/AdoptionListView";

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
