import React from 'react';
import {WeatherCard} from "../components";
import {Box, Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store";
import {addCity, getCityWeather} from "../store/slices/citiesSlice";


export const Home = () => {
    const dispatch = useAppDispatch()
    const inputRef = React.useRef('')
    const weather = useAppSelector((state) => state.weather.citiesWeather)
    const cities = useAppSelector((state) => state.weather.cities);

    React.useEffect(() => {
        if (cities?.length && !weather.length) {
            cities.forEach(async (city: any) => {
                await dispatch(getCityWeather(city))
            })
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputRef.current = e.target.value
    }

    const handleAddCity = () => {
        dispatch(addCity(inputRef.current))
        inputRef.current = ''
    }


    return (
        <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
            <Box sx={{display: 'flex', flexDirection: "column"}}>
                <TextField onChange={handleChange}/>
                <Button type="button" onClick={() => handleAddCity()}>Add city</Button>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: 'calc(100% - 200px)'
                }}>
                {weather.map((item: any, index) => {
                    return <WeatherCard key={index} item={item}/>
                })}
            </Box>

        </Box>
    );
};

