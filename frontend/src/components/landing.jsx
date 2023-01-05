import React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const LandingPage = () => {
  return (
    <div className='h-screen'>
      <div className='landingMain'>
        <h1 className='text-sky-900 p-4'>
          Welcome to Skill management Application
        </h1>
        <Grid container justifyContent='flex-start' sx={{ pl: 4 }}>
          <Grid item>
            <h3 className='decoration-sky-600 text-sky-900'>
              Don't have an account?
              <br></br>
              Clicking below to register now{' '}
            </h3>

            <button
              className='btn btn-primary btn-lg mt-3'
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/register';}}
              href='/register'
            >
              Register
            </button>
          </Grid>
        </Grid>
        {/* <div className='wave'>
          <img src='../img/wave.svg' alt='' />
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
