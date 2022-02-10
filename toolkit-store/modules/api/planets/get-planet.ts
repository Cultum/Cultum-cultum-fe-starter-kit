import { createAPI } from '@md-shared/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetTechResponseResult } from '@md-shared/services/api/controllers/planets';

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean;
  error: null | string;
  data: PlanetTechResponseResult | null;
};

export const INITIAL_STATE: InitialState = {
  data: null,
  error: null,
  loading: false
};

/* ------------- Thunks ------------- */

export const getPlanet = createAsyncThunk('planet', async (id: string, thunkAPI) => {
  const api = createAPI();

  try {
    const { data } = await api.getPlanet(id);

    return data.result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/* ------------- Hookup Reducers To Types ------------- */

export const slice = createSlice({
  name: 'planet',
  reducers: {},
  initialState: INITIAL_STATE,
  extraReducers: {
    [getPlanet.fulfilled.type]: (state, action: PayloadAction<PlanetTechResponseResult>) => {
      state.data = action.payload || null;
      state.loading = false;
      state.error = null;
    },
    [getPlanet.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlanet.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
