export interface Movie {
  id: number;
  image: string;
  overview: string;
  releaseDate: string;
  title: string;
}

export interface MovieResponse {
  id: number;
  release_date: string;
  title: string;
  overview: string;
  poster_path: string | null;
}

export interface MovieListResponse<Results> {
  page: number;
  results: Results;
  total_pages: number;
  total_results: number;
}
