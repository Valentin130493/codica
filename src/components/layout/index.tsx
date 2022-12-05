import React from 'react';
import {Outlet} from "react-router";

import {Box} from "@mui/material";


export const Layout = () => {
    return (
        <Box sx={{padding: "10px", display: "flex", width: "100%", height: "100vh"}}>
            <Outlet/>
        </Box>
    );
};

