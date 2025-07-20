import { useEffect, useState } from "react";
import { NavLink, useParams, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../movie_api";
import BackLink from "../../components/backLink/BackLink";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const buildLinkClass = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
      };

  return (
    <>
      <div className={css.backLinkContainer}>
        <BackLink
          to={backLinkHref}
          state={{
            query: location.state?.query,
            searchResults: location.state?.searchResults,
          }}
          className={css.backLink}
        >
          Go back
        </BackLink>
      </div>
      <div className={css.movieDetailsContriner}>
        <div className={css.movieDetailsImage}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={css.movieDetailsContent}>
          <h1>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p>User score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
        </div>
      </div>
      <nav className={css.nav}>
        <p>Additional information</p>
        <NavLink to="cast" className={buildLinkClass}>Cast</NavLink>
        <NavLink to="reviews" className={buildLinkClass}>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;
