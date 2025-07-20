import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../navigation/Navigation";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";

const Home = lazy(() => import("../../pages/home/Home"));
const Movies = lazy(() => import("../../pages/movies/Movies"));
const MovieDetailsPage = lazy(() => import("../../pages/movieDetailsPage/MovieDetailsPage"));
const Cast = lazy(() => import("../movieCast/MovieCast"));
const Reviews = lazy(() => import("../movieReviews/MovieReviews"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className={css.loading}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
