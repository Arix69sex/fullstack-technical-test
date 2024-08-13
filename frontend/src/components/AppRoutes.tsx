import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import PetsListView from "../views/PetListView";
import AdopterListView from "../views/AdopterListView";
import VolunteerListView from "../views/VolunteerListView";
import UserAdoptionListView from "../views/AdoptionListView";
import { useAuth } from "../service/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <Route path="*" element={<Navigate to="/pets" />} />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
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
  );
};

export default AppRoutes;
