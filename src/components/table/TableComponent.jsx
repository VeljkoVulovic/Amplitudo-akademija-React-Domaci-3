import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    height: 90,
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    background: "white",
    width: 1000,
    minWidth: 700,
    margin: "auto",
    marginTop: 30,
  },
});

const TableComponent = ({ headers = [], rows = [] }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers?.length &&
              headers.map((item, index) => (
                <StyledTableCell key={index} align="center">
                  {item.title}
                </StyledTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length &&
            rows.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  {headers.map((headerItem, index2) => {
                    if (headerItem.render) {
                      return (
                        <StyledTableCell key={index2} align="center">
                          {headerItem.render(item)}
                        </StyledTableCell>
                      );
                    } else {
                      return (
                        <StyledTableCell key={index2} align="center">
                          {item[headerItem.key]}
                        </StyledTableCell>
                      );
                    }
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
