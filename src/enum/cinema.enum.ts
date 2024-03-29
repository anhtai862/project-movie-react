export enum EnumThunkAction {
  GET_MOVIE_LIST = "movies/getMovieList",
  GET_MOVIE_BANNER = "movies/getMovieBanner",
  GET_MOVIE_INFO = "movies/getInfoMovie",
  GET_INFO_CINEMA = "movies/getInfoCinema",
  GET_INFO_THEATER = "cinema/getInfoTheater",
  GET_THEATER_LIST = "cinema/getTheaterList",
  GET_LIST_INFO_THEATER = "cinema/getListInfoTheater",
  GET_MOVIE_TICKET = "movie/getMovieTicket",
  GET_MOVIE_SHOWTIME_INFO = "movie/movieShowTimeInfo",
}

export enum Action {
  MOVIES = "movies",
  BANNERS = "banners",
  INFO_MOVIE = "info-movie",
  INFO_CINEMA = "info-cinema",
  INFO_THEATER = "info-theater",
  LIST_THEATER = "list-theater",
  LIST_INFO_THEATER = "list-info-theater",
  MOVIE_TICKET = "movie-ticket",
  MOVIE_SHOWTIME_INFO = "movie-showtime-info",
}
export enum Config {
  PER_PAGE_TIME = 6,
  PER_PAGE_MOVIE = 16,
  PER_PAGE_THEATER = 8,
}
export enum GROUPID {
  VALUE = "GP03",
}
