import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../serviceAPI/serviceAPI';
import { ReviewList, ReviewItem, Author, Text } from '../../styled/styled';

const Reviews = () => {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const reviewsMovies = async () => {
      try {
        const data = await getMovieReviews(movieId);
        const movieReviews = data.data.results;
        setMovieReviews(movieReviews);
      } catch (error) {
        console.error('error');
      }
    };
    reviewsMovies();
  }, [movieId]);

  return (
    <ReviewList>
      {movieReviews.length < 1 ? (
        <h2>I'm sorry, but I don't have any information reviews </h2>
      ) : (
        movieReviews.map(({ id, author, content }) => (
          <ReviewItem key={id}>
            <Author>Author: {author}</Author>
            <Text>{content}</Text>
          </ReviewItem>
        ))
      )}
    </ReviewList>
  );
};

export default Reviews;
