// snippet: tsrafce
import Loading from "pages/LoadingPage/Loading";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Banner from "./Banner";
import Footer from "./Footer";
import MenuCinema from "./MenuCinema";
import MovieShowing from "./MovieShowing";

const Home = () => {
  const isLoadingBanner = useSelector(
    (state: RootState) => state.banner
  ).isLoading;
  const isLoadingCinema = useSelector(
    (state: RootState) => state.info_cinema
  ).isLoading;
  const isLoadingMovie = useSelector(
    (state: RootState) => state.movies
  ).isLoading;
  return (
    <>
      {(isLoadingBanner || isLoadingCinema || isLoadingMovie) && <Loading />}
      <Banner />
      <MovieShowing />
      <MenuCinema />
      <Footer />
    </>
  );
};

export default Home;
