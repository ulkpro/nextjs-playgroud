"use client"
import React, { useState } from "react";
import UserDropdown from "../../components/UserDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AuthGuard from "@/components/AuthGuard";

export default function reports(){
    const[profile, setProfile] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");

    const user = useSelector((state: RootState) => state.auth.user); 

    const fetchUserProfile = async (userId: string) => {
        setLoading(true);
        setError("");
        try{
            const response = await fetch("http://localhost:5000/profile?id=2");
            if (!response.ok) throw new Error("Failed to load");
            const data = await response.json();
            setProfile(data);
        }catch(err){
            setError("Error fetching profile")
        } finally{
            setLoading(false);
        }
        console.log(profile);
    }

return(
    <div>
        <AuthGuard>
            <UserDropdown loggedInUserId={user || ""} onSelect={fetchUserProfile}/>
        </AuthGuard>
    </div>
);
};