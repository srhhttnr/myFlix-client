import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <Row className="text-white bg-dark d-flex h-auto float-md-left">
      <Col>
        <img src={movie.imagePath} />
      </Col>
      <Col>
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span>{movie.title}</span>
      </Col>
      <Col>
        <span style={{ fontWeight: 'bold' }}>Release Date: </span>
        <span>{movie.releaseDate}</span>
      </Col>
      <Col>
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.director.Name}</span>
      </Col>
      <Col>
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.genre.Name}</span>
      </Col>
      <Col className="text-center col-md-10">
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span>{movie.description}</span>
      </Col>
      <Col>
        <Link to={`/`}>
          <Button className="btn-light" style={{ cursor: "pointer" }}>Back</Button>
        </Link>
      </Col>
    </Row>
  );
};
