import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '@/redux/authSlice';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
	auth: persistReducer({ key: 'auth', storage, whitelist: ['token'] }, authReducer),
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
