import { createAPI } from '@md-shared/services/api';
import { GetPlanetsResponse } from '@md-shared/services/api/controllers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean;
  error: null | string;
  data: GetPlanetsResponse | null;
};

export const INITIAL_STATE: InitialState = {
  loading: false,
  error: null,
  data: null
};

/* ------------- Thunks ------------- */

export const getPlanets = createAsyncThunk('planet/getAll', async (_, thunkAPI) => {
  const api = createAPI();

  try {
    const { data } = await api.getPlanets();

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/* ------------- Hookup Reducers To Types ------------- */

export const slice = createSlice({
  name: 'planets',
  reducers: {},
  initialState: INITIAL_STATE,
  extraReducers: {
    [getPlanets.fulfilled.type]: (state, action: PayloadAction<GetPlanetsResponse>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload || null;
    },
    [getPlanets.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlanets.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
