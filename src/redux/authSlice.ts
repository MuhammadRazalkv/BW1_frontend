import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react';

export interface UserState {
	token: string | null;
}

const initialState: UserState = {
	token: null,
};

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginDispatch(state, action: PayloadAction<{ token: string }>) {
			state.token = action.payload.token;
		},
		logoutDispatch(state) {
			state.token = null;
		},
	},
});

export const { loginDispatch, logoutDispatch } = authSlice.actions;
export default authSlice.reducer;
