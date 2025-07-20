import { fetchMovies } from "../../movie_api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getMovieReviews = async () => {
            try {
                const data = await fetchMovies(`/movie/${movieId}/reviews`);
                setReviews(data.results);
            } catch (error) {
                console.error(error);
            }
        }
        getMovieReviews();
    }, [movieId]);

    return (
        <div>
            <h2>Movie Reviews</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        console.log(review),
                        <li key={review.id}>
                            <h3>Author: {review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't have any reviews for this movie.</p>
            )}
        </div>
    );
};

export default MovieReviews;
