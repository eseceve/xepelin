import React from 'react';
import Error from 'next/error';
import {useQuery} from 'react-query'
import getMovieList from '../../utils/getMovieList';
import MovieThumb from '../MovieThumb';
import styles from './MovieList.module.css';
import type { Movie } from '../../types/Movie'
import type { MovieListProps } from './types';

const MovieList = ({ endpoint, title, subtitle }: MovieListProps): JSX.Element => {
  const { isLoading, data, error } = useQuery(title, () => getMovieList(endpoint));

  if (isLoading) return 'loading';
  if (error) return <Error />

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.subtitle}>{subtitle}</span>
      <div className={styles.movieWrapper}>
        {data?.results.map(
          (movie: Movie): JSX.Element => <MovieThumb movie={movie} key={movie.id} />
        )}
      </div>
    </>
  )
}

export default MovieList;
