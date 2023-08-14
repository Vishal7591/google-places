import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { GeocodeResult } from "use-places-autocomplete";

export const updatePlaces = createAsyncThunk(
  "places/updatePlaces",
  (suggestions: GeocodeResult[]) => {
    localStorage.setItem("places", JSON.stringify(suggestions));
    const placesData = JSON.parse(
      JSON.stringify(localStorage.getItem("places"))
    );
    return JSON.parse(placesData);
  }
);

export type ThunkDispatch = typeof updatePlaces;

export const placesSlice = createSlice({
  name: "placesUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePlaces.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(updatePlaces.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as GeocodeResult[];
    });
    builder.addCase(updatePlaces.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default placesSlice.reducer;
