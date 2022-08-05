import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import { IBanner } from "interfaces/banner";
import movieAPI from "services/movieAPI";

interface BannerState {
  data: IBanner[];
  isLoading: boolean;
  error: string;
}
const initialState: BannerState = {
  data: [],
  isLoading: false,
  error: "",
};

export const getMovieBanner = createAsyncThunk(
  EnumThunkAction.GET_MOVIE_BANNER,
  async () => {
    try {
      const data = await movieAPI.getMovieBanner();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const bannerSlice = createSlice({
  name: Action.BANNERS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieBanner.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getMovieBanner.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, data: payload };
    });
    builder.addCase(getMovieBanner.rejected, (state, { error }) => {
      // error được throw từ hàm getMovieList
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});
export default bannerSlice.reducer;
