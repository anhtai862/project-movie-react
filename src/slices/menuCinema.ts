import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import IInfoCinema from "interfaces/info-cinema";
import movieAPI from "services/movieAPI";

interface MenuCinemaState {
  data: IInfoCinema[];
  isLoading: boolean;
  error: string;
}
const initialState: MenuCinemaState = {
  data: [],
  isLoading: false,
  error: "",
};

export const getInfoCinema = createAsyncThunk(
  EnumThunkAction.GET_INFO_CINEMA,
  async () => {
    try {
      const data = await movieAPI.getInfoCinema();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const menuCinemaSlice = createSlice({
  name: Action.INFO_CINEMA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoCinema.pending, (state) => {
      // request đang được thực thi => set isLoading thành true để show loading ra giao diện
      return { ...state, isLoading: true };
    });
    builder.addCase(getInfoCinema.fulfilled, (state, { payload }) => {
      // payload được return từ hàm getMovieList
      return { ...state, isLoading: false, data: payload };
    });
    builder.addCase(getInfoCinema.rejected, (state, { error }) => {
      // error được throw từ hàm getMovieList
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default menuCinemaSlice.reducer;
