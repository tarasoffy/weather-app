import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";


export interface WeatherState {
    weatherInfo: [];
    dataCity: {
        cityName: string,
        country: string
    };
    status: null | string;
    error: undefined | string;
    correctNameCity: boolean;
}

const initialState: WeatherState = {
    weatherInfo: [],
    dataCity: {
        cityName: '',
        country: ''
    },
    status: null,
    error: undefined,
    correctNameCity: true
}

interface DataCoord {
    lat: number;
    lon: number;
}

export const fetchWeather = createAsyncThunk(
    'pokeApi',
    async (params: DataCoord, { rejectWithValue }) => {

        const response = await axios('https://api.openweathermap.org/data/2.5/onecall?', {
            params: {
                lat: params.lat,
                lon: params.lon,
                appid: 'cd34f8b9b66308f004e334ca91a668fb',
                lang: 'ru',
                units: 'metric'
            }
        })

        if (response.statusText !== 'OK') {
            return rejectWithValue(response)
        }

        return response.data
    }
)


export const takeCoord = createAsyncThunk(
    'coord',
    async (city: string, { dispatch, rejectWithValue }) => {

        const response = await axios('http://api.openweathermap.org/geo/1.0/direct?', {
            params: {
                q: city,
                appid: 'cd34f8b9b66308f004e334ca91a668fb',
                limit: 1
            }
        })


        if (response.statusText !== 'OK') {
            return rejectWithValue(response)
        }


        response.data.length ? dispatch(correctNameCity(true)) : dispatch(correctNameCity(false))


        let params = {
            lon: response.data[0].lon,
            lat: response.data[0].lat
        }

        let dataSerch = {
            cityName: response.data[0].name,
            country: response.data[0].country
        }

        dispatch(fetchWeather(params));

        dispatch(cityNameSlice(dataSerch));

        return response.data

    }
)


export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        cityNameSlice: (state, action) => {
            state.dataCity = action.payload
        },

        correctNameCity: (state, action) => {
            state.correctNameCity = action.payload
        }

    },

    extraReducers: (builder) => {

        builder.addCase(fetchWeather.pending, (state) => {
            state.error = undefined
            state.status = 'pending'
        })

        builder.addCase(fetchWeather.fulfilled, (state, { payload }) => {
            payload.daily.splice(-1, 1)
            state.weatherInfo = payload.daily
            state.status = 'fulfilled'
            state.error = undefined
        })

        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = `${action.error.name}: ${action.error.message}`
        })

        builder.addCase(takeCoord.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = `${action.error.name}: ${action.error.message}`
        })


    }
})

export const { cityNameSlice, correctNameCity } = weatherSlice.actions

export default weatherSlice.reducer