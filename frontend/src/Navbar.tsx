import React from "react";
import { Link } from "react-router-dom";
import { Button, Group } from "@mantine/core";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated);
  return (
    <nav>
      <Group justify="center" gap="xl" mt="xs">
        {!isAuthenticated ? (
          <>
            <Button component={Link} to="/login">
              Login
            </Button>
            <Button component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/pets">
              Pets
            </Button>
            {user != null && user.user_type != "adopter" ? (
              <Button component={Link} to="/adopters">
                Adopters
              </Button>
            ) : (
              <> </>
            )}

            <Button component={Link} to="/adoptions">
              Adoptions
            </Button>

            {user != null && user.user_type != "adopter" ? (
              <Button component={Link} to="/volunteers">
                Volunteers
              </Button>
            ) : (
              <> </>
            )}

            <Button onClick={logout}>Logout</Button>
          </>
        )}
      </Group>
    </nav>
  );
};

export default Navbar;
