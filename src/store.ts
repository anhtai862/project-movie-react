import { configureStore } from "@reduxjs/toolkit";
import counter from "slices/counter";
import movies from "slices/movies";
import auth from "slices/auth";
import banner from "slices/banner";
import info_movie from "slices/info-movie";
import info_cinema from "slices/menuCinema";
import info_theater from "slices/info-theater";
import list_theater from "slices/list-theater";
import list_info_theater from "slices/info-theater";
import movie_showtime_info from "slices/movie-showtime-info";
import movie_ticket from "slices/movie-ticket";

// configureStore: mặc định đã được setup redux devtool và redux thunk
const store = configureStore({
  reducer: {
    counter,
    movies,
    auth,
    banner,
    info_movie,
    info_cinema,
    info_theater,
    list_theater,
    list_info_theater,
    movie_showtime_info,
    movie_ticket,
  },
  // devTools: false // có enable devtool hay không, mặc định là true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
