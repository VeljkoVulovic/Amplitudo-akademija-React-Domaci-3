import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getAllBooks, countBooks } from "../../services/books";
import TableComponent from "../../components/table/TableComponent";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    background: "white",
    margin: "auto",
    width: 360,
    paddingTop: 20,
    paddingBottom: 20,
  },
  root: {
    background: "white",
    width: 1000,
    margin: "auto",
  },
}));

const Books = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const booksPerPage = 5;

  const headers = [
    { key: "id", title: "Id" },
    { key: "isbn", title: "Name" },
    { key: "writerName", title: "Writer" },
    { key: "publisherName", title: "Publisher" },
    { key: "publishedDate", title: "Published date" },
    { key: "genre", title: "Genre" },
    {
      key: "",
      title: "Action",
      render: (data) => (
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={() =>
            history.push({
              pathname: `/formBook`,
              book: data,
            })
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    countBooks()
      .then((response) => {
        setTotalCount(Math.ceil(response?.data / booksPerPage));
      })
      .catch((error) => {
        console.log(error);
      });

    getAllBooks(0, booksPerPage)
      .then((response) => {
        setRows(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addBook = () => {
    history.push("/formBook");
  };

  const handleChange = (event, value) => {
    setPage(value);
    const pageNumber = value - 1;
    getAllBooks(pageNumber, booksPerPage)
      .then((response) => {
        setRows(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <TableComponent headers={headers} rows={rows} />
      <div className={classes.root}>
        <Pagination
          className={classes.pagination}
          color="primary"
          count={totalCount}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Books;
