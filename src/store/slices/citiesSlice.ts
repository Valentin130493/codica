import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_KEY, baseUrl} from "../../static/api";

export interface CitiesState {
    error: any;
    cities: string[];
    citiesWeather: any[];
    details: {},
    loading: boolean;
}

export const getCityWeather = createAsyncThunk(
    "weather/get",
    async (city: string, thunkAPI) => {
        try {
            const res = await axios.get(`${baseUrl}?q=${city}&appid=${API_KEY}`)
            return await res.data
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
);
export const addCity = createAsyncThunk(
    "weather/add",
    async (city: string, thunkAPI) => {
        try {
            const res = await axios.get(`${baseUrl}?q=${city}&appid=${API_KEY}`)
            return await res.data
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
);

export const refreshForecast = createAsyncThunk(
    "weather/refresh",
    async (city: string, thunkAPI) => {
        try {
            const res = await axios.get(`${baseUrl}?q=${city}&appid=${API_KEY}`)
            return await res.data
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
);


const getCities = localStorage.getItem('cities')

const initialState: CitiesState = {
    error: null,
    cities: getCities ? JSON.parse(getCities) : [],
    citiesWeather: [],
    details: {},
    loading: false
};

export const citiesSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload
        },
        deleteCity: (state, action) => {
            state.citiesWeather = state.citiesWeather.filter((city) => city.name !== action.payload)
            state.cities = state.cities.filter((city)=> city !== action.payload)
            localStorage.setItem('cities', JSON.stringify(state.cities));

        },
        getCityForecast: (state, action) => {
            state.details = state.citiesWeather.find((city) => city.name === action.payload)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getCityWeather.pending, (state, {payload}) => {
            state.loading = true;
        });
        builder.addCase(getCityWeather.fulfilled, (state, {payload}) => {
            const city = payload.name
            if (!state.cities.includes(city)) {
                state.cities.push(city)
            }

            state.citiesWeather.push(payload)
        });
        builder.addCase(getCityWeather.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(addCity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addCity.fulfilled, (state, {payload}: any) => {
            if (!state.cities.includes(payload.name)) {
                state.cities.push(payload.name);
                localStorage.setItem('cities', JSON.stringify(state.cities));
            }
            state.citiesWeather = state.citiesWeather.concat(payload)

            state.loading = false;
        });
        builder.addCase(addCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(refreshForecast.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshForecast.fulfilled, (state, {payload}: any) => {
            const arr = state.citiesWeather.filter((city) => city.name !== payload.name)
            state.citiesWeather = arr.concat(payload)
            state.loading = false;
        });
        builder.addCase(refreshForecast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

    }
});

export const {setCities, deleteCity, getCityForecast} = citiesSlice.actions;

export default citiesSlice.reducer;
