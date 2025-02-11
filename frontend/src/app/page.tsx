"use client";

import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchWidgets } from "@/redux/slices/widgetSlice";
import { Card, CardContent, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import AuthGuard from "@/components/AuthGuard";

export default function HomePage() {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const userId = useSelector((state: RootState) => state.auth.user);

  const widgets = useSelector((state: RootState) => state.widgets.widgets);
  const loading = useSelector((state: RootState) => state.widgets.loading);
  const error = useSelector((state: RootState) => state.widgets.error);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>; // Prevent rendering the rest of the component
  }

  useEffect(() => {
    if (role && userId) {
      dispatch(fetchWidgets({ role, userId }));
    }
  }, [role, userId, dispatch]);


  return (
    <AuthGuard>
      <div>
        <h1>Welcome</h1>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {widgets.map((widget, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div>
                    <Typography variant="h6">{widget.title}</Typography>
                    <Typography variant="body1">{widget.unit}{widget.value}</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      </AuthGuard>
  );
};