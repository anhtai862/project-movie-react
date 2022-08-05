import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import { IInfoMovie } from "interfaces/info-movie";
import movieAPI from "services/movieAPI";

interface IInfoMovieState {
  data: IInfoMovie;
  isLoading: boolean;
  error: String;
}
const initialState: IInfoMovieState = {
  data: <IInfoMovie>{},
  isLoading: false,
  error: "",
};

export const getInfoMovie = createAsyncThunk(
  EnumThunkAction.GET_MOVIE_INFO,
  async (maPhim: number) => {
    try {
      const data = await movieAPI.getInfoMovie(maPhim);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const moviesSlice = createSlice({
  name: Action.INFO_MOVIE, // namespace để tạo ra các action types
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoMovie.pending, (state) => {
      // request đang được thực thi => set isLoading thành true để show loading ra giao diện
      return { ...state, isLoading: true };
    });
    builder.addCase(getInfoMovie.fulfilled, (state, { payload }) => {
      // payload được return từ hàm getMovieList
      return { ...state, isLoading: false, data: payload };
    });
    builder.addCase(getInfoMovie.rejected, (state, { error }) => {
      // error được throw từ hàm getMovieList
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default moviesSlice.reducer;
