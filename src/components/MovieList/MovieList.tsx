import React, { useEffect, useState } from 'react';
import Error from 'next/error';
import { useInfiniteQuery } from 'react-query'
import Carousel, { ItemObject } from 'react-elastic-carousel';
import getMovieList from '../../utils/getMovieList';
import MovieThumb from '../MovieThumb';
import styles from './MovieList.module.css';
import type { Movie, MovieListResponse } from '../../types/Movie'
import type { MovieListProps } from './types';

const MOVIES_TO_SHOW = 6;

const MovieList = ({ endpoint, title, subtitle }: MovieListProps): JSX.Element => {
  const { data, error, fetchNextPage } = useInfiniteQuery(
    title,
    ({ pageParam = 1 }) => getMovieList(endpoint, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages  ? lastPage.page + 1 : undefined
    }
  );

  const [movies, setMovies] = useState<Movie[]>([]);

  const onNext = (_, { index }: ItemObject) => {
    if (movies.length - index < MOVIES_TO_SHOW * 2) fetchNextPage();
  };

  useEffect(() => {
    if (data) {
      setMovies(
        data.pages.reduce(
          (movies: Movie[], page: MovieListResponse<Movie[]>) => movies.concat(page.results),
          []
        )
      );
    }
  }, [data]);

  if (error) return <Error statusCode={500} />

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.subtitle}>{subtitle}</span>
      <div className={styles.movieWrapper}>
      <Carousel
        onNextStart={onNext}
        pagination={false}
        isRTL={false}
        itemsToScroll={MOVIES_TO_SHOW}
        itemsToShow={MOVIES_TO_SHOW}
      >
        {movies.map(
          (movie: Movie, index): JSX.Element => <MovieThumb movie={movie} key={`${movie.id}-${index}`} />
        )}
      </Carousel>
      </div>
    </>
  )
}

export default MovieList;
