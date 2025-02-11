import React from "react";
import { Container, Typography, Button } from "@mui/material";

const Appointments: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Appointments
            </Typography>
            <Typography>
                Manage your appointments here.
            </Typography>
            <Button variant="contained" color="primary">
                Add Appointment
            </Button>
        </Container>
    );
};

export default Appointments;