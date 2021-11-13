import {configureStore} from '@reduxjs/toolkit'
import getDataReducer from './reducerSlice'
import { createNewsApi } from '../services/GetCryptoNews'
export default configureStore({
    reducer : {
        data : getDataReducer,
        [createNewsApi.reducerPath] : createNewsApi.reducer,
    }
})