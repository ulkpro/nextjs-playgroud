"use client"

import React, { useState } from "react";
import UserDropdown from "../../components/UserDropdown";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import AuthGuard from "@/components/AuthGuard";

interface UserProfile {
    name: string;
    email: string;
    age: number;
}

export default function reports(){
    const[profile, setProfile] = useState<UserProfile | null>(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");

    const user = useSelector((state: RootState) => state.auth.user);

    const fetchUserProfile = async (userId: string) => {
        setLoading(true);
        setError("");
        try{
            
            const response = await fetch(`http://localhost:5000/profile?id=${userId}`);
            if (!response.ok) throw new Error("Failed to load");
            const data = await response.json();
            setProfile(data);

        }catch(err){
            setError("Error fetching profile")
        } finally{
            setLoading(false);
        }
    };

return(
        <div>
            <AuthGuard>
                <div>
                    <UserDropdown loggedInUserId={user || ""} onSelect={fetchUserProfile}/>
                </div>
                <Card>
                    <CardContent>
                        {loading && <CircularProgress/>}
                        {error && <Alert severity="error">{error}</Alert>}
                        {profile && (
                            <div>
                                <Typography variant="h4">{profile.name}</Typography>
                                <Typography>Email: {profile.email}</Typography>
                                <Typography>Age: {profile.age}</Typography>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </AuthGuard>
        </div>        
);
};