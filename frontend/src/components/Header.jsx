import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { red } from '@mui/material/colors';

// ============================================

// ========= Icon imports ==============================
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// =====================================================

// ============= Styling ============================ 
const logo={fontSize:'50px'}
// ===================================================
// ===============================================

const Headerresponsive = ({history}) => {
  const user = localStorage.getItem('user');
  const logout = () => {
    localStorage.clear()
    window.location.reload();
    history.push('/login')
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
      
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
          <IconButton aria-label="Home" onClick={() => window.location.replace('/')}>
            <DoubleArrowIcon sx={{ color: red[50] }} style={logo} />
            </IconButton>
          </Typography>
          <Grid>
          <Box sx={{ marginLeft: "auto"}}>
          {user && <h3>Hi {user}</h3>}
          </Box>
          </Grid>
            {user && <Button
              sx={{ marginLeft:'auto', justifyContent: "flex-end", background: "red", color: red[50] }}
              variant="contained"
              onClick={logout}
            >
              Logout
            </Button>}
            {!user && null}

        {/*<IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Headerresponsive;