import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../serviceAPI/serviceAPI';
import { CastList, CastItem } from '../../styled/styled';

const Cast = () => {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const castMoves = async () => {
      try {
        const data = await getMovieCast(movieId);
        const moveCast = data.data.cast;
        setMovieCast(moveCast);
      } catch (error) {
        console.error('error');
      }
    };
    castMoves();
  }, [movieId]);

  return (
    <CastList>
      {movieCast.length < 1 ? (
        <h2>I'm sorry, but I don't have any information casts </h2>
      ) : (
        movieCast.map(({ id, profile_path, character, name }) => (
          <CastItem key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              alt={name}
              width="150"
              height="auto"
            />
            <p>{name}</p>
            <p>Character: {character}</p>
          </CastItem>
        ))
      )}
    </CastList>
  );
};

export default Cast;
