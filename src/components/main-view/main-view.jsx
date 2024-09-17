import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    if (!token) return;

    fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return ({
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            director: movie.Director,
            genre: movie.Genre,
            releaseDate: movie.Release,
            imagePath: movie.Image,
            featured: movie.Featured
          })
        });
        setMovies(moviesFromApi);
      }).catch(e => console.log(e));
  }, [token]);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => {
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      })
    )
  }, [searchQuery, movies]);

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center"> 
        <Routes>
          <Route 
            path="/login"
            element={
              <>
                <div className="text-center" style={{ fontWeight: 'bold' }}>welcome to myFlix</div>

                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView 
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <div className="text-center" style={{ fontWeight: 'bold' }}>welcome to myFlix</div>

                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView movies={movies}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8} >
                    <ProfileView 
                      user={user}
                      movies={movies}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))
                    }
                  </>
                )
                }  
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};