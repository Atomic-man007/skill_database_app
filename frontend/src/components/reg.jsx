import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// ============================================

// ========= Icon imports ==============================
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// =====================================================

// ============= Styling ============================ 
const logo={fontSize:'50px'}
// ===================================================
// ===============================================

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
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
            <DoubleArrowIcon style={logo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <DoubleArrowIcon style={{margin:'0 20px 0 0'}}/>
          </Typography>


           {/*<Grid item xs={3}>
          <Box display="flex">
            <Button
              sx={{ marginLeft: "auto", background: "rgba(9,9,121,1)" }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              sx={{ marginLeft: 1, background: "rgba(9,9,121,1)" }}
              variant="contained"
            >
              Sign-up
            </Button>
          </Box>
        </Grid>*/}
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
export default ResponsiveAppBar;