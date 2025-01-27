import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    token: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        logout(state) {
            state.token = null;
        },
    }
});

export const { setToken, setIsLoading, logout } = authSlice.actions;
export default authSlice.reducer;
