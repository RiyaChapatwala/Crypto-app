import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDataAsync =  createAsyncThunk(
    "getDataAsync",
    async(payload) => {
        const response = await fetch(`https://coinranking1.p.rapidapi.com/coins?limit=${payload.count}` ,{
            "method" :"GET",
            "headers": {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'd8aa010381mshec3eff78738365bp10d998jsn0918a8c526fd'
            }
        })
        if (response.ok) {
			const data = await response.json();
        //   console.log("in data reducer",data?.data?.coins);
			return data;
		}
    }
)
export const getSingleDataAsync =  createAsyncThunk(
    "getSingleDataAsync",
    async(payload) => {
        // console.log(payload.coinId, "paylod coinid here ");
        const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${payload.coinId}` ,{
            "method" :"GET",
            "headers": {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': 'd8aa010381mshec3eff78738365bp10d998jsn0918a8c526fd'
            }
        })
        if (response.ok) {
			const data = await response.json();
        //   console.log("in data reducer",data);
			return data ;
		}
    }
)
export const getCryptoHistory =  createAsyncThunk(
    "getCryptoHistory",
    async(payload) => {
        console.log(payload.coinId, "paylod coinid here ");
        const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/${payload.coinId}/history/${payload.timePeriod}` ,{
            "method" :"GET",
            "headers": {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': 'd8aa010381mshec3eff78738365bp10d998jsn0918a8c526fd'
            }
        })
        if (response.ok) {
			const historyData = await response.json();
          console.log("in hist reducer",historyData);
			return historyData;
		}
    }
)
export const getExchanges =  createAsyncThunk(
    "getExchanges",
    async() => {
        const response = await fetch(`https://coinranking1.p.rapidapi.com/exchanges` ,{
            "method" :"GET",
            "headers": {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': 'd8aa010381mshec3eff78738365bp10d998jsn0918a8c526fd'
            }
        })
        if (response.ok) {
			const exchange = await response.json()
            console.log("exchange",exchange);
            return exchange;
		}
    }
)

export const dataSlice = createSlice({
    name : 'data',
    initialState : {
        historyData:[],
        exchangeData:[],
        list:[],
        singleData:{}
    },
    reducers : {},	
    extraReducers : {
        [getDataAsync.pending] : (state,action) => {
            console.log("fetching...")
        },
        [getDataAsync.fulfilled]: (state, action) => {
            state.list = action.payload?.data
        },
        [getSingleDataAsync.fulfilled] : (state , action) =>{
            state.singleData = action.payload?.data
        },
        [getCryptoHistory.fulfilled] : (state , action) => {
            // console.log("in reducer", action.payload);
            state.historyData = action.payload?.data
        },
        [getExchanges.fulfilled] : (state , action) => {
            // console.log("in reducer", action.payload);
            state.exchangeData = action.payload
        }
    },
});

export default dataSlice.reducer