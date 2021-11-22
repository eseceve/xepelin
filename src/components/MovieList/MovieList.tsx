import React from 'react';
import Error from 'next/error';
import Image from 'next/image'
import {useQuery} from 'react-query'
import type { MovieListProps } from './type';
import type { Movie } from '../../types/Movie'
import getMovieList from '../../utils/getMovieList';

const MovieList = ({ endpoint, title, subtitle }: MovieListProps): JSX.Element => {
  const { isLoading, data, error } = useQuery(title, () => getMovieList(endpoint));

  if (isLoading) return 'loading';
  if (error) return <Error />

  return (
    <>
      <h1>{title}</h1>
      <span>{subtitle}</span>
      {
        data.results.map((movie: Movie): JSX.Element => (
          <div key={movie.title}>
            <Image src={movie.image} alt={`${movie.title} cover`} height="282" width="188"/>
            <span>{movie.title}</span>
            <span>{movie.releaseDate}</span>
          </div>
        ))
      }
    </>
  )
}

export default MovieList;
