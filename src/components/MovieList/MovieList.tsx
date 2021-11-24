import React, { useState } from 'react';
import Error from 'next/error';
import {useQuery} from 'react-query'
import Carousel from 'react-elastic-carousel';
import getMovieList from '../../utils/getMovieList';
import MovieThumb from '../MovieThumb';
import styles from './MovieList.module.css';
import type { Movie } from '../../types/Movie'
import type { MovieListProps } from './types';

const MOVIES_TO_SHOW = 6;

const MovieList = ({ endpoint, title, subtitle }: MovieListProps): JSX.Element => {
  const [page] = useState(1);
  const { isLoading, data, error } = useQuery(
    [title, page],
    () => getMovieList(endpoint, page),
    { keepPreviousData: true }
  );

  if (isLoading) return <p>Loading</p>;
  if (error) return <Error statusCode={500} />


  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.subtitle}>{subtitle}</span>
      <div className={styles.movieWrapper}>
      <Carousel
        pagination={false}
        isRTL={false}
        itemsToScroll={MOVIES_TO_SHOW}
        itemsToShow={MOVIES_TO_SHOW}
      >
        {data?.results.map(
          (movie: Movie): JSX.Element => <MovieThumb movie={movie} key={movie.id} />
        )}
      </Carousel>
      </div>
    </>
  )
}

export default MovieList;
