"use client"

import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography } from "@mui/material";

interface User {
    id: string,
    name: string;
}

interface UserDropdownProps{
    loggedInUserId : string,
    onSelect: (userId: string) => void;
}

export default function UserDropdown({loggedInUserId, onSelect }: UserDropdownProps){
    const[users, setUsers] = useState<User[]>([]);
    const[selectedUser, setSelectedUser] = useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () =>{
            setLoading(true);
            try{
                const response = await fetch("http://localhost:5000/auth/subbordinates");
                if(!response.ok){
                    throw new Error("Error");
                }
                const data = await response.json();
                setUsers(data);
            }catch(err){
                setError("error fetching users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [loggedInUserId]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(event.target.value);
        onSelect(event.target.value);
    };

    return (
      <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>User</InputLabel>
          {loading ? (
              <CircularProgress size={24} />
          ) : error ? (
              <Typography color="error">{error}</Typography>
          ) : (
              <Select value={selectedUser} onChange={handleSelect} label="User">
                  <MenuItem value="">
                      <em>Select a user</em>
                  </MenuItem>
                  {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                          {user.name}
                      </MenuItem>
                  ))}
              </Select>
          )}
      </FormControl>
      );
    }