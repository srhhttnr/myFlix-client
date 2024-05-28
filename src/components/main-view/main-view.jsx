import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Barbie',
      Director: 'Greta Gerwig',
      Genre: 'Comedic Fantasy',
      ImageURL: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg'
    },
    {
      id: 2,
      Title: 'Pride and Prejudice',
      Director: 'Joe Wright',
      Genre: 'Romantic Drama',
      ImageURL: 'https://upload.wikimedia.org/wikipedia/en/0/03/Prideandprejudiceposter.jpg'
    },
    {
      id: 3,
      Title: 'Step Brothers',
      Director: 'Adam McKay',
      Genre: 'Comedy',
      ImageURL: 'https://upload.wikimedia.org/wikipedia/en/d/d9/StepbrothersMP08.jpg' 
    }
  ]);


  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );

};