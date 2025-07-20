import { fetchMovies } from "../../movie_api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
       const getMovieCast = async () => {
            try {
                const data = await fetchMovies(`/movie/${movieId}/credits`);
                setCast(data.cast);
            } catch (error) {
                console.error(error);
            }
        }
        getMovieCast();
    }, [movieId]);

    return (
        <div>
            <h2>Movie Cast</h2>
            <ul>
                {cast.map((actor) => (
                    <li key={actor.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                            alt={actor.name}
                        />
                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
 
};

export default MovieCast;