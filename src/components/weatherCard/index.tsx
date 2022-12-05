import React from 'react';
import {CardContent, Card, CardActions, IconButton, Typography, Grid} from "@mui/material";
import {imgURL} from "../../static/api";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useAppDispatch} from "../../store";
import {deleteCity, getCityForecast, refreshForecast} from "../../store/slices/citiesSlice";
import {useNavigate} from "react-router-dom";
import {toСel} from "../../utils/temp";


export const WeatherCard: React.FC<any> = ({item}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const getDetails = (name: string) => {
        dispatch(getCityForecast(name))
        navigate(`details/${name}`);

    }
    const handleRefresh = (e: any, name: string) => {
        e.stopPropagation()
        dispatch(refreshForecast(name))
    }
    const handleDelete = (e: any, name: string) => {
        e.stopPropagation()
        dispatch(deleteCity(name))
    }
    return (
        <Card
            sx={{
                width: "200px",
                height: "140px",
                margin: "0 10px 20px"
            }}
            variant="outlined"
            onClick={() => getDetails(item.name)}>
            <CardContent>
                <Grid container alignItems={'center'}>
                    <Grid item xs={6}>
                        <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{toСel(item.main.temp)}℃</Typography>
                    </Grid>
                    <Grid item xs={3} style={{marginLeft: "5px"}} alignContent={'center'}>
                        <img
                            alt="weather"
                            className="weather-icon"
                            src={`${imgURL}${item.weather[0].icon}.png`}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container alignItems={'center'} justifyContent={'end'}>
                    <IconButton onClick={(e) => handleRefresh(e, item.name)} color="primary" aria-label="upload picture"
                                component="label">
                        < AutorenewIcon/>
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(e, item.name)} color="primary" aria-label="upload picture"
                                component="label">
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </Grid>
            </CardActions>
        </Card>
    );
};

