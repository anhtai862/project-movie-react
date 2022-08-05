import React from "react";
import logo from "images/logo.png";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="p-2  dark:text-gray-100 ">
      <div className="container flex justify-between h-16 mx-auto">
        <Link to="/">
          <img
            src={logo}
            className="flex items-center w-14 h-14 cursor-pointer ml-4"
          />
        </Link>

        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 dark:text-gray-600 "
            >
              Lịch Chiếu
            </a>
          </li>
          <li className="flex">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 hover:text-orange-400 dark:text-gray-600 "
            >
              Cụm Rạp
            </a>
          </li>
          <li className="flex">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 hover:text-orange-400 dark:text-gray-600 "
            >
              Tin Tức
            </a>
          </li>
          <li className="flex">
            <a
              href="#"
              className="flex items-center px-4 -mb-1  hover:text-orange-400 dark:text-gray-600"
            >
              Ứng Dụng
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Link
            to="/login"
            className="self-center px-8 py-3 font-semibold rounded  bg-orange-400 dark:text-gray-700 "
          >
            Đăng Nhập
          </Link>
          <Link
            to="/signup"
            className="self-center px-8 py-3 font-semibold rounded hover:bg-orange-400 dark:text-gray-700"
          >
            Đăng Kí
          </Link>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
