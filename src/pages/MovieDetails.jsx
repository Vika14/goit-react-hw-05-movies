import { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovieInfo } from '../serviceAPI/serviceAPI';
import { FallingLines } from 'react-loader-spinner';

import {
  Button,
  Content,
  InfoList,
  InfoItem,
  InfoTitle,
  Image,
  ListAdd,
  ItemAdd,
  LinkAdd,
} from '../styled/styled';

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movieInfo, setMovieInfo] = useState([]);

  const location = useLocation();
  const buttonBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const infoMovies = async () => {
      try {
        const data = await getMovieInfo(movieId);
        const newMov = data.data;
        setMovieInfo(newMov);
      } catch (error) {
        console.error('error');
      }
    };
    infoMovies();
  }, [movieId]);

  const { poster_path, title, vote_average, genres, overview } = movieInfo;

  return (
    <>
      <Button to={buttonBack.current}>Back</Button>
      <Content>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          width="300"
        />
        <InfoList>
          <InfoItem>
            <InfoTitle>{title}</InfoTitle>
            <p>Users Score: {(vote_average * 10).toFixed(0)}%</p>
          </InfoItem>
          <InfoItem>
            <h2>Overview</h2>
            <p>{overview}</p>
          </InfoItem>
          <InfoItem>
            <h2>Genres</h2>
            {genres && (
              <ul>
                {genres.map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
            )}
          </InfoItem>
          <hr />
          <h3>Additional information</h3>
          <ListAdd>
            <ItemAdd>
              <LinkAdd to="cast">Cast</LinkAdd>
            </ItemAdd>
            <ItemAdd>
              <LinkAdd to="reviews">Reviews</LinkAdd>
            </ItemAdd>
          </ListAdd>
        </InfoList>
      </Content>
      <hr />
      <Suspense
        fallback={
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
