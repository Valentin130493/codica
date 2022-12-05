import React from 'react';
import {useAppSelector} from "../store";
import {Box, Typography} from "@mui/material";
import {toСel} from "../utils/temp";


export const Details = () => {
    const forecast: any = useAppSelector((state) => state.weather.details)
    console.log(forecast)
    return (
        <Box>
            <Typography>{forecast.name}</Typography>
            <Typography>Temp:{toСel(forecast.main.temp)}℃</Typography>
            <Typography>Max temp: {toСel(forecast.main.temp_max)}℃</Typography>
            <Typography>Min temp: {toСel(forecast.main.temp_min)}℃</Typography>
            <Typography>Feel Like: {toСel(forecast.main.feels_like)}℃</Typography>
            <Typography>Wind speed: {forecast.wind.speed}m/s</Typography>
        </Box>
    );
};

