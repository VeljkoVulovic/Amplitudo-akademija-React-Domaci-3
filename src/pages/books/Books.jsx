import React, { useState, useEffect } from "react";
import Book from "../../components/book/Book";
import Wrapper from "../../components/wrapper/Wrapper";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllBooks } from "../../services/books";

const Books = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);

  const addBook = () => {
    history.push("/formBook");
  };

  useEffect(() => {
    getAllBooks()
      .then((response) => {
        setBooks(response?.data);
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
          onClick={() => addBook()}
        >
          Add Book
        </Button>
      </div>
      <Wrapper>
        {books.map((item, index) => {
          return (
            <Link key={index} to={{ pathname: `/formBook`, book: item }}>
              <Book
                key={item.id}
                id={item.id}
                isbn={item.isbn}
                writerName={item.writerName}
                publisherName={item.publisherName}
                publishedDate={item.publishedDate}
                genre={item.genre}
              />
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};

export default Books;
