// store/userSlice.ts
import { ILoginRes } from "@/src/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IUserState = ILoginRes&{
  isAuthenticated: boolean;
};

const initialState: IUserState = {
  user: undefined,
  tokens: undefined,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Pick<IUserState, "user" | "tokens">>
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
