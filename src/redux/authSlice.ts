import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	isLoggedIn: boolean;
}

const initialState: UserState = {
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action: PayloadAction<{}>) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
