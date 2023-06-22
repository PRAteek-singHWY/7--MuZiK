// configureStore is Setter Function
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';

//importing muzikCoreApi
import { muzikCoreApi } from './services/MuzikCore';

export const store = configureStore({
  reducer: {
    [muzikCoreApi.reducerPath]:muzikCoreApi.reducer,
    player: playerReducer,
  },
  //specifying the default middle Ware
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(muzikCoreApi.middleware)
});
