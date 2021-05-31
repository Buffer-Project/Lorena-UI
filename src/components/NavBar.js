import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#99AAb5',
  },
  title: {
    flexGrow: 1,
    color: '#99AAb5',
  },
  loginButton: {
    color: '#99AAb5',
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#2C2F33', color: '99AAb5'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Lorena
          </Typography>
          <Button className={classes.loginButton}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}



const NavBar = () => {
    return(
        <>
          <ButtonAppBar />
        </>
    )
}

export default NavBar;