import React from 'react';
import Image from 'next/image';
import styles from './MovieThumb.module.css';
import type { MovieThumbProps } from '../types';

const MovieThumb = ({ movie }: MovieThumbProps): JSX.Element => (
  <div className={styles.wrapper}>
    <Image
      className={styles.image}
      src={movie.image}
      alt={`${movie.title} cover`}
      height={282}
      width={188}
    />
    <h3 className={styles.title}>{movie.title}</h3>
    <span className={styles.date}>{movie.releaseDate}</span>
  </div>
)

export default MovieThumb;
