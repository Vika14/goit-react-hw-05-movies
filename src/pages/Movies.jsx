import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { getMovieName } from '../serviceAPI/serviceAPI';
import {
  Titl,
  Form,
  Input,
  Btn,
  FilmList,
  FilmItem,
  FilmLink,
  Img,
  Name,
} from '../styled/styled';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovieName = searchParams.get('query') ?? '';

  const handleSearch = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    searchQuery.trim() === ''
      ? alert('enter the name of the movie to search')
      : setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    const trendingMovies = async () => {
      try {
        const data = await getMovieName(searchMovieName);
        const newMovies = data.data.results;
        setSearchMovie(newMovies);
      } catch (error) {
        console.error('error');
      }
    };
    trendingMovies();
  }, [searchMovieName]);

  return (
    <>
      <Titl>Search Films</Titl>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search movies"
        />
        <Btn type="submit">Search</Btn>
      </Form>

      <FilmList>
        {searchMovie &&
          searchMovie.map(({ id, title, poster_path }) => (
            <FilmItem key={id}>
              <FilmLink
                key={id}
                to={`/movies/${id}`}
                state={{ from: location }}
              >
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
    </>
  );
};

export default Movies;
