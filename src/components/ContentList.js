import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import jsonData from '../jsonFiles/comments.json';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    backgroundColor: '#7289da',
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        style={{color: '#ffffff'}}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton 
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        style={{color: '#ffffff'}}
        >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        style={{color: '#ffffff'}}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        style={{color: '#ffffff'}}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = jsonData.sort((a) => a.User);

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    backgroundColor: '#99AAb5',
  },
});

function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{maxWidth: '80%', margin: 'auto', padding: '10%'}}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table" style={{backgroundColor: '#23272A'}}>
          <TableBody>
            <TableRow key={`head`} style={{backgroundColor: '#2C2F33'}}>
                <TableCell component="th" scope="row" style={{fontWeight: 'bold',fontSize: '18px',width: '20%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                  User
                </TableCell>
                <TableCell style={{fontWeight: 'bold',fontSize: '18px',width: '20%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                  Server
                </TableCell>
                <TableCell style={{fontWeight: 'bold',fontSize: '18px',width: '60%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}} align="right">
                  Comment
                </TableCell>
              </TableRow>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name} style={{backgroundColor: '#2C2F33'}}>
                <TableCell component="th" scope="row" style={{width: '20%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                  {row.User}
                </TableCell>
                <TableCell style={{ width: '20%', color: '#ffffff', alignItems: 'center', textAlign: 'center' }}>
                  {row.Server}
                </TableCell>
                <TableCell style={{width: '60%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}} align="right">
                  {row.Comment.lenght > 30?`${row.Comment.slice(0,30)}...`:row.Comment}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                style={{color: '#99AAb5',backgroundColor: '#2C2F33'}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}


const ContentList = () => {
    return(
        <>
            <CustomPaginationActionsTable />
        </>
    )
}

export default ContentList;

//Consuiderar en el campo commnets:

// hipervinculos/imagenes -> resizear acorde
// truncate => acordeon para expandir? o algo asi...
