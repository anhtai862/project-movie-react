import { CurrentUser } from "interfaces/auth";
import axiosClient from "./axiosClient";

interface LoginValues {
  taiKhoan: string;
  matKhau: string;
}

const authAPI = {
  login: (values: LoginValues) => {
    return axiosClient.post<unknown, CurrentUser>(
      "QuanLyNguoiDung/DangNhap",
      values
    );
  },

  // register: (values: RegisterValues) => {}
};

export default authAPI;
