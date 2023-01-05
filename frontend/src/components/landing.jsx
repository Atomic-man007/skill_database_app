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
              Dont have an account?{' '}
            </h3>

            <Link
              className='btn btn-outline-info outline-none mt-3'
              href='/register'
              variant='body2'
            >
              Register
            </Link>
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
