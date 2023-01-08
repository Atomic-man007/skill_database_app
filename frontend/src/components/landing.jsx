import React from 'react';
import Grid from '@mui/material/Grid';

const LandingPage = () => {
  return (
    <div className='h-screen'>
      <div className='landingMain'>

        <Grid container justifyContent='flex-start' sx={{ pl: 4 }}>
          <Grid item>
        <h1 className='decoration-sky-600 text-sky-900'>
          Welcome to Skill management Application
        </h1>
        <br></br>
            <h3 className='decoration-sky-600 text-sky-900'>
              Click below to visit Dashboard{' '}
            </h3>

            <button
              className='btn btn-primary btn-lg mt-3'
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/users';}}
              href='/users'
            >
            Users Dashboard
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
