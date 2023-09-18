import { useState, useEffect } from 'react';
import { getMovieTrending } from '../serviceAPI/serviceAPI';
import { useLocation } from 'react-router-dom';

import { FilmList, FilmItem, FilmLink, Img, Name } from '../styled/styled';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const trendingMoves = async () => {
      try {
        const data = await getMovieTrending();
        const newMovies = data.data.results;
        setTrending(newMovies);
      } catch (error) {
        console.error('error');
      }
    };
    trendingMoves();
  }, []);

  return (
    <FilmList>
      {trending &&
        trending.map(({ id, title, poster_path }) => (
          <FilmItem key={id}>
            <FilmLink key={id} to={`/movies/${id}`} state={{ from: location }}>
              <Img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                width="200"
                height="auto"
              />
              <Name>{title}</Name>
            </FilmLink>
          </FilmItem>
        ))}
    </FilmList>
  );
};

export default Home;
