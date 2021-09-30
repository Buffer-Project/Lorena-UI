import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
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

import Comment from './Comment.js';
import CommentFilters from './CommentFilters';

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

  const filterData = React.useContext(FilterContext);

  const mustBeShown = (row) => {
    if(filterData.filter !== 'None' && filterData.filterValue!==''){
      if(filterData.filter === 'User'){
        return row.User === filterData.filterValue;
      }
      else if(filterData.filter === 'Server'){
        return row.Server === filterData.filterValue;
      }
      else{
        return true;
      }
    }
    else{
      return true;
    }
  }

  const rows = (jsonData.filter((row) => mustBeShown(row))).sort((row) => row.User);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{maxWidth: '80%', margin: 'auto', paddingLeft: '10%', paddingRight: '10%', paddingTop: '3%', paddingBottom: '3%'}}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table" style={{backgroundColor: '#23272A'}}>
          <TableHead key={`head`} style={{backgroundColor: '#7289da'}}>
            <TableRow>
              <TableCell component="th" scope="row" style={{fontWeight: 'bold',fontSize: '18px',width: '18.5%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                User
              </TableCell>
              <TableCell style={{fontWeight: 'bold',fontSize: '18px',width: '18.5%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>
                Server
              </TableCell>
              <TableCell style={{fontWeight: 'bold',fontSize: '18px',width: '3%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}}>

              </TableCell>
              <TableCell style={{fontWeight: 'bold',fontSize: '18px',width: '55%', color: '#ffffff', alignItems: 'center', textAlign: 'center'}} align="right">
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <Comment row={row} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
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

const FilterContext = React.createContext();

const CommentList = () => {
  const [filters, setFilters] = React.useState('None');
  const [filterValue, setFilterValue] = React.useState('');

    return(
        <>  
          <FilterContext.Provider value={{'filter' : filters, 'filterValue': filterValue}}>
            <CommentFilters filterTypes={filters} setFilterTypes={(value)=>{setFilters(value)}} filterValue={filterValue} setFilterValue={(value)=>setFilterValue(value)} jsonData={jsonData} />
            <CustomPaginationActionsTable />
          </FilterContext.Provider>
        </>
    )
}

export default CommentList;

//Consuiderar en el campo commnets:

// hipervinculos/imagenes -> resizear acorde
// truncate => acordeon para expandir? o algo asi...
