import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define the RootState type based on the store itself
export type RootState = ReturnType<typeof store.getState>;

// Export the store's dispatch type
export type AppDispatch = typeof store.dispatch;