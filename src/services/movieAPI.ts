import { IBanner } from "interfaces/banner";
import { IBooking } from "interfaces/booking";
import IInfoCinema from "interfaces/info-cinema";
import { IInfoMovie } from "interfaces/info-movie";
import { IInfoTheater } from "interfaces/info-theater";
import { Movie } from "interfaces/movie";
import { IMovieShowTimeInfo } from "interfaces/movie-showtime-info";
import { IMovieTicket } from "interfaces/movie-ticket";
import { ITheater } from "interfaces/theater";
import axiosClient from "./axiosClient";

const movieAPI = {
  getMovieList: () => {
    return axiosClient.get<unknown, Movie[]>(
      "QuanLyPhim/LayDanhSachPhim?maNhom=GP03"
    );
  },

  getMovieBanner: () => {
    return axiosClient.get<unknown, IBanner[]>("QuanLyPhim/LayDanhSachBanner");
  },
  getInfoMovie: (maPhim: number) => {
    return axiosClient.get<unknown, IInfoMovie>(
      `QuanLyPhim/LayThongTinPhim?maPhim=${maPhim}`
    );
  },
  getInfoCinema: () => {
    return axiosClient.get<unknown, IInfoCinema[]>(
      "QuanLyRap/LayThongTinHeThongRap"
    );
  },
  getInfoTheater: (maHeThongRap: number) => {
    return axiosClient.get<unknown, IInfoTheater[]>(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  },
  getTheaterList: (cinema_id: string) => {
    return axiosClient.get<unknown, ITheater[]>(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinema_id}`
    );
  },
  getListInfoTheater: (cinema_id: string, maNhom: string) => {
    return axiosClient.get<unknown, IInfoTheater[]>(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinema_id}&maNhom=${maNhom}`
    );
  },
  getMovieTicket: (maLichChieu: number) => {
    return axiosClient.get<unknown, IMovieTicket>(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  getMovieShowtimeInfo: (maPhim: number) => {
    return axiosClient.get<unknown, IMovieShowTimeInfo>(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
  commitBooking: (data: any) => {
    return axiosClient.post<unknown, IBooking>("QuanLyDatVe/DatVe", data, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiY2hlY2thZGQxMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InllbjEyQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwieWVuMTJAZ21haWwuY29tIiwiR1AwMSJdLCJuYmYiOjE2NTk3MDc5OTUsImV4cCI6MTY1OTcxMTU5NX0.3dWJ6gjJVeJ_PNoFSup5z5W8iacLWdhtA-hckFj8Hvs",
      },
    });
  },
};

export default movieAPI;
