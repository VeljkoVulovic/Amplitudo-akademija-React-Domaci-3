import React, { useState, useEffect } from "react";
import Character from "../../components/character/Character";
import Wrapper from "../../components/wrapper/Wrapper";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllCharacters } from "../../services/characters";

const Characters = () => {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);

  const addCharacter = () => {
    history.push("/formCharacter");
  };

  useEffect(() => {
    getAllCharacters()
      .then((response) => {
        setCharacters(response?.data);
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
          onClick={() => addCharacter()}
        >
          Add Character
        </Button>
      </div>
      <Wrapper>
        {characters.map((item, index) => {
          return (
            <Link
              key={index}
              to={{ pathname: `/formCharacter`, character: item }}
            >
              <Character
                key={item.id}
                id={item.id}
                age={item.age}
                firstName={item.firstName}
                lastName={item.lastName}
                dateOfBirth={item.dateOfBirth}
                gender={item.gender}
                occupation={item.occupation}
              />
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};

export default Characters;
