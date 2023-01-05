import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div className='flex h-screen bg-gradient-to-r from-sky-400 to-indigo-400 pb-4 '>
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute left-24 top-56'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute right-96 top-36'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute left-64 bottom-24'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute right-40 top-64'
        />
        <br></br>
        <div className='card col-md-6 offset-md-3 m-auto cardCustom'>
          <h3 className='text-center pt-4 customHeader'>View User Details</h3>
          <div className='card-body'>
            <div className='row'>
              <label className='text-xl pr-3 antialiased'> User Name: </label>
              <div className='text-lg antialiased font-medium'>
                {' '}
                {this.state.user.Name}
              </div>
            </div>
            <div className='row'>
              <label className='text-xl pr-3 antialiased'> User Skill: </label>
              <div className='text-lg antialiased font-medium'>
                {' '}
                {this.state.user.Skill}
              </div>
            </div>
            <div className='row'>
              <label className='text-xl pr-3 antialiased'> User Domain: </label>
              <div className='text-lg antialiased font-medium'>
                {' '}
                {this.state.user.Domain}
              </div>
            </div>
            <div className='row'>
              <label className='text-xl pr-3 antialiased'> User Years: </label>
              <div className='text-lg antialiased font-medium'>
                {' '}
                {this.state.user.Years}
              </div>
            </div>
            <div className='row'>
              <label className='text-xl pr-3 antialiased'> User Level: </label>
              <div className='text-lg antialiased font-medium'>
                {' '}
                {this.state.user.Level}
              </div>
            </div>

            <Link
              className='bg-blue-500 hover:bg-blue-700 text-white mt-4 flex items-center justify-center w-24  font-bold py-2 px-4  border border-blue-700 rounded'
              to='/users'
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
