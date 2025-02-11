import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import api from "../utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const permissions = useSelector((state: RootState) => state.auth.permissions);

  const hasPermission = (permission: string) => permissions.includes(permission);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => router.push("/")}>
          Home
        </Button>

        <Box>
          {isAuthenticated ? (
            <>
              {hasPermission("appointments") && (
                <Button color="inherit" onClick={() => router.push("/appointments")}>
                  Appointment
                </Button>
              )}

              {hasPermission("manage_users") && (
                <Button color="inherit" onClick={() => router.push("/manage_users")}>
                  Users
                </Button>
              )}

              {hasPermission("view_reports") && (
                <Button color="inherit" onClick={() => router.push("/reports")}>
                  Reports
                </Button>
              )}

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
