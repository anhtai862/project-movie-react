import { Routes, Route, Link } from "react-router-dom";

import GlobalStyle from "GlobalStyle";
import MainTemplate from "template/MainTemplate";

import Home from "pages/Home";
import Movie from "pages/Movie";
import Login from "pages/Login";
import Signup from "pages/Signup";
import MovieDetailt from "pages/MovieDetailt";
import MenuCinema from "pages/Home/MenuCinema";
import MovieTicket from "pages/MovieTicket";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route path="detail/:movieId" element={<MovieDetailt />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="purchase/:movieTicketId" element={<MovieTicket />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
