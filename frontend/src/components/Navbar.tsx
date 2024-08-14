import { Link } from "react-router-dom";
import {
  Button,
  Group,
  MantineProvider,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useAuth } from "../service/AuthContext";

const Navbar = () => {
  const theme = useMantineTheme();
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated);
  return (
    <MantineProvider theme={theme}>
      <nav
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          padding: "10px",
          zIndex: 1000,
          borderBottom: "1px solid #d5d5d5",
          background: "white"
        }}
      >
        <Group justify="space-between">
          <Text size="30px" ml="sm" c="orange" fw={700}>
            Elsa Shelter
          </Text>
          <Group justify="end" gap="md">
            {!isAuthenticated ? (
              <>
                <Button component={Link} to="/login" variant="outline">
                  Login
                </Button>
                <Button variant="outline" component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" component={Link} to="/pets">
                  Pets
                </Button>
                {user != null && user.user_type != "adopter" ? (
                  <Button variant="outline" component={Link} to="/adopters">
                    Adopters
                  </Button>
                ) : (
                  <> </>
                )}

                <Button variant="outline" component={Link} to="/adoptions">
                  Adoptions
                </Button>

                {user != null && user.user_type != "adopter" ? (
                  <Button variant="outline" component={Link} to="/volunteers">
                    Volunteers
                  </Button>
                ) : (
                  <> </>
                )}

                {user != null && user.user_type == "admin" ? (
                  <Button variant="outline" component={Link} to="/admin">
                    Admin
                  </Button>
                ) : (
                  <> </>
                )}

                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Group>
        </Group>
      </nav>
    </MantineProvider>
  );
};

export default Navbar;
