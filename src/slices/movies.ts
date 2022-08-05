import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import { Movie } from "interfaces/movie";
import movieAPI from "services/movieAPI";

interface MoviesState {
  data: Movie[];
  isLoading: boolean;
  error: string;
}

const initialState: MoviesState = {
  data: [],
  isLoading: false,
  error: "",
};

// createAsyncThunk sẽ tự động dispatch 3 action pending/fullfiled/rejected
// Ta sẽ bắt và xử lý các action này ở extraReducers bên trong hàm createSlice
export const getMovieList = createAsyncThunk(
  EnumThunkAction.GET_MOVIE_LIST,
  // Hàm này nhận vào 2 tham số:
  // - Tham số truyền vào khi dispatch action getMovieList: dispatch(getMovieList(params))
  // - ThunkAPI: là một object chứa các hàm của redux thunk như dispatch, getState,...
  async () => {
    // tự động dispatch action movies/getMovieList/pending
    try {
      const data = await movieAPI.getMovieList();
      // call API thành công return về data
      // return data => tự động dispatch action movies/getMovieList/fullfiled
      return data;
    } catch (error) {
      // throw error => tự động dispatch action movies/getMovieList/rejected
      throw error;
    }
  }
);

const moviesSlice = createSlice({
  name: Action.MOVIES, // namespace để tạo ra các action types
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieList.pending, (state) => {
      // request đang được thực thi => set isLoading thành true để show loading ra giao diện
      return { ...state, isLoading: true };
    });
    builder.addCase(getMovieList.fulfilled, (state, { payload }) => {
      // payload được return từ hàm getMovieList
      return { ...state, isLoading: false, data: payload };
    });
    builder.addCase(getMovieList.rejected, (state, { error }) => {
      // error được throw từ hàm getMovieList
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default moviesSlice.reducer;
