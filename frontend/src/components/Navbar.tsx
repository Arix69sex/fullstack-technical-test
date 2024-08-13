import { Link } from "react-router-dom";
import { Button, Group, Text } from "@mantine/core";
import { useAuth } from "../service/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated);
  return (
    <nav
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        padding: "10px",
        zIndex: 1000,
        borderBottom: "1px solid #d5d5d5",
      }}
    >
      <Group justify="space-between">
        <Text size="30px" ml="sm" c="cyan">
          Elsa Shelter
        </Text>
        <Group justify="end" gap="md">
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
      </Group>
    </nav>
  );
};

export default Navbar;
