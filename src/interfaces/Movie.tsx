export interface Movie {
  id: number;
  title: string;
  overview: string;
  score: number;
  genre_ids: string[];
  release_date: string;
  poster_path: string;
  vote_average: number;
}
