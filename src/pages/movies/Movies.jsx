import React, { useState, useEffect } from "react";
import Movie from "../../components/movie/Movie";
import Wrapper from "../../components/wrapper/Wrapper";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllMovies } from "../../services/movies";

const Movies = () => {
  const history = useHistory();
  const [movies, setMovies] = useState([]);

  const addMovie = () => {
    history.push("/formMovie");
  };

  useEffect(() => {
    getAllMovies()
      .then((response) => {
        setMovies(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="buttonDiv">
        <Button
          startIcon={<AddBoxIcon />}
          variant="contained"
          color="primary"
          onClick={() => addMovie()}
        >
          Add Movie
        </Button>
      </div>
      <Wrapper>
        {movies.map((item, index) => {
          return (
            <Link key={index} to={{ pathname: `/formMovie`, movie: item }}>
              <Movie
                key={item.id}
                id={item.id}
                name={item.name}
                directorName={item.directorName}
                writerName={item.writerName}
                duration={item.duration}
                rating={item.rating}
              />
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};

export default Movies;
